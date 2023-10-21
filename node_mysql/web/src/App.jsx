import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom.min"

import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dasboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
