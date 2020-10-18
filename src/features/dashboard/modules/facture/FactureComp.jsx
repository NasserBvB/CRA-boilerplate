import React, { useState, useEffect } from 'react'
import {
  createFacture,
  fetchFactures,
} from 'features/dashboard/actions/facture'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Center } from 'features/dashboard/components/shared-style'
import { Card, CardContent, Input, Select, MenuItem } from '@material-ui/core'
import { fetchClients } from 'features/dashboard/actions/client'
import { fetchArticles } from 'features/dashboard/actions/article'
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
  const [facture, setFacture] = useState(
    props.facture || { client: 0, article: 0 }
  )
  const [clients, setClients] = useState([])
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchData = async function fetchData() {
      const artcls = await fetchArticles()
      const clts = await fetchClients()
      setArticles(artcls.data)
      setClients(clts.data)
    }
    fetchData()
  }, [])

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
        >
          <MenuItem value="0" disabled>
            Selectionnez des articles
          </MenuItem>
          {articles.map((article, index) => {
            return (
              <MenuItem value={article.id} key={index}>
                {article.libele}
              </MenuItem>
            )
          })}
        </Select>
        <Select
          label="Client"
          onChange={(e) => setFacture(e.target.value)}
          value={facture && facture.client && facture.client.name}
        >
          <MenuItem value={0} disabled>
            Selectionnez un client
          </MenuItem>
          {clients.map((client, index) => {
            return (
              <MenuItem value={client.id} key={index}>
                {client.nom}
              </MenuItem>
            )
          })}
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
