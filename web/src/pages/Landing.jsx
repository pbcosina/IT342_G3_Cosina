import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '10%' }}>
            <h1>Welcome to Our Application</h1>
            <p style={{ fontSize: '1.2em' }}>
                Experience the next generation of secure and efficient management.
            </p>
            <div style={{ marginTop: '2em' }}>
                <Link to="/login">
                    <button style={{ marginRight: '1em' }}>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Landing;
