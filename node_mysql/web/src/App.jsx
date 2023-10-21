import { BrowserRouter as Router, Route } from "react-router-dom"

import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

import { AuthProvider } from "./Context/AuthContext"

function App() {

  return (
    <div>
      <AuthProvider>
        <Router>
            <Route exact path="/" component={Login} />
            <Route path="/dasboard" component={Dashboard} />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
