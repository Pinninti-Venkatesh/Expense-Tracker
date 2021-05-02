import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BillBoard from './components/Bills/BillBoard';
import Dashboard from './components/Dashboard/dashboard';
import login from './components/login/login';
import NavBar from './components/NavBar';
import PrivateRoute from './helper/PrivateRoutes';
import './components/dashboard.scss'
const Routes = () => {
    return (
        <BrowserRouter>
            <div className="dashboard-container">
                <NavBar />
                <Switch>
                    <Route path='/' exact component={login} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <PrivateRoute path='/bills' component={BillBoard} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Routes;