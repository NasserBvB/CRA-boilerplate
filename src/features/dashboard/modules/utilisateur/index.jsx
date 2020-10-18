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

import './styles.scss'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function Utilisateur() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [search, setSearch] = useState('')
  const classes = useStyles()
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
            variant="outlined"
            color="primary"
            onClick={(e) =>
              (document.getElementById('myModal').style.display = 'block')
            }
          >
            {<NavLink to="#">Creer un Utilisateur</NavLink>}
          </Button>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={(e) =>
                  (document.getElementById('myModal').style.display = 'none')
                }
              >
                &times;
              </span>
              <NewUtilisateur setUtilisateurs={setUtilisateurs} />
            </div>
          </div>
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
              {utilisateurs.map((row) => (
                <UtilisateurComp
                  key={row.id}
                  utilisateur={row}
                  setUtilisateurs={setUtilisateurs}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  )
}
