import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from './Context';
import Cookies from 'js-cookie';
import { CartProvider } from './CartContext.jsx';

import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

function App() {

  const [isLogin, setIsLogin] = useState(null);
  const [nameUser, setNameUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState('product');
  const [SESSION_KEY, setSESSION_KEY] = useState(Cookies.get('sessionkey'));
  const [USERNAME, setUsername] = useState(Cookies.get('username'));
  const [isLoading, setIsLoading] = useState(true);
  const [openSideBar, setOpenSideBar] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append('sessionkey', SESSION_KEY);
    formData.append('username', USERNAME);

    let sessionValidation = async () => {

      try {

        const res = await fetch(apiUrl+'/user/sessionvalidation', {
          method: 'POST',
          body: formData
        });
        if(!res.ok) {
          console.error('Res not ok!');
        }
        const data = await res.json();
        setIsLoading(false);
        
        if(data.status == 200) {
            if(data.isAdmin) {
              setIsLogin(true);
              setNameUser(data.username);
              setIsAdmin(true);
              console.log('adminn')
              return;
            }
            setIsLogin(true);
            setNameUser(data.username);
            setIsAdmin(false);
            console.log('user')
            return;
        } else {
            setIsLogin(false);
            setNameUser('anon');
            setIsAdmin(false);
            console.log('ure guest')
            return;
        }

      } catch (error) {
        console.error('Error Fetching Data:', error);
      }


    }
  
  useEffect(() => {

    sessionValidation();

  }, [])

  if (isLoading) {
    return <div>Loading application data...</div>;
  }

  return (
    <Context.Provider value={
      { 
        isLogin,
        setIsLogin,
        nameUser,
        setNameUser,
        isAdmin,
        setIsAdmin,
        currentPage,
        setCurrentPage,
        openSideBar,
        setOpenSideBar,
        apiUrl 
      }
    }>
      <CartProvider>
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </Context.Provider>
  )
}

export default App