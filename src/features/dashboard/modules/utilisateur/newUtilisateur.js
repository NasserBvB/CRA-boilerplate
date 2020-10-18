import React, { useState } from 'react'
import {
  createUtilisateur,
  fetchUtilisateurs,
} from 'features/dashboard/actions/utilisateur'
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
  const [login, setLogin] = useState('')
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [idprofil, setProfil] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [mail, setMail] = useState('')
  const [tel, setTel] = useState('')

  const create = async (e) => {
    e.preventDefault()
    try {
      const resp = await createUtilisateur({
        login,
        password,
        mail,
        idprofil,
        tel,
        nom,
        prenom,
      })
      console.log(resp)
      const respo = await fetchUtilisateurs()
      props.setUtilisateurs(respo.data)
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
      <h4>Creer Un nouveau utilisateur</h4>
      <CardContent style={{ display: 'grid', justifyContent: 'center' }}>
        <div className="input-formulaire">
          <Input
            type="text"
            name="login"
            placeholder="Username"
            onChange={(e) => setLogin(e.target.value)}
            value={login}
          />
        </div>
        <div className="input-formulaire">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="input-formulaire">
          <Input
            type="text"
            name="mail"
            placeholder="Email"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </div>
        <div className="input-formulaire">
          <Select
            label="Profile"
            onChange={(e) => setProfil(e.target.value)}
            value={idprofil}
          >
            <MenuItem value="1">Administrateur</MenuItem>
            <MenuItem value="2">User</MenuItem>
          </Select>
        </div>
        <div className="input-formulaire">
          <Input
            type="text"
            name="nom"
            placeholder="Nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
        </div>
        <div className="input-formulaire">
          <Input
            type="text"
            name="prenom"
            placeholder="Prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
        </div>
        <div className="input-formulaire">
          <Input
            type="text"
            name="tel"
            placeholder="Téléphone"
            onChange={(e) => setTel(e.target.value)}
            value={tel}
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
