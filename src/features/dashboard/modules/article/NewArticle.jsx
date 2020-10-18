import React, { useState } from 'react'
import { Center } from 'features/dashboard/components/shared-style'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Input, Select, MenuItem } from '@material-ui/core'
import {
  createArticle,
  fetchArticles,
} from 'features/dashboard/actions/article'

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
  const [libele, setLibele] = useState('')
  const [qtemin, setQtemin] = useState('')
  const [reference, setReference] = useState('')
  const classes = useStyles()
  const [type, setType] = useState('')

  const create = async (e) => {
    e.preventDefault()
    try {
      const resp = await createArticle({
        libele,
        qtemin,
        reference,
        type,
      })
      console.log(resp)
      const respo = await fetchArticles()
      props.setArticles(respo.data)
      props.setOpen(false)
    } catch (err) {
      alert('Erreur lors du creation', err.message)
    }
  }
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ display: 'grid', justifyContent: 'center' }}
    >
      <h4>Creer Un nouveau Article</h4>
      <CardContent style={{ display: 'grid', justifyContent: 'center' }}>
        <div className="input-formulaire">
          <Input
            type="text"
            name="mail"
            placeholder="Labelle"
            onChange={(e) => setLibele(e.target.value)}
            value={libele}
          />
        </div>
        <div className="input-formulaire">
          <Select
            label="Type"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <MenuItem value="1">type 1</MenuItem>
            <MenuItem value="2">type 2</MenuItem>
          </Select>
        </div>
        <div className="input-formulaire">
          <Input
            type="number"
            name="nom"
            placeholder="Quantite minimale"
            onChange={(e) => setQtemin(e.target.value)}
            value={qtemin}
          />
        </div>
        <div className="input-formulaire">
          <Input
            type="text"
            name="tel"
            placeholder="Reference"
            onChange={(e) => setReference(e.target.value)}
            value={reference}
          />
        </div>
        <div className="input-formulaire">
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
        </div>
      </CardContent>
    </Card>
  )
}
