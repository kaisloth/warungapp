import React, { useState, useEffect, useRef } from 'react'
import Header from '../templates/Header'
import Footer from '../templates/Footer'
import Cookies from 'js-cookie';
import Context from '../Context'
import { useContext } from 'react'


function Login() {

  const { isLogin, setIsLogin } = useContext(Context);

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

    let showAlertForm = () => {
      alertLoginForm.current.classList.replace('hidden', 'block');
      setTimeout(() => {
        alertLoginForm.current.classList.replace('block', 'hidden');
      }, 3000);
    }

    const formData = new FormData();
    
      const fetchLogin = async e => {
        e.preventDefault();

        formData.append('email', inputEmail.current.value);
        formData.append('password', inputPassword.current.value);

        try {
          const res = await fetch(import.meta.env.VITE_API_URL+'/user/login', {
            method: 'POST',
            body: formData
          });
          if(!res.ok) {
            showAlertForm();
            console.log('res not ok');
            return
          }
          const data = await res.json();
          console.log(data);
          if(data.status == 200) {
            Cookies.set('username', data.cookiesdata.username, { expires: 30, path: '/' });
            Cookies.set('sessionkey', data.cookiesdata.sessionkey, { expires: 30, path: '/' });
            Cookies.set('islogin', data.cookiesdata.sessionkey, { expires: 30, path: '/' });
            window.location.href = '/';
            return
          }

        } catch (error) {
          console.log('Fetch error: '+error);
          showAlertForm();
          return
        }
      }

      btnLogin.current.addEventListener('click', fetchLogin);

  }, [])



  return (
    <>
      <Header />

      <div class="flex-grow flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full space-y-8 border border-gray-200 rounded-lg shadow-lg p-10 bg-white">
              <h2 class="mt-2 text-center text-3xl font-extrabold text-slate-900 select-none">Masuk WarungApp</h2>
              <p ref={alertLoginForm} className='bg-red-300 text-white py-1 px-2 text-center justify-center rounded-sm hidden'>Validation Error!</p>
              
              <form ref={formLogin} class="mt-8 space-y-6" action={`${import.meta.env.VITE_API_URL}/user/login`} method="POST" autocomplete="off" id="login-form">
                  <div class="rounded-md -space-y-px">
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-semibold text-slate-700 mb-1 select-none">Email</label>
                        <input ref={inputEmail} id="email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="contoh@email.com" />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-semibold text-slate-700 mb-1 select-none">Password</label>
                        <input ref={inputPassword} id="password" name="password" type="password" autocomplete="new-password" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="********" />
                    </div>
                  </div>

                  <div>
                  <button ref={btnLogin} type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200">
                      Masuk
                  </button>
                  </div>
              </form>
              <p class="mt-4 text-center text-sm text-slate-600 select-none">
                  Tidak punya akun?&nbsp;
                  <a href="/register" class="font-semibold text-sky-600 hover:text-sky-700">Daftar di sini</a>.
              </p>
          </div>
      </div>

      <Footer />
    </>
  )
}

export default Login