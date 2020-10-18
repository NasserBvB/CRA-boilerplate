import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Input, MenuItem, Select, StepContent } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { fetchClients } from 'features/dashboard/actions/client'
import { fetchArticles } from 'features/dashboard/actions/article'
import Checkbox from '@material-ui/core/Checkbox'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import { createFacture } from 'features/dashboard/actions/facture'
import TablePaginationActions from 'features/dashboard/components/TablePaginationActions'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return [
    'Selectionner client',
    'Selectionnez les articles',
    'Impression du recu',
  ]
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Selectionner client'
    case 1:
      return 'Selectionnez les articles'
    case 2:
      return 'Impression du recu'
    default:
      return 'Unknown stepIndex'
  }
}

export default (props) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [facture, setFacture] = React.useState(
    props.facture || { client: {}, articles: [] }
  )
  const steps = getSteps()
  const [clients, setClients] = React.useState([])
  const [articles, setArticles] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(4)
  React.useEffect(() => {
    const fetchData = async () => {
      const clts = await fetchClients()
      const atcls = await fetchArticles()
      setClients(clts.data)
      setArticles(
        atcls.data.map((item) => {
          return { ...item, selected: false, quantite: 0 }
        })
      )
    }
    fetchData()
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleSelectedChange = (e, id, idArticle) => {
    setFacture({
      ...facture,
      articles:
        facture.articles.length > 0 &&
        facture.articles.find((item) => item.id === id)
          ? facture.articles.map((item, idx) => {
              return idArticle === item.id
                ? {
                    ...item,
                    selected: facture.articles[idx]
                      ? !facture.articles.find((ite) => ite.id === idArticle)
                          .selected
                      : true,
                  }
                : item
            })
          : articles.map((item, idx) => {
              return idArticle === item.id
                ? {
                    ...item,
                    selected: facture.articles[idx]
                      ? !facture.articles.find((ite) => ite.id === idArticle)
                          .selected
                      : true,
                  }
                : item
            }),
    })
  }

  const handleQuantiteChange = (e, id, idArticle) => {
    setFacture({
      ...facture,
      articles:
        facture.articles.length > 0 &&
        facture.articles.find((item) => item.id === id)
          ? facture.articles.map((item, idx) => {
              return idArticle === item.id
                ? {
                    ...item,
                    quantite: parseInt(e.target.value),
                  }
                : item
            })
          : articles.map((item, idx) => {
              return idArticle === item.id
                ? {
                    ...item,
                    quantite: parseInt(e.target.value),
                  }
                : item
            }),
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const create = async () => {
    try {
      const payload = {
        client: facture.client,
        articles: facture.articles
          .filter((item) => item.selected)
          .map((item) => {
            return {
              id: item.id,
              quantite: item.quantite,
            }
          }),
      }
      await createFacture(facture)
    } catch (error) {
      alert('Error lors du creation')
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent
              style={{
                display: 'grid',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {label === 'Selectionner client' && (
                <div style={{ padding: '5px' }}>
                  <Select
                    placeholder="Selectionnez un client"
                    value={facture.client}
                    onChange={(e) =>
                      setFacture({ ...facture, client: e.target.value })
                    }
                  >
                    <MenuItem value={{}} disabled>
                      Selectionnez un client
                    </MenuItem>
                    {(clients || []).map((item, index) => {
                      return (
                        <MenuItem value={item} key={index}>
                          {item.nom}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </div>
              )}

              {label === 'Selectionnez les articles' && (
                <div style={{ padding: '5px' }}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left"></TableCell>
                          <TableCell align="left">Labelle</TableCell>
                          <TableCell align="left">Quantite</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? articles.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : articles
                        ).map((row, index) => (
                          <>
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                <Checkbox
                                  checked={
                                    facture.articles.find(
                                      (ite) => ite.id === row.id
                                    ) &&
                                    facture.articles.find(
                                      (ite) => ite.id === row.id
                                    ).selected
                                  }
                                  onChange={(e) =>
                                    handleSelectedChange(e, row.id, row.id)
                                  }
                                  label={''}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.libele}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Input
                                  type="number"
                                  value={
                                    facture.articles.find(
                                      (ite) => ite.id === row.id
                                    ) &&
                                    facture.articles.find(
                                      (ite) => ite.id === row.id
                                    ).quantite
                                  }
                                  onChange={(e) =>
                                    handleQuantiteChange(e, row.id, row.id)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              { label: 'All', value: -1 },
                            ]}
                            colSpan={3}
                            count={articles.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: { 'aria-label': 'rows per page' },
                              native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                  <div className="buttons-save-facture">
                    <Button variant="outlined" color="primary" onClick={create}>
                      Enregistrer
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={(e) => props.setOpen(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}

              {label === 'Impression du recu' && (
                <div style={{ padding: '5px' }}>
                  <Button variant="outlined" color="primary">
                    Imprimer la facture
                  </Button>
                </div>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
