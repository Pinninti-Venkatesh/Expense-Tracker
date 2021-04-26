import NavBar from "./NavBar";
// import './dashboard'
import './dashboard.scss'
import MainWidgetMod from './MainWidgetMod'
const Dashboard = () => {
    return (
    <div className="dashboard-container">
        <NavBar />
        <MainWidgetMod/>
        <div className="cat-trans-mod">
            <div className="category-mod"></div>
            <div className="transaction-mod"></div>
        </div>
    </div>
    );
}

export default Dashboard;