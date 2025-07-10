import React, { useState, useEffect, useRef } from 'react'
import Header from '../templates/Header'
import Footer from '../templates/Footer'
import Cookies from 'js-cookie';
import Context from '../Context'
import { useContext } from 'react'


function Login() {

  const { isLogin, setIsLogin } = useContext(Context);
  const apiUrl = useContext(Context).apiUrl;

  if(isLogin) {
    location.href = '/';
    return;
  }

  const formLogin = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const btnLogin = useRef(null);
  const alertLoginForm = useRef(null);


  useEffect(() => {

    let showAlertForm = (status) => {
      if(status == 'submit') {
        alertLoginForm.current.classList.add('bg-gray-300');
        alertLoginForm.current.innerHTML = 'Tunggu sebentar...';
        alertLoginForm.current.classList.replace('hidden', 'block');
        
      } else if(status == 'validationerror') {
        alertLoginForm.current.innerHTML = 'Login gagal, pastikan email dan password benar!';
        alertLoginForm.current.classList.replace('bg-gray-300', 'bg-red-300');
        alertLoginForm.current.classList.replace('hidden', 'block');
        setTimeout(() => {
          alertLoginForm.current.innerHTML = 'Tunggu sebentar...!';
          alertLoginForm.current.classList.replace('block', 'hidden');
          alertLoginForm.current.classList.replace('bg-red-300', 'bg-gray-300');
        }, 3000);
      } else if(status == 'success') {
        alertLoginForm.current.innerHTML = 'Login berhasil!';
        alertLoginForm.current.classList.replace('bg-gray-300', 'bg-green-300');
        alertLoginForm.current.classList.replace('hidden', 'block');
      }
    }

    const formData = new FormData();
    
    const fetchLogin = async e => {
        showAlertForm('submit');
        e.preventDefault();

        formData.append('email', inputEmail.current.value);
        formData.append('password', inputPassword.current.value);

        try {
          const res = await fetch(apiUrl+'/user/login', {
            method: 'POST',
            body: formData
          });
          if(!res.ok) {
            showAlertForm('validationerror');
            console.log('res not ok');
            return
          }
          const data = await res.json();
          console.log(data);
          if(data.status == 200) {
            showAlertForm('success');
            Cookies.set('username', data.cookiesdata.username, { expires: 30, path: '/' });
            Cookies.set('sessionkey', data.cookiesdata.sessionkey, { expires: 30, path: '/' });
            Cookies.set('islogin', true, { expires: 30, path: '/' });
            window.location.href = '/';
            return
          }
          showAlertForm('validationerror');
          return

        } catch (error) {
          console.log('Fetch error: '+error);
          return
        }
      }

      btnLogin.current.addEventListener('click', fetchLogin);

  }, [alertLoginForm])



  return (
    <>
      <Header />

      <div className="flex-grow flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 border border-gray-200 rounded-lg shadow-lg p-10 bg-white">
              <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 select-none">Masuk WarungApp</h2>
              <p ref={alertLoginForm} className='text-white py-1 px-2 text-center justify-center rounded-sm hidden'>Validation Error!</p>
              
              <form ref={formLogin} className="mt-8 space-y-6" action={`${import.meta.env.VITE_API_URL}/user/login`} method="POST" autoComplete="off" id="login-form">
                  <div className="rounded-md -space-y-px">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1 select-none">Email</label>
                        <input ref={inputEmail} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="contoh@email.com" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1 select-none">Password</label>
                        <input ref={inputPassword} id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="********" />
                    </div>
                  </div>

                  <div>
                  <button ref={btnLogin} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200">
                      Masuk
                  </button>
                  </div>
              </form>
              <p className="mt-4 text-center text-sm text-slate-600 select-none">
                  Tidak punya akun?&nbsp;
                  <a href="/register" className="font-semibold text-sky-600 hover:text-sky-700">Daftar di sini</a>.
              </p>
          </div>
      </div>

      <Footer />
    </>
  )
}

export default Login