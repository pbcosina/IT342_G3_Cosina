import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './Causes.css';

const Causes = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [causes, setCauses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const token = localStorage.getItem('token');
    const api = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    useEffect(() => {
        fetchCauses();
    }, [searchQuery]);

    const fetchCauses = async () => {
        try {
            const res = await api.get('/causes' + (searchQuery ? `?search=${searchQuery}` : ''));
            setCauses(res.data);
        } catch (error) {
            console.error('Failed to fetch causes', error);
        }
    };

    return (
        <div className="causes-layout">
            <Sidebar />
            <main className="main-content causes-main">
                <header className="top-header">
                    <div className="user-profile">
                        <span>{user?.name || 'User'}</span>
                        <div className="user-avatar-placeholder" />
                    </div>
                </header>
                <div className="content-body">
                    <div className="search-container">
                        <div className="search-bar-wrapper">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#7d8597" style={{ flexShrink: 0 }}>
                                <path d="M11 3a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 11 3zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
                            </svg>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by category or title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <h2 className="causes-page-title">Browse Causes</h2>
                    <div className="causes-grid">
                        {causes.length === 0
                            ? <p className="no-causes-msg">No causes found.</p>
                            : causes.map(cause => (
                                <div className="cause-card" key={cause.id} onClick={() => navigate(`/causes/${cause.id}`)}>
                                    <div
                                        className="cause-image"
                                        style={{ backgroundImage: `url(${cause.imageUrl || 'https://via.placeholder.com/300'})` }}
                                    ></div>
                                    <div className="cause-info">
                                        <h3 className="cause-title">{cause.title}</h3>
                                        <p className="cause-snippet">
                                            {cause.story ? cause.story.substring(0, 80) + '...' : 'No description'}
                                        </p>
                                        <p className="cause-author">{cause.authorName}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Causes;
