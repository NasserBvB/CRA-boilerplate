import React, { useState } from 'react'
import { createClient, fetchClients } from 'features/dashboard/actions/client'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Input, Select, MenuItem } from '@material-ui/core'
import { Center } from 'features/dashboard/components/shared-style'
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
  const [adresse, setAdresse] = useState('')
  const [code, setCode] = useState('')
  const [ville, setVille] = useState('0')
  const [mail, setMail] = useState('')
  const [tel, setTel] = useState('')
  const [nom, setNom] = useState('')
  const classes = useStyles()

  const create = async (e) => {
    e.preventDefault()
    try {
      const resp = await createClient({
        adresse,
        code,
        ville,
        mail,
        tel,
        nom,
      })
      console.log(resp)
      const respo = await fetchClients()
      props.setClients(respo.data)
    } catch (err) {
      alert('Erreur lors du creation', err.message)
    }
  }
  return (
    <Card className={classes.root} variant="outlined">
      <h4>Creer Un nouveau Client</h4>
      <CardContent style={{ display: 'grid', justifyContent: 'center' }}>
        <Input
          type="text"
          name="mail"
          placeholder="Email"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
        />
        <Select
          label="Ville"
          onChange={(e) => setVille(e.target.value)}
          value={ville}
          placeholder="Selectionnez une ville"
        >
          <MenuItem value="0" disabled>
            Selectionnez une ville
          </MenuItem>
          <MenuItem value="1">Casa</MenuItem>
          <MenuItem value="2">Rabat</MenuItem>
        </Select>
        <Input
          type="text"
          name="nom"
          placeholder="Nom"
          onChange={(e) => setNom(e.target.value)}
          value={nom}
        />
        <Input
          type="text"
          name="tel"
          placeholder="Téléphone"
          onChange={(e) => setTel(e.target.value)}
          value={tel}
        />

        <Input
          type="text"
          name="adresse"
          placeholder="Adresse"
          onChange={(e) => setAdresse(e.target.value)}
          value={adresse}
        />
        <Input
          type="text"
          name="code"
          placeholder="Code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
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
