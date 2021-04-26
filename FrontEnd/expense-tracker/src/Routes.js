import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/dashboard';
import login from './components/login/login';
import PrivateRoute from './helper/PrivateRoutes';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={login} />
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;