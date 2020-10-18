import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Container from 'ui/components/Container'
import Button from '@material-ui/core/Button'
import SEO from 'ui/components/SEO'
import ArticleComp from './articleComp'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from 'features/dashboard/components/TablePaginationActions'

import NewArticle from './NewArticle'
import { Modal } from '@material-ui/core'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function Article() {
  const [articles, setArticles] = useState([])
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [open, setOpen] = React.useState(false)
  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await axios.get(`/article/findAll`)
        setArticles(data.data)
      } catch (error) {
        alert(error.message)
      }
    }
    fetchArticle()
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5))
    setPage(0)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Container>
      <SEO url="/" title="Article" />
      <div class="container">
        <div className="header">
          <h2>Article</h2>

          <Button
            onClick={(e) => setOpen(true)}
            variant="outlined"
            color="primary"
          >
            {<NavLink to="#">Creer un Article</NavLink>}
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <NewArticle setArticles={setArticles} setOpen={setOpen} />
          </Modal>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Labelle</TableCell>
                <TableCell align="left">Quantite minmale</TableCell>
                <TableCell align="left">Reference</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Modifier</TableCell>
                <TableCell align="left">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? articles.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : articles
              ).map((row, index) => (
                <ArticleComp
                  key={row.id}
                  article={row}
                  setArticles={setArticles}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={articles.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </Container>
  )
}
