import NavBar from "./NavBar";
// import './dashboard'
import './dashboard.scss'
import MainWidgetMod from './MainWidgetMod'
import CategoryMod from "./CategoryMod";
const Dashboard = () => {
    return (
    <div className="dashboard-container">
        <NavBar />
        <MainWidgetMod/>
        <div className="cat-trans-mod">
            <CategoryMod />
            <div className="transaction-mod"></div>
        </div>
    </div>
    );
}

export default Dashboard;