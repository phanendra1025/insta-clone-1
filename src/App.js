import {Switch, Route} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <Route exact path="/" component={HomeRoute} />
    </Switch>
  </div>
)

export default App
