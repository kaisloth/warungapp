import React, {useRef, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import Context from '../../Context'

function AdminLayout(props) { 

    const svg = {
        product: <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.91623 4.96229C6.31475 4.25385 7.0644 3.81543 7.87725 3.81543H16.1228C16.9356 3.81543 17.6852 4.25385 18.0838 4.96229L20.461 9.18826C20.6505 9.52506 20.75 9.90497 20.75 10.2914V19.0646C20.75 20.3072 19.7426 21.3146 18.5 21.3146H5.5C4.25736 21.3146 3.25 20.3072 3.25 19.0646V10.2914C3.25 9.90497 3.34952 9.52506 3.53898 9.18826L5.91623 4.96229ZM11.25 9.14853V5.31543H7.87725C7.6063 5.31543 7.35641 5.46157 7.22357 5.69772L5.28238 9.14853H11.25ZM4.75 10.6485V19.0646C4.75 19.4788 5.08579 19.8146 5.5 19.8146H18.5C18.9142 19.8146 19.25 19.4788 19.25 19.0646V10.6485H4.75ZM18.7176 9.14853H12.75V5.31543H16.1228C16.3937 5.31543 16.6436 5.46157 16.7764 5.69772L18.7176 9.14853Z" fill="#323544"/>
                </svg>,
        order: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.56641 4C1.56641 3.58579 1.90219 3.25 2.31641 3.25H3.49696C4.61854 3.25 5.56885 4.07602 5.72504 5.18668L5.7862 5.62161H19.7507C21.3714 5.62161 22.4605 7.28344 21.8137 8.76953L19.1464 14.8979C18.789 15.719 17.9788 16.25 17.0833 16.25L7.72179 16.25C6.60021 16.25 5.6499 15.424 5.49371 14.3133L4.23965 5.39556C4.18759 5.02534 3.87082 4.75 3.49696 4.75H2.31641C1.90219 4.75 1.56641 4.41421 1.56641 4ZM5.99714 7.12161L6.9791 14.1044C7.03116 14.4747 7.34793 14.75 7.72179 14.75L17.0833 14.75C17.3818 14.75 17.6519 14.573 17.771 14.2993L20.4383 8.17092C20.6539 7.67556 20.2909 7.12161 19.7507 7.12161H5.99714Z" fill="#323544"/>
                <path d="M6.03418 19.5C6.03418 18.5335 6.81768 17.75 7.78418 17.75C8.75068 17.75 9.53428 18.5335 9.53428 19.5C9.53428 20.4665 8.75078 21.25 7.78428 21.25C6.81778 21.25 6.03418 20.4665 6.03418 19.5Z" fill="#323544"/>
                <path d="M16.3203 17.75C15.3538 17.75 14.5703 18.5335 14.5703 19.5C14.5703 20.4665 15.3538 21.25 16.3203 21.25C17.2868 21.25 18.0704 20.4665 18.0704 19.5C18.0704 18.5335 17.2868 17.75 16.3203 17.75Z" fill="#323544"/>
                </svg>,
        logout: <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5781 2.5C10.3355 2.5 9.32812 3.50736 9.32812 4.75V6.6285C9.44877 6.70925 9.56333 6.80292 9.66985 6.90952L10.8281 8.06853V4.75C10.8281 4.33579 11.1639 4 11.5781 4H17.5781C17.9923 4 18.3281 4.33579 18.3281 4.75V20.25C18.3281 20.6642 17.9923 21 17.5781 21H11.5781C11.1639 21 10.8281 20.6642 10.8281 20.25V16.9314L9.6699 18.0904C9.56336 18.197 9.44879 18.2907 9.32812 18.3715V20.25C9.32812 21.4926 10.3355 22.5 11.5781 22.5H17.5781C18.8208 22.5 19.8281 21.4926 19.8281 20.25V4.75C19.8281 3.50736 18.8208 2.5 17.5781 2.5H11.5781Z" fill="#323544"/>
                <path d="M3.57812 12.5C3.57812 12.7259 3.67796 12.9284 3.83591 13.0659L7.79738 17.0301C8.09017 17.3231 8.56504 17.3233 8.85804 17.0305C9.15104 16.7377 9.1512 16.2629 8.85841 15.9699L6.14046 13.25L12.0781 13.25C12.4923 13.25 12.8281 12.9142 12.8281 12.5C12.8281 12.0858 12.4923 11.75 12.0781 11.75L6.14028 11.75L8.85839 9.03016C9.15119 8.73718 9.15104 8.2623 8.85806 7.9695C8.56507 7.6767 8.0902 7.67685 7.7974 7.96984L3.83388 11.9359C3.67711 12.0733 3.57812 12.2751 3.57812 12.5Z" fill="#323544"/>
                </svg>,
        profile: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.4337 6.35C16.4337 8.74 14.4937 10.69 12.0937 10.69L12.0837 10.68C9.69365 10.68 7.74365 8.73 7.74365 6.34C7.74365 3.95 9.70365 2 12.0937 2C14.4837 2 16.4337 3.96 16.4337 6.35ZM14.9337 6.34C14.9337 4.78 13.6637 3.5 12.0937 3.5C10.5337 3.5 9.25365 4.78 9.25365 6.34C9.25365 7.9 10.5337 9.18 12.0937 9.18C13.6537 9.18 14.9337 7.9 14.9337 6.34Z" fill="#323544"/>
                <path d="M12.0235 12.1895C14.6935 12.1895 16.7835 12.9395 18.2335 14.4195V14.4095C20.2801 16.4956 20.2739 19.2563 20.2735 19.4344L20.2735 19.4395C20.2635 19.8495 19.9335 20.1795 19.5235 20.1795H19.5135C19.0935 20.1695 18.7735 19.8295 18.7735 19.4195C18.7735 19.3695 18.7735 17.0895 17.1535 15.4495C15.9935 14.2795 14.2635 13.6795 12.0235 13.6795C9.78346 13.6795 8.05346 14.2795 6.89346 15.4495C5.27346 17.0995 5.27346 19.3995 5.27346 19.4195C5.27346 19.8295 4.94346 20.1795 4.53346 20.1795C4.17346 20.1995 3.77346 19.8595 3.77346 19.4495L3.77345 19.4448C3.77305 19.2771 3.76646 16.506 5.81346 14.4195C7.26346 12.9395 9.35346 12.1895 12.0235 12.1895Z" fill="#323544"/>
                </svg>,
        add:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0002 4.875C12.6216 4.875 13.1252 5.37868 13.1252 6V10.8752H18.0007C18.622 10.8752 19.1257 11.3789 19.1257 12.0002C19.1257 12.6216 18.622 13.1252 18.0007 13.1252H13.1252V18.0007C13.1252 18.622 12.6216 19.1257 12.0002 19.1257C11.3789 19.1257 10.8752 18.622 10.8752 18.0007V13.1252H6C5.37868 13.1252 4.875 12.6216 4.875 12.0002C4.875 11.3789 5.37868 10.8752 6 10.8752H10.8752V6C10.8752 5.37868 11.3789 4.875 12.0002 4.875Z" fill="#323544"/>
                </svg>
        }

    let openAddProductOverlay = () => {
        props.formAddProductOverlay.current.classList.replace('hidden', 'flex');
    }

    const { setCurrentPage } = useContext(Context);
    const apiUrl = useContext(Context).apiUrl;

    const btnLogout = useRef(null);
    const btnNavProduct = useRef(null);
    const btnNavOrder = useRef(null);

    useEffect(() => {
        let fetchLogout = async () => {
            const res = await fetch(apiUrl + '/user/logout')
            !res.ok && console.log('res not ok')
            const data = await res.json();
            if(data.status == 200) {
                Cookies.set('username', '', {'path': '/', 'expires': -1})
                Cookies.set('sessionkey', '', {'path': '/', 'expires': -1})
                Cookies.set('islogin', '', {'path': '/', 'expires': -1})
                console.log('Logout Success')
                window.location.reload()
                return
            }
        }
        btnLogout.current.addEventListener('click', fetchLogout)

        btnNavOrder.current.addEventListener('click', () => setCurrentPage('order'))
        btnNavProduct.current.addEventListener('click', () => setCurrentPage('product'))

    }, [])


  return (
    <aside className='border border-gray-200 shadow-xl h-full w-64'>
            <nav className='flex flex-col h-full'>
                <button type='button' ref={btnNavProduct} className={`flex gap-2 px-4 py-2 hover:bg-gray-200 ${location.pathname === '/' ? 'bg-gray-200' : ''}`}>
                    {svg.product}
                    Produk 
                </button>
                <button type='button' ref={btnNavOrder} className={`flex gap-2 px-4 py-2 hover:bg-gray-200 ${location.pathname === '/orders' ? 'bg-gray-200' : ''}`}>
                    {svg.order}
                    Pesanan
                </button>
            </nav>

            <div className='border-t-1 border-gray-200 py-2 hover:bg-gray-200 cursor-pointer px-4'>
                <button type='button' className='flex gap-2 py-2 cursor-pointer' onClick={openAddProductOverlay}>
                    {svg.add}
                    Tambah Produk
                
                </button>
            </div>

            <div className='self-end border-t-1 border-gray-200 flex flex-col'>
                <a href="/profile" className='flex gap-2 px-4 py-2 hover:bg-gray-200'>
                    {svg.profile}
                    {Cookies.get('username')}
                </a>
                <button ref={btnLogout} type='button' className='flex gap-2 px-4 py-2 hover:bg-gray-200'>
                    {svg.logout}
                    Keluar
                </button>
            </div>
        </aside>
  )
}

export default AdminLayout