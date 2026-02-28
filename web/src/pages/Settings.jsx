import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import './Settings.css';

const Settings = () => {
    const { user } = useAuth();

    return (
        <div className="settings-layout">
            <Sidebar />
            <main className="settings-main">
                <header className="top-header">
                    <div className="user-profile">
                        <span>{user?.name || 'User'}</span>
                        <div className="user-avatar-placeholder" />
                    </div>
                </header>
                <div className="settings-body">
                    <h1 className="settings-title">Settings</h1>
                    <p className="settings-subtitle">Manage your account preferences and profile details.</p>
                    <div className="settings-card">
                        <p>Settings options will appear here.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
