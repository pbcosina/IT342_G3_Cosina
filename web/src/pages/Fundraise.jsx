import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './Fundraise.css';

const initialForm = {
    title: '',
    story: '',
    category: '',
    donationGoal: '',
    imageUrl: '',
    whoFor: ''
};

const Fundraise = () => {
    const { user } = useAuth();
    const [view, setView] = useState('list'); // 'list', 'create', 'preview', 'edit'
    const [myCauses, setMyCauses] = useState([]);
    const [formData, setFormData] = useState(initialForm);
    const [currentId, setCurrentId] = useState(null); // for edit
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');
    const api = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    useEffect(() => {
        if (view === 'list') {
            fetchMyCauses();
        }
    }, [view]);

    const fetchMyCauses = async () => {
        try {
            const res = await api.get('/causes/my');
            setMyCauses(res.data);
        } catch (error) {
            console.error('Failed to fetch my causes', error);
        }
    };

    const handleCreateClick = () => {
        setFormData(initialForm);
        setCurrentId(null);
        setView('whoFor'); // Initial step
        setMessage('');
    };

    const handleEditClick = (cause) => {
        setFormData({
            title: cause.title,
            story: cause.story,
            category: cause.category,
            donationGoal: cause.donationGoal,
            imageUrl: cause.imageUrl,
            whoFor: cause.whoFor || ''
        });
        setCurrentId(cause.id);
        setView('create');
        setMessage('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this fundraise?')) return;
        try {
            await api.delete(`/causes/${id}`);
            fetchMyCauses();
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWhoForSelect = (who) => {
        setFormData(prev => ({ ...prev, whoFor: who }));
        setView('create');
    };

    const handlePreview = (e) => {
        e.preventDefault();
        setView('preview');
    };

    const handleSave = async (status) => {
        try {
            const payload = { ...formData, status };
            if (currentId) {
                await api.put(`/causes/${currentId}`, payload);
            } else {
                await api.post('/causes', payload);
            }
            setMessage(`Fundraise ${status === 'PUBLISHED' ? 'published' : 'saved as draft'} successfully!`);
            setTimeout(() => setView('list'), 1500);
        } catch (error) {
            console.error('Save failed', error);
            setMessage('Failed to save. Please try again.');
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
                    {message && <div className="fundraise-message">{message}</div>}

                    {view === 'list' && (
                        <div className="fundraise-list-view">
                            <div className="list-header">
                                <h2>My Fundraises</h2>
                                <button className="start-btn" onClick={handleCreateClick}>+ Create Fundraise</button>
                            </div>
                            {myCauses.length === 0 ? (
                                <div className="empty-state">
                                    <p>You haven't started any fundraises yet.</p>
                                </div>
                            ) : (
                                <div className="causes-grid">
                                    {myCauses.map(cause => (
                                        <div className="cause-card" key={cause.id}>
                                            <div className="cause-image" style={{ backgroundImage: `url(${cause.imageUrl || 'https://via.placeholder.com/300'})` }}></div>
                                            <div className="cause-info">
                                                <h3 className="cause-title">{cause.title}</h3>
                                                <p className="cause-snippet">Status: <strong>{cause.status}</strong></p>
                                                <p className="cause-snippet">Goal: ₱{cause.donationGoal} | Raised: ₱{cause.currentDonation}</p>
                                                <div className="card-actions">
                                                    <button onClick={() => handleEditClick(cause)} className="edit-btn">Edit</button>
                                                    <button onClick={() => handleDelete(cause.id)} className="delete-btn">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {view === 'whoFor' && (
                        <div className="who-for-view">
                            <h2>Tell us who you're raising funds for</h2>
                            <p className="subtitle">This information helps us get to know you and your fundraising needs</p>

                            <div className="who-for-options">
                                <div className="who-for-card" onClick={() => handleWhoForSelect('Yourself')}>
                                    <div className="icon-placeholder"></div>
                                    <div className="who-for-text">
                                        <h3>Yourself</h3>
                                        <p>Funds are delivered to your bank account for your own use</p>
                                    </div>
                                </div>
                                <div className="who-for-card" onClick={() => handleWhoForSelect('Someone Else')}>
                                    <div className="icon-placeholder"></div>
                                    <div className="who-for-text">
                                        <h3>Someone Else</h3>
                                        <p>You'll invite a beneficiary to receive funds or distribute them yourself</p>
                                    </div>
                                </div>
                                <div className="who-for-card" onClick={() => handleWhoForSelect('Charity')}>
                                    <div className="icon-placeholder"></div>
                                    <div className="who-for-text">
                                        <h3>Charity</h3>
                                        <p>Raise funds for a registered non-profit organization</p>
                                    </div>
                                </div>
                            </div>
                            <button className="back-link" onClick={() => setView('list')}>Cancel</button>
                        </div>
                    )}

                    {view === 'create' && (
                        <div className="fundraise-form-view">
                            <button className="back-link" onClick={() => setView(currentId ? 'list' : 'whoFor')}>&larr; Back</button>
                            <h2>{currentId ? 'Edit Fundraise' : 'Create Fundraise Details'}</h2>
                            <form onSubmit={handlePreview} className="fundraise-form">
                                <div className="form-group">
                                    <label>Campaign Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Enter a descriptive title" />
                                </div>
                                <div className="form-group row-group">
                                    <div className="col">
                                        <label>Category</label>
                                        <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Health, Education, Emergency" />
                                    </div>
                                    <div className="col">
                                        <label>Donation Goal (₱)</label>
                                        <input type="number" name="donationGoal" value={formData.donationGoal} onChange={handleChange} required placeholder="0.00" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                                </div>
                                <div className="form-group">
                                    <label>Tell your story</label>
                                    <textarea name="story" value={formData.story} onChange={handleChange} required rows={8} placeholder="Why are you raising funds? How will the money be used?"></textarea>
                                </div>
                                <button type="submit" className="preview-btn">Preview Campaign</button>
                            </form>
                        </div>
                    )}

                    {view === 'preview' && (
                        <div className="preview-view">
                            <div className="preview-header">
                                <button className="back-link" onClick={() => setView('create')}>&larr; Back to Edit</button>
                                <h2>Preview Campaign</h2>
                            </div>

                            <div className="cause-details-container preview-container">
                                <div className="cause-details-image" style={{ backgroundImage: `url(${formData.imageUrl || 'https://via.placeholder.com/800'})` }}></div>
                                <h1 className="cause-details-title">{formData.title}</h1>
                                <div className="cause-meta">
                                    <span className="cause-category">{formData.category || 'Category'}</span>
                                    <span className="cause-whofor">For: {formData.whoFor}</span>
                                    <span className="cause-author-meta">Goal: ₱{formData.donationGoal || '0'}</span>
                                </div>
                                <div className="cause-story">
                                    <h2>About this cause</h2>
                                    <p>{formData.story}</p>
                                </div>
                            </div>

                            <div className="publish-actions">
                                <button className="draft-btn" onClick={() => handleSave('DRAFT')}>Save as Draft</button>
                                <button className="publish-btn" onClick={() => handleSave('PUBLISHED')}>{currentId ? 'Update & Publish' : 'Publish Campaign'}</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Fundraise;
