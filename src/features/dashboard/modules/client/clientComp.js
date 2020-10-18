import React, { useState } from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {
  DeleteRounded,
  UpdateRounded,
  CancelRounded,
  SaveRounded,
} from '@material-ui/icons'
import { updateClient, deleteClient, fetchClients } from '../../actions/client'

export default function ClientComp(props) {
  const [client, setClient] = useState(props.client || {})
  const [editing, setEditing] = useState(false)
  async function update(e) {
    e.preventDefault()
    try {
      console.log(client)
      await updateClient(client)
      const respo9 = await fetchClients()
      props.setClients(respo9.data)
    } catch (error) {
      alert('Erreur lors du modification', error.message)
    }
    setEditing(false)
  }

  async function deleteC(e) {
    e.preventDefault()
    try {
      console.log(client)
      await deleteClient(client.id)
      const respo2 = await fetchClients()
      props.setClients(respo2.data)
    } catch (error) {
      alert('Erreur lors du suppression', error.message)
    }
  }

  return (
    <TableRow key={client.id}>
      <TableCell component="th" scope="row">
        {!editing ? (
          client.nom
        ) : (
          <Input
            value={client.nom}
            onChange={(e) => setClient({ ...client, nom: e.target.value })}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          client.ville == '1' ? (
            'Rabat'
          ) : (
            'Casa'
          )
        ) : (
          <Select
            value={client.ville}
            onChange={(e) => setClient({ ...client, ville: e.target.value })}
          >
            <MenuItem value="1">Rabat </MenuItem>
            <MenuItem value="2">Casa</MenuItem>
          </Select>
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          client.tel
        ) : (
          <Input
            value={client.tel}
            onChange={(e) => setClient({ ...client, tel: e.target.value })}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          client.code
        ) : (
          <Input
            value={client.code}
            onChange={(e) => setClient({ ...client, code: e.target.value })}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          client.adresse
        ) : (
          <Input
            value={client.adresse}
            onChange={(e) => setClient({ ...client, adresse: e.target.value })}
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
        <DeleteRounded color="secondary" onClick={deleteC} />
      </TableCell>
    </TableRow>
  )
}
