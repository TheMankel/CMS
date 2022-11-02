import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './views/HomePage';
import Dashboard from './views/admin/Dashboard';
import NotFound from './views/NotFound';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/home' />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
