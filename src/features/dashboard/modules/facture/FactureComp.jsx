import React, { useState } from 'react'
import {
  createFacture,
  fetchFactures,
} from 'features/dashboard/actions/facture'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Center } from 'features/dashboard/components/shared-style'
import { Card, CardContent, Input, Select, MenuItem } from '@material-ui/core'
const useStyles = makeStyles({
  root: {
    minWidth: '300px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
})
export default (props) => {
  const classes = useStyles()
  const [facture, setFacture] = useState(props.facture)

  const create = async (e) => {
    e.preventDefault()
    try {
      const resp = await createFacture(facture)
      const respo = await fetchFactures()
      props.setFactures(respo.data)
    } catch (err) {
      alert('Erreur lors du creation', err.message)
    }
  }
  return (
    <Card className={classes.root} variant="outlined">
      <h4>Generer nouveau Facture</h4>
      <CardContent style={{ display: 'grid', justifyContent: 'center' }}>
        <Select
          label="Client"
          onChange={(e) => setFacture({ ...facture, client: e.target.value })}
          value={facture && facture.client && facture.client.name}
          placeholder="Selectionnez une ville"
        >
          <MenuItem value="0" disabled>
            Selectionnez une un client
          </MenuItem>
          <MenuItem value="1">Casa</MenuItem>
          <MenuItem value="2">Rabat</MenuItem>
        </Select>
        <Select
          label="Client"
          onChange={(e) => setFacture(e.target.value)}
          value={facture && facture.client && facture.client.name}
          placeholder="Selectionnez un client"
        >
          <MenuItem value="0" disabled>
            Selectionnez un client
          </MenuItem>
          <MenuItem value="1">Casa</MenuItem>
          <MenuItem value="2">Rabat</MenuItem>
        </Select>
        <Center>
          <Button variant="contained" color="primary" onClick={create}>
            <span>Enregistrer</span>
          </Button>
          <Button variant="contained" color="secondary">
            <span>Annuler</span>
          </Button>
        </Center>
        <Center>
          {/* <p>
						Don’t have an account? No worries,{' '}
						<Link to="/signup">you can create one now</Link>
					</p> */}
        </Center>
      </CardContent>
    </Card>
  )
}
