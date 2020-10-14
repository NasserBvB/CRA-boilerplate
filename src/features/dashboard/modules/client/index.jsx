import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Container from 'ui/components/Container'
import SEO from 'ui/components/SEO'
import Button from 'ui/components/Button'
import NewClient from './NewClient'
import ClientComp from './clientComp'

export default function Client() {
  const [clients, setClients] = useState([])
  useEffect(() => {
    async function fetchClient() {
      try {
        const data = await axios.get(`/client/findAll`)
        setClients(data.data)
      } catch (error) {
        alert(error.message)
      }
    }
    fetchClient()
    console.log(clients)
  }, [clients])

  return (
    <Container>
      <SEO url="/" title="Client" />
      <div class="container">
        <div className="header">
          <h2>Client</h2>
          <Button
            onClick={(e) =>
              (document.getElementById('myModal2').style.display = 'block')
            }
          >
            {<NavLink to="#">Creer un Client</NavLink>}
          </Button>
          <div id="myModal2" className="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={(e) =>
                  (document.getElementById('myModal2').style.display = 'none')
                }
              >
                &times;
              </span>
              <NewClient setClients={setClients} />
            </div>
          </div>
        </div>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Client Id</div>
            <div className="col col-2">Nom</div>
            <div className="col col-3">Ville</div>
            <div className="col col-4">Email</div>
            <div className="col col-4">Téléphone</div>
            <div className="col col-4">Code</div>
            <div className="col col-4">Adresse</div>
            <div className="col col-4">Date Création</div>
          </li>
          <div className="custom-items">
            {clients &&
              clients.map((client, index) => {
                return (
                  <ClientComp
                    client={client}
                    key={index}
                    setClients={setClients}
                  />
                )
              })}
          </div>
        </ul>
      </div>
    </Container>
  )
}
