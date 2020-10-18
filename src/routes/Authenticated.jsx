import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { useUser } from 'features/auth/providers/UserProvider'
import history from 'helpers/history'
import Header from 'ui/components/Header'
import Article from 'features/dashboard/modules/article'
import Client from 'features/dashboard/modules/client'
import Utilisateur from 'features/dashboard/modules/utilisateur'
import Facture from 'features/dashboard/modules/facture'

const NotFound = () => <h2>404 Not Found</h2>

export default () => {
  const { user } = useUser()

  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          component={
            user.data && user.data.profil && user.data.profil.id === 1
              ? Utilisateur
              : Article
          }
        />
        {user.data && user.data.profil && user.data.profil.id === 1 && (
          <Route path="/utilisateur" exact component={Utilisateur} />
        )}
        <Route path="/article" exact component={Article} />
        <Route path="/client" exact component={Client} />
        <Route path="/facture" exact component={Facture} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
