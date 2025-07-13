import React, { useRef, useEffect, useContext } from 'react'
import CartOverlay from '../CartOverlay';
import NotifOverlays from '../NotifOverlays';
import Cookies from 'js-cookie';
import Context from '../../Context';



function UserLayout(props) {
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
        cart:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.75 11.5001C10.1642 11.5001 10.5 11.8359 10.5 12.2501V16.2501C10.5 16.6643 10.1642 17.0001 9.75 17.0001C9.33579 17.0001 9 16.6643 9 16.2501V12.2501C9 11.8359 9.33579 11.5001 9.75 11.5001Z" fill="#323544"/>
                <path d="M15 12.2501C15 11.8359 14.6642 11.5001 14.25 11.5001C13.8358 11.5001 13.5 11.8359 13.5 12.2501V16.2501C13.5 16.6643 13.8358 17.0001 14.25 17.0001C14.6642 17.0001 15 16.6643 15 16.2501V12.2501Z" fill="#323544"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.68 2.13565C11.0194 2.37319 11.1019 2.84084 10.8644 3.18017L8.36533 6.75006H15.6347L13.1356 3.18017C12.8981 2.84084 12.9806 2.37319 13.32 2.13565C13.6593 1.89811 14.1269 1.98062 14.3645 2.31996L17.4657 6.75006H19.75C20.9926 6.75006 22 7.75742 22 9.00006V9.78517C22 10.4635 21.694 11.1057 21.1671 11.5329L20.0045 12.4755L19.2012 18.7843C19.0581 19.908 18.102 20.7501 16.9692 20.7501H7.03079C5.89803 20.7501 4.94189 19.908 4.79881 18.7843L3.99548 12.4755L2.83295 11.5329C2.30604 11.1056 2 10.4635 2 9.78517V9.00006C2 7.75742 3.00736 6.75006 4.25 6.75006H6.53432L9.63552 2.31996C9.87306 1.98062 10.3407 1.89811 10.68 2.13565ZM19.75 8.25006C20.1642 8.25006 20.5 8.58585 20.5 9.00006V9.78517C20.5 10.0113 20.398 10.2253 20.2224 10.3677L18.8262 11.4998C18.6762 11.6214 18.5789 11.7961 18.5545 11.9876L17.7132 18.5948C17.6655 18.9694 17.3468 19.2501 16.9692 19.2501H7.03079C6.6532 19.2501 6.33449 18.9694 6.28679 18.5948L5.44547 11.9876C5.42109 11.7961 5.32379 11.6214 5.17383 11.4998L3.77765 10.3677C3.60201 10.2253 3.5 10.0113 3.5 9.78517V9.00006C3.5 8.58585 3.83579 8.25006 4.25 8.25006H19.75Z" fill="#323544"/>
                </svg>
        }

    let openCart = () => {
        cartOverlay.current.classList.replace('hidden', 'flex')
    }

    const {currentPage,setCurrentPage} = useContext(Context);
    const {openSideBar} = useContext(Context);

    const cartOverlay = useRef(null);
    const notifOverlay = useRef(null);
    const btnLogout = useRef(null);
    const btnNavProduct = useRef(null);
    const btnNavOrder = useRef(null);
    const aside = useRef(null);

    useEffect(() => {
        let fetchLogout = async () => {
            const res = await fetch(import.meta.env.VITE_API_URL + '/user/logout')
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
        btnNavProduct.current.addEventListener('click', () => setCurrentPage('product'))
        btnNavOrder.current.addEventListener('click', () => setCurrentPage('order'))

        openSideBar ? aside.current.classList.replace('hidden', 'block') : aside.current.classList.replace('block', 'hidden');
    }, [openSideBar])

  return (
    <>
        <aside ref={aside} className='border border-gray-200 hidden shadow-xl h-full w-64'>
                <nav className='flex flex-col h-full'>
                    <button type='button' ref={btnNavProduct} className={`flex gap-2 px-4 py-2 hover:bg-gray-200 ${currentPage === 'product' ? 'bg-gray-200' : ''}`}>
                        {svg.product}
                        Produk 
                    </button>
                    <button type='button' ref={btnNavOrder} className={`flex gap-2 px-4 py-2 hover:bg-gray-200 ${currentPage === 'order' ? 'bg-gray-200' : ''}`}>
                        {svg.order}
                        Pesanan
                    </button>
                </nav>

                <div className='border-t-1 border-gray-200 py-2 hover:bg-gray-200 cursor-pointer'>
                    <button type='button' className='flex gap-2 py-2 cursor-pointer px-4 w-full' onClick={openCart}>
                        {svg.cart}
                        Keranjang
                    
                    </button>
                </div>

                <div className='self-end border-t-1 border-gray-200 flex flex-col'>
                    <button type='button' className='flex gap-2 px-4 py-2'>
                        {svg.profile}
                        {Cookies.get('username')}
                    </button>
                    <button type='button' ref={btnLogout} className='flex gap-2 px-4 py-2 hover:bg-gray-200'>
                        {svg.logout}
                        Keluar
                    </button>
                </div>
        </aside>

        <CartOverlay getUserOrders={props.getUserOrders} notifOverlay={notifOverlay} ref={cartOverlay} />
        <NotifOverlays getUserOrders={props.getUserOrders} ref={notifOverlay} />
    </>
  )
}

export default UserLayout