import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Container from 'ui/components/Container'
import SEO from 'ui/components/SEO'
import Button from 'ui/components/Button'
import NewClient from './NewClient'
import ClientComp from './clientComp'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { DeleteRounded, UpdateRounded } from '@material-ui/icons'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})
export default function Client() {
  const [clients, setClients] = useState([])
  const classes = useStyles()
  useEffect(() => {
    async function fetchClient() {
      try {
        const data = await axios.get(`/client/findAll`)
        setClients(data.data)
      } catch (error) {
        alert(error.message)
      }
    }
    fetchClient()
    console.log(clients)
  }, [])

  return (
    <Container>
      <SEO url="/" title="Client" />
      <div class="container">
        <div className="header">
          <h2>Client</h2>
          <Button
            onClick={(e) =>
              (document.getElementById('myModal2').style.display = 'block')
            }
          >
            {<NavLink to="#">Creer un Client</NavLink>}
          </Button>
          <div id="myModal2" className="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={(e) =>
                  (document.getElementById('myModal2').style.display = 'none')
                }
              >
                &times;
              </span>
              <NewClient setClients={setClients} />
            </div>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Ville</TableCell>
                <TableCell align="right">Téléphone</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Adresse</TableCell>
                <TableCell align="right">Modifier</TableCell>
                <TableCell align="right">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((row) => (
                <ClientComp key={row.id} client={row} setClients={setClients} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  )
}
