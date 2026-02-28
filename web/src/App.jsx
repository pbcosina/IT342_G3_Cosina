import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Causes from './pages/Causes';
import CauseDetails from './pages/CauseDetails';
import Fundraise from './pages/Fundraise';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/causes"
        element={
          <PrivateRoute>
            <Causes />
          </PrivateRoute>
        }
      />
      <Route
        path="/causes/:id"
        element={
          <PrivateRoute>
            <CauseDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/fundraise"
        element={
          <PrivateRoute>
            <Fundraise />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
