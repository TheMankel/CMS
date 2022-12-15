import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import HomePage from './views/HomePage';
import Dashboard from './views/admin/Dashboard';
import NotFound from './views/NotFound';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ProfilePage from './views/ProfilePage';
import About from './views/About';
import Contact from './views/Contact';
import ForgotPassword from './views/ForgotPassword';
import Posts from './views/Posts';
import PostDetails from './views/PostDetails';
import PrivateRoute from './utils/PrivateRoute';
import MainPublic from './layouts/MainPublic';
import MainAdmin from './layouts/MainAdmin';
import ManagePosts from './views/admin/ManagePosts';
import ManageUsers from './views/admin/ManageUsers';
import AboutAdmin from './views/admin/AboutAdmin';
import Logo from './views/admin/Logo';
import SliderAdmin from './views/admin/SliderAdmin';
import PrivacyPolicy from './views/admin/PrivacyPolicy';
import ContactAdmin from './views/admin/ContactAdmin';
import PinnedPosts from './views/admin/PinnedPosts';
import Categories from './views/admin/Categories';

function App() {
  const { user, role } = useAuth();
  return (
    <Routes>
      <Route element={<MainPublic showDetailed={true} />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:postId' element={<PostDetails />} />
        <Route
          path='/account'
          element={
            <PrivateRoute redirectPath='/login' permissions={!!user}>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route element={<MainPublic showDetailed={false} />}>
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route
        element={
          <PrivateRoute redirectPath='/' permissions={!!user && role}>
            <MainAdmin />
          </PrivateRoute>
        }>
        <Route path='admin' element={<Navigate replace to='dashboard' />} />
        <Route path='admin/dashboard' element={<Dashboard />} />
        <Route path='admin/posts' element={<ManagePosts />} />
        <Route path='admin/categories' element={<Categories />} />
        <Route path='admin/users' element={<ManageUsers />} />
        <Route path='admin/logo' element={<Logo />} />
        <Route path='admin/slider' element={<SliderAdmin />} />
        <Route path='admin/pinned-posts' element={<PinnedPosts />} />
        <Route path='admin/about' element={<AboutAdmin />} />
        <Route path='admin/contact' element={<ContactAdmin />} />
        <Route path='admin/privacy-policy' element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
}

export default App;
