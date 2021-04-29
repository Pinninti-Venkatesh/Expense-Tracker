import NavBar from "./NavBar";
// import './dashboard'
import './dashboard.scss'
import MainWidgetMod from './MainWidgetMod'
import CategoryMod from "./CategoryMod";
import TransactionsMod from "./TransactionsMod";
const Dashboard = () => {
    return (
    <div className="dashboard-container">
        <NavBar />
        <MainWidgetMod/>
        <div className="cat-trans-mod">
            <CategoryMod />
            <TransactionsMod />
        </div>
    </div>
    );
}

export default Dashboard;