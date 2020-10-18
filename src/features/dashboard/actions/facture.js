import axios from 'axios'

export const fetchFactures = async () => {
  try {
    const data = await axios.get(`/facture/findAll`)
    return data
  } catch (error) {
    alert(error.message)
  }
}

export const createFacture = async (facture) => {
  try {
    const data = await axios.post(`/facture/add`, facture)
    return data
  } catch (error) {
    alert(error)
  }
}

export const updateFacture = async (facture) => {
  try {
    const data = await axios.put(`/facture/update`, facture)
    return data
  } catch (error) {
    alert(error)
  }
}

export const deleteFacture = async (factureID) => {
  try {
    const data = await axios.delete(`/facture/delete/${factureID}`)
    return data
  } catch (error) {
    alert(error)
  }
}
