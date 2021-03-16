import React, { useCallback } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { routers, RouterType } from '/@/config/router'
import Layout from '/@/layouts'

const MyRouter = React.memo(() => {
  const renderRouter = useCallback(() => {
    return routers.map((route: RouterType) => {
      const { component: Component, path } = route
      return (
        <Route
          key={path}
          exact
          path={path}
          render={(props) => <Component {...props} />}
        />
      )
    })
  }, [])
  return (
    <Router>
      <Layout>
        <Switch>{renderRouter()}</Switch>
      </Layout>
    </Router>
  )
})

export default MyRouter
