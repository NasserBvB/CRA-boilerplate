import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'
import Button from 'ui/components/Button'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import {
  DeleteRounded,
  UpdateRounded,
  CancelRounded,
  SaveRounded,
} from '@material-ui/icons'
import {
  updateArticle,
  deleteArticle,
  fetchArticles,
} from '../../actions/article'

export default function ArticleComp(props) {
  const [article, setArticle] = useState(props.article || {})
  const [editing, setEditing] = useState(false)
  async function update(e) {
    e.preventDefault()
    try {
      console.log({
        ...article,
        type: { id: article.id, name: article.id === 1 ? 'Type 1' : 'Type 2' },
      })
      await updateArticle({
        ...article,
        type: {
          id: article.type,
          name: article.id === 1 ? 'Type 1' : 'Type 2',
        },
      })
      const respo9 = await fetchArticles()
      props.setArticles(respo9.data)
    } catch (error) {
      alert('Erreur lors du modification', error.message)
    }
    setEditing(false)
  }

  async function deleteA(e) {
    e.preventDefault()
    try {
      await deleteArticle(article.id)
      const respo2 = await fetchArticles()
      props.setArticles(respo2.data)
    } catch (error) {
      alert('Erreur lors du suppression', error.message)
    }
  }

  return (
    <TableRow key={article.id} >
      <TableCell component="th" scope="row">
        {!editing ? (
          article.libele
        ) : (
          <Input
            value={article.libele}
            onChange={(e) => setArticle({ ...article, libele: e.target.value })}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          article.qtemin
        ) : (
          <Input
            value={article.qtemin}
            onChange={(e) => setArticle({ ...article, qtemin: e.target.value })}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          article.reference
        ) : (
          <Input
            value={article.reference}
            onChange={(e) =>
              setArticle({ ...article, reference: e.target.value })
            }
          />
        )}
      </TableCell>
      <TableCell align="right">
        {!editing ? (
          article.type && article.type.name
        ) : (
          <Select
            value={article.type || article.type.id}
            onChange={(e) => setArticle({ ...article, type: e.target.value })}
          >
            <MenuItem value={1}>Type 1 </MenuItem>
            <MenuItem value={2}>Type 2</MenuItem>
          </Select>
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
        <DeleteRounded color="secondary" onClick={deleteA} />
      </TableCell>
    </TableRow>
  )
}
