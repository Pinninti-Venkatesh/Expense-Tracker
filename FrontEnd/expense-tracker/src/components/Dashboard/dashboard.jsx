import NavBar from "./NavBar";
// import './dashboard'
import './dashboard.scss'
const Dashboard = () => {
    return (
    <div className="dashboard-container">
        <NavBar />
        <div className="main-widget-mod"></div>
        <div className="cat-trans-mod">
            <div className="category-mod"></div>
            <div className="transaction-mod"></div>
        </div>
    </div>
    );
}

export default Dashboard;