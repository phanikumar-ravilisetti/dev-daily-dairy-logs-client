import {BrowserRouter, Switch, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'
import StandupForm from './components/StandupForm/StandupForm'
import ListOfLogsPage from './components/ListOfLogsPage/ListOfLogsPage'
import EditLogsPage from './components/EditLogsPage/EditLogsPage'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/standupform" component={StandupForm} />
          <Route exact path="/home" component={ListOfLogsPage} />
          <Route exact path="/logs/edit/:id" component={EditLogsPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

