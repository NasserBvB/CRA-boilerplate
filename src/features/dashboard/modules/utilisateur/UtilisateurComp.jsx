import React, { useState } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import {
  updateUtilisateur,
  deleteUtilisateur,
  fetchUtilisateurs,
} from '../../actions/utilisateur'
import {
  DeleteRounded,
  UpdateRounded,
  CancelRounded,
  SaveRounded,
} from '@material-ui/icons'

export default function UtilisateurComp(props) {
  const [utilisateur, setUtilisateur] = useState(props.utilisateur || {})
  const [editing, setEditing] = useState(false)
  async function update(e) {
    e.preventDefault()
    try {
      await updateUtilisateur({
        ...utilisateur,
        profil: {
          id: utilisateur.profil,
          name: utilisateur.profil === 1 ? 'Administrateur' : 'User',
        },
      })
      const respo9 = await fetchUtilisateurs()
      props.setUtilisateurs(respo9.data)
    } catch (error) {
      alert('Erreur lors du modification', error.message)
    }
    setEditing(false)
  }

  async function deleteU(e) {
    e.preventDefault()
    try {
      await deleteUtilisateur(utilisateur.id)
      const respo2 = await fetchUtilisateurs()
      props.setUtilisateurs(respo2.data)
    } catch (error) {
      alert('Erreur lors du suppression', error.message)
    }
  }
  console.log(utilisateur)
  return (
    <TableRow key={utilisateur.id}>
      <TableCell component="th" scope="row">
        {!editing ? (
          utilisateur.login
        ) : (
          <Input
            value={utilisateur.login}
            onChange={(e) =>
              setUtilisateur({ ...utilisateur, login: e.target.value })
            }
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          '**********'
        ) : (
          <Input
            value={utilisateur.password}
            type="password"
            onChange={(e) =>
              setUtilisateur({ ...utilisateur, password: e.target.value })
            }
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          utilisateur.profil && utilisateur.profil.name
        ) : (
          <Select
            value={utilisateur.profil && utilisateur.profil.id}
            onChange={(e) =>
              setUtilisateur({ ...utilisateur, profil: e.target.value })
            }
          >
            <MenuItem value={1}>Administrateur</MenuItem>
            <MenuItem value={2}>User</MenuItem>
          </Select>
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          utilisateur.nom
        ) : (
          <Input
            value={utilisateur.nom}
            onChange={(e) =>
              setUtilisateur({ ...utilisateur, nom: e.target.value })
            }
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          utilisateur.prenom
        ) : (
          <Input
            value={utilisateur.prenom}
            onChange={(e) =>
              setUtilisateur({ ...utilisateur, prenom: e.target.value })
            }
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          utilisateur.mail
        ) : (
          <Input
            value={utilisateur.mail}
            onChange={(e) =>
              setUtilisateur({ ...utilisateur, mail: e.target.value })
            }
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          utilisateur.tel
        ) : (
          <Input
            value={utilisateur.tel}
            onChange={(e) =>
              setUtilisateur({ ...utilisateur, tel: e.target.value })
            }
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          <UpdateRounded color="primary" onClick={(e) => setEditing(true)} />
        ) : (
          <>
            <SaveRounded color="primary" onClick={update} />
            <CancelRounded
              color="secondary"
              onClick={(e) => setEditing(false)}
            />
          </>
        )}
      </TableCell>
      <TableCell align="right">
        <DeleteRounded color="secondary" onClick={deleteU} />
      </TableCell>
    </TableRow>
  )
}
