import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import MainPublic from './layouts/MainPublic';
import MainAdmin from './layouts/MainAdmin';
import MainTop from './layouts/MainTop';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './views/HomePage';
import NotFound from './views/NotFound';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ProfilePage from './views/ProfilePage';
import About from './views/About';
import Contact from './views/Contact';
import ForgotPassword from './views/ForgotPassword';
import Posts from './views/Posts';
import PostDetails from './views/PostDetails';
import Dashboard from './views/admin/Dashboard';
import ManagePosts from './views/admin/ManagePosts';
import ManageCategories from './views/admin/ManageCategories';
import ManageUsers from './views/admin/ManageUsers';
import ManageBlog from './views/admin/ManageBlog';
import ManageSlider from './views/admin/ManageSlider';
import ManagePinnedPosts from './views/admin/ManagePinnedPosts';
import ManageAbout from './views/admin/ManageAbout';
import ManageContact from './views/admin/ManageContact';
import ManagePrivacyPolicy from './views/admin/ManagePrivacyPolicy';

function App() {
  const { user, role } = useAuth();
  return (
    <Routes>
      <Route element={<MainTop />}>
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
          <Route path='admin/categories' element={<ManageCategories />} />
          <Route path='admin/users' element={<ManageUsers />} />
          <Route path='admin/blog' element={<ManageBlog />} />
          <Route path='admin/slider' element={<ManageSlider />} />
          <Route path='admin/pinned-posts' element={<ManagePinnedPosts />} />
          <Route path='admin/about' element={<ManageAbout />} />
          <Route path='admin/contact' element={<ManageContact />} />
          <Route
            path='admin/privacy-policy'
            element={<ManagePrivacyPolicy />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
