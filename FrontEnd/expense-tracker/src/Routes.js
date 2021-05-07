import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BillBoard from './components/Bills/BillBoard';
import Dashboard from './components/Dashboard/dashboard';
import login from './components/login/login';
import NavBar from './components/NavBar';
import PrivateRoute from './helper/PrivateRoutes';
import './components/dashboard.scss'
import CTCTab from './components/CTC/CTCTab';
import SettingsHome from './components/Settings/SettingsHome';
const Routes = () => {
    return (
        <BrowserRouter>
            <div className="dashboard-container">
                <NavBar />
                <Switch>
                    <Route path='/' exact component={login} />
                    <PrivateRoute path='/dashboard' exact component={Dashboard} />
                    <PrivateRoute path='/bills' exact component={BillBoard} />
                    <PrivateRoute path='/ctc' exact component={CTCTab} />
                    <PrivateRoute path='/settings' exact component={SettingsHome}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Routes;