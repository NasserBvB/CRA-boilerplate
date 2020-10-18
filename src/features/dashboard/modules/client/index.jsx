import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Container from 'ui/components/Container'
import SEO from 'ui/components/SEO'
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
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
})
export default function Client() {
  const [clients, setClients] = useState([])
  const classes2 = useStyles()
  const [open, setOpen] = useState(false)
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

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      <SEO url="/" title="Client" />
      <div class="container">
        <div className="header">
          <h2>Client</h2>
          <Button
            onClick={(e) => setOpen(true)}
            variant="outlined"
            color="primary"
          >
            {<NavLink to="#">Creer un Client</NavLink>}
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          id="create-client"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <NewClient setClients={setClients} />
        </Modal>

        <TableContainer component={Paper}>
          <Table className={classes2.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="left">Ville</TableCell>
                <TableCell align="left">Téléphone</TableCell>
                <TableCell align="left">Code</TableCell>
                <TableCell align="left">Adresse</TableCell>
                <TableCell align="left">Modifier</TableCell>
                <TableCell align="left">Supprimer</TableCell>
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
