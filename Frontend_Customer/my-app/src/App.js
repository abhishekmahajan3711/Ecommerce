import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import FilterPage from './filter/FilterPage';
import SpecificProduct from './products/SpecificProduct';
import PaymentPage from './payment/PaymentPage';
import PaymentConfirm from './payment/PaymentConfirm';
import OrdersPage from './orders/OrdersPage';
import CartPage from './cart/CartPage';
import Profile from './user/Profile';
import ForgotPassword from './user/ForgotPassword';
import VerifyEmail from './user/VerifyEmail';

// Customer Service Pages
import ContactUs from './customer_service/ContactUs';
import FAQ from './customer_service/FAQ';
import ShippingInfo from './customer_service/ShippingInfo';
import ExchangeReturn from './customer_service/ExchangeReturn';

// Policy Pages
import PrivacyPolicy from './policy/PrivacyPolicy';
import TermsConditions from './policy/TermsConditions';
import CookiesPolicy from './policy/CookiesPolicy';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<FilterPage />} />
            <Route path="/product/:id" element={<SpecificProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/confirm" element={<PaymentConfirm />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            
            {/* Customer Service Routes */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/returns" element={<ExchangeReturn />} />
            
            {/* Policy Routes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
