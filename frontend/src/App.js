import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Addaddress from './components/Addaddress';
import ChangePassword from './components/ChangePassword';
import HomeModule from './components/HomeModule';
import Login from './components/Login';
import Registration from './components/Registration'
import UserProfile from './components/UserProfile';
import DashBoard from './components/DashBoard'
import MapContainer from './components/MapContainer';
import EditProfile from './components/EditProfile'
import Editaddress from './components/Editaddress';
import ForgotEmail from './components/ForgotEmail';
import ForgotPass from './components/ForgotPass';
import Logo from './components/Logo';
import Product from './components/Product';
import SelectAddress from './components/Selectaddress';
import Order from './components/Order';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap'

function App() {
  return (
    <>
   
  <Router>
  {localStorage.getItem('user') !== null?<Header/>:<Navigation/>}
    <Routes>

    <Route path="/" element={<DashBoard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/locateus" element={<MapContainer/>}/>
      <Route path="/changepassword" element={<ChangePassword/>}/>
      <Route path="/userprofile" element={<UserProfile/>}/>
      <Route path="/addaddress" element={<Addaddress/>}/>
      <Route path="/home" element={<HomeModule/>}/>
      <Route path="/editdata" element={<EditProfile/>}/>
      <Route path="/editaddress" element={<Editaddress/>}/> 
      <Route path="/forgot" element={<ForgotEmail/>} />
      <Route path="/forgotpass" element={<ForgotPass/>} />
      <Route path="/addlogo" element={<Logo/>}/>
      <Route path="/product" element={<Product/>}/>
      <Route path="/order" element={<Order/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/selectaddress" element={<SelectAddress/>}/>
    </Routes>
    <Container fluid className='mt-5'><Footer/></Container>
    
  </Router>
      
    </>
  );
}

export default App;
