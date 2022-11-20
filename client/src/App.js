import { Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import Dashboard from './views/admin/Dashboard';
import NotFound from './views/NotFound';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ProfilePage from './views/ProfilePage';
import About from './views/About';
import Contact from './views/Contact';
import PrivateRoute from './utils/PrivateRoute';
import { useAuth } from './contexts/authContext';

function App() {
  const { user, role } = useAuth();
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
      <Route
        path='dashboard'
        element={
          <PrivateRoute redirectPath='/' permissions={!!user && role}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route
        path='account'
        element={
          <PrivateRoute redirectPath='/login' permissions={!!user}>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      {/* <Route path='/account' element={<ProfilePage />} /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
