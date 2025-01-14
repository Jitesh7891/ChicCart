import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Order from './pages/order/Order';
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/MyState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productinfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  const stripePromise = loadStripe('pk_test_51QXk2AGBh6dS5l43Wq8dgJIfQfi1GCgbtlEMHbKb6uzNTP1x0uj2VF4b0cO9BnFt3yCMyFoNv8jiWVzX2GXw8isA00jzywgO6t');

  return (
    <MyState>
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/order" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/productinfo" element={<ProductInfo />} />
            <Route path="/login" element={
              <OnlyNonLoggedInRoute>
                <Login />
              </OnlyNonLoggedInRoute>
            } />
            <Route path="/signup" element={
              <OnlyNonLoggedInRoute>
                <Signup />
              </OnlyNonLoggedInRoute>
            } />
            <Route path="/addproduct" element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/updateproduct" element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/*" element={<Nopage />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </Router>
      </Elements>
    </MyState>
  );
}

export default App;

export const OnlyNonLoggedInRoute = ({ children }) => {
  if (localStorage.getItem('user')) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const ProtectedRouteForAdmin = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.user.email === 'admin@email.com') {
    return children;
  } else {
    return (<Navigate to="/" />);
  }
};