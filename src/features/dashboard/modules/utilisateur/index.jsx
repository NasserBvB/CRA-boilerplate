import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'ui/components/Container'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import SEO from 'ui/components/SEO'
import UtilisateurComp from './UtilisateurComp'
import NewUtilisateur from './newUtilisateur'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from 'features/dashboard/components/TablePaginationActions'
import './styles.scss'
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

export default function Utilisateur() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [search, setSearch] = useState('')
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  useEffect(() => {
    if (search === '') {
      async function fetchUtilisateurs() {
        try {
          const data = await axios.get(`/utilisateur/findAll`)
          setUtilisateurs(data.data)
        } catch (error) {
          alert(error.message)
        }
      }
      fetchUtilisateurs()
    } else {
      setUtilisateurs(utilisateurs.filter((item) => item.nom.includes(search)))
    }
  }, [search])
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Container>
      <SEO url="/" title="Utilisateur" />
      <div className="container">
        <div className="header">
          <h2>Utilisateur</h2>
          <Input
            type="text"
            value={search}
            placeholder="Filter par le nom de l'utlisateur"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={(e) => setOpen(true)}
            variant="outlined"
            color="primary"
          >
            {<NavLink to="#">Creer un Utilisateur</NavLink>}
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
            <NewUtilisateur
              setUtilisateurs={setUtilisateurs}
              setOpen={setOpen}
            />
          </Modal>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Login</TableCell>
                <TableCell align="left">Password</TableCell>
                <TableCell align="left">Profile</TableCell>
                <TableCell align="left">Nom</TableCell>
                <TableCell align="left">Prenom</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Téléphone</TableCell>
                <TableCell align="left">Modifier</TableCell>
                <TableCell align="left">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? utilisateurs.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : utilisateurs
              ).map((row, index) => (
                <UtilisateurComp
                  key={row.id}
                  utilisateur={row}
                  setUtilisateurs={setUtilisateurs}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={utilisateurs.length}
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
