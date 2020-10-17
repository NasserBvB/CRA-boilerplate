import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Container from 'ui/components/Container'
import Button from 'ui/components/Button'
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

import NewArticle from './NewArticle'
import Utilisateur from '../utilisateur'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function Article() {
  const [articles, setArticles] = useState([])
  const classes = useStyles()
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

  return (
    <Container>
      <SEO url="/" title="Article" />
      <div class="container">
        <div className="header">
          <h2>Article</h2>

          <Button
            onClick={(e) =>
              (document.getElementById('myModal3').style.display = 'block')
            }
          >
            {<NavLink to="#">Creer un Article</NavLink>}
          </Button>
          <div id="myModal3" className="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={(e) =>
                  (document.getElementById('myModal3').style.display = 'none')
                }
              >
                &times;
              </span>
              <NewArticle setArticles={setArticles} />
            </div>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Labelle</TableCell>
                <TableCell align="right">Quantite minmale</TableCell>
                <TableCell align="right">Reference</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Modifier</TableCell>
                <TableCell align="right">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((row) => (
                <ArticleComp
                  key={row.id}
                  article={row}
                  setArticles={setArticles}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  )
}
