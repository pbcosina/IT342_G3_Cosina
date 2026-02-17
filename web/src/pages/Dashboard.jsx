import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="card">
                <h2>Welcome, {user?.username}!</h2>
                <p>This is a protected page.</p>
                <p>Role: {user?.role}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
