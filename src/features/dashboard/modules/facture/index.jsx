import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Container from 'ui/components/Container'
import SEO from 'ui/components/SEO'
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
import FactureComp from './FactureComp'

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
export default function Facture() {
  const [factures, setFactures] = useState([])
  const classes1 = useStyles()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    async function fetchFactures() {
      try {
        const data = await axios.get(`/facture/findAll`)
        setFactures(data.data)
      } catch (error) {
        alert(error.message)
      }
    }
    fetchFactures()
    console.log(factures)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      <SEO url="/" title="Facture" />
      <div class="container">
        <div className="header">
          <h2>Facture</h2>
          <Button
            onClick={(e) => setOpen(true)}
            variant="outlined"
            color="primary"
          >
            {<NavLink to="#">Creer une facture</NavLink>}
          </Button>

          <Modal
            open={open}
            id="create-facture"
            onClose={handleClose}
            className={classes1.modal}
          >
            <FactureComp />
          </Modal>
        </div>

        <TableContainer component={Paper}>
          <Table className={classes1.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Adresse</TableCell>
                <TableCell align="left">ICE</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Nombre d'articles</TableCell>
                <TableCell align="left">Modifier</TableCell>
                <TableCell align="left">Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {clients.map((row) => (
                <ClientComp key={row.id} client={row} setClients={setClients} />
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  )
}
