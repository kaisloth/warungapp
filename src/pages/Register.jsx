import React from 'react'
import Header from '../templates/Header'
import Footer from '../templates/Footer'
import Context from '../Context'
import { useContext } from 'react'

function Register() {

    const { isLogin, setIsLogin } = useContext(Context);

    const apiUrl = import.meta.env.VITE_API_URL;

    if(isLogin) {
        location.href = '/';
        return;
    }

  return (
    <>  
        <Header />

        <div class="flex-grow flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8 border border-gray-200 rounded-lg shadow-lg p-10 bg-white">
                <h2 class="mt-2 text-center text-3xl font-extrabold text-slate-900 select-none">Daftar Akun Baru</h2>
                
                <form class="mt-8 space-y-6" action={apiUrl + '/user/register'} method="POST" autocomplete="off" id="register-form">
                    <div class="rounded-md -space-y-px">
                    <div class="mb-4">
                        <label for="fullname" class="block text-sm font-semibold text-slate-700 mb-1 select-none">Nama Lengkap</label>
                        <input id="fullname" name="name" type="text" autocomplete="name" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Masukkan nama lengkap" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-semibold text-slate-700 mb-1 select-none">Email</label>
                        <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="contoh@email.com" />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-semibold text-slate-700 mb-1 select-none">Password</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="********" />
                    </div>
                    <div>
                        <label for="password-confirm" class="block text-sm font-semibold text-slate-700 mb-1 select-none">Konfirmasi Password</label>
                        <input id="password-confirm" name="passwordConfirm" type="password" autocomplete="new-password" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="********" />
                    </div>
                    </div>

                    <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200">
                        Daftar
                    </button>
                    </div>
                </form>
                <p class="mt-4 text-center text-sm text-slate-600 select-none">
                    Sudah punya akun? &nbsp;
                    <a href="/login" class="font-semibold text-sky-600 hover:text-sky-700">Masuk di sini</a>.
                </p>
            </div>
        </div>

        <Footer />
    </>
  )
}

export default Register