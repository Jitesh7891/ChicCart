import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Order from './pages/order/Order';
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/myState';
import Login from './pages/registration/login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productinfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <MyState>

      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/order" element={<Order/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/productinfo/:id" element={<ProductInfo/>} />
            <Route path="/addproduct" element={<AddProduct/>} />
            <Route path="/updateproduct" element={<UpdateProduct/>} />
            <Route path="/*" element={<Nopage/>} />
          </Routes>
          <ToastContainer 
  position="top-right" 
  autoClose={5000} // Set appropriate timing
  hideProgressBar={false}
/>

      </Router>

    </MyState>
  )
}

export default App
