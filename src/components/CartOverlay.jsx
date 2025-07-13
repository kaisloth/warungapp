import React, { useRef, forwardRef, useEffect, useState } from 'react'
import { useCart } from '../CartContext';
import Cookies from 'js-cookie';
import NotifOverlays from './NotifOverlays';

const CartOverlay = forwardRef((props, cartOverlay) => {

    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotalPrice } = useCart();

    let formatIdr = amount => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(amount);
    }

    if( cartItems.length == 0) {
        return (
            <>
                <div ref={cartOverlay} className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,.5)] hidden flex-col items-center pt-32 z-50'>
                    <div className='bg-white border border-gray-200 w-80 h-fit px-8 pb-8 pt-4 rounded-lg flex flex-col text-center'>
                        <button className='self-end cursor-pointer translate-x-4' type='button' onClick={() => {cartOverlay.current.classList.replace('flex', 'hidden')}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.9545 5.95548C6.39384 5.51614 7.10616 5.51614 7.5455 5.95548L11.999 10.409L16.4524 5.95561C16.8918 5.51627 17.6041 5.51627 18.0434 5.95561C18.4827 6.39495 18.4827 7.10726 18.0434 7.5466L13.59 12L18.0434 16.4534C18.4827 16.8927 18.4827 17.605 18.0434 18.0444C17.6041 18.4837 16.8918 18.4837 16.4524 18.0444L11.999 13.591L7.5455 18.0445C7.10616 18.4839 6.39384 18.4839 5.9545 18.0445C5.51517 17.6052 5.51516 16.8929 5.9545 16.4535L10.408 12L5.9545 7.54647C5.51516 7.10713 5.51517 6.39482 5.9545 5.95548Z" fill="#323544"/>
                            </svg>
                        </button>
                        <h2 className='text-center text-2xl font-extrabold text-slate-900 select-none mb-6'>Keranjang</h2>
                        <p>Keranjang Kosong</p>
                    </div>
                </div>
            </>
        )
    }


    const btnOrder = useRef(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [notifOverlay, setNotifOverlay] = useState()

    useEffect(() => {
        setNotifOverlay(props.notifOverlay.current);
    }, [])

    let idOrder = `order_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    let name_user = Cookies.get('username');
    let total_price = getTotalPrice();

    let id_product = [];
    let name_product = [];
    let price_product = [];
    let quantity_prodcut = [];
    cartItems.map((item) => {
        id_product.push(item.id_product);
        name_product.push(item.name_product);
        price_product.push(item.price_product);
        quantity_prodcut.push(item.quantity);
    });

    let createOrder = () => {
        let paramsData = new URLSearchParams();
        paramsData.append('id_order', idOrder);
        paramsData.append('name_user', name_user);
        paramsData.append('id_product', id_product);
        paramsData.append('name_product', name_product);
        paramsData.append('price_product', price_product);
        paramsData.append('quantity_product', quantity_prodcut);
        paramsData.append('total_price', total_price);

        fetch(apiUrl + '/order/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: paramsData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if(data.status == 200) {
                cartItems.map((item) => {
                    removeFromCart(item.id_product);
                })
                props.getUserOrders();
                cartOverlay.current.classList.replace('flex', 'hidden');
                notifOverlay.classList.replace('hidden', 'flex');
                return
            }
            console.log(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

  return (
    <>
    <div ref={cartOverlay} className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,.5)] hidden flex-col items-center pt-32 z-40'>
        <div className='bg-white border border-gray-200 w-80 h-fit px-8 pb-8 pt-4 rounded-lg flex flex-col'>
            <button className='self-end cursor-pointer translate-x-4' type='button' onClick={() => {cartOverlay.current.classList.replace('flex', 'hidden')}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.9545 5.95548C6.39384 5.51614 7.10616 5.51614 7.5455 5.95548L11.999 10.409L16.4524 5.95561C16.8918 5.51627 17.6041 5.51627 18.0434 5.95561C18.4827 6.39495 18.4827 7.10726 18.0434 7.5466L13.59 12L18.0434 16.4534C18.4827 16.8927 18.4827 17.605 18.0434 18.0444C17.6041 18.4837 16.8918 18.4837 16.4524 18.0444L11.999 13.591L7.5455 18.0445C7.10616 18.4839 6.39384 18.4839 5.9545 18.0445C5.51517 17.6052 5.51516 16.8929 5.9545 16.4535L10.408 12L5.9545 7.54647C5.51516 7.10713 5.51517 6.39482 5.9545 5.95548Z" fill="#323544"/>
                </svg>
            </button>
            <h2 className='text-center text-2xl font-extrabold text-slate-900 select-none mb-6'>Keranjang</h2>

            <form action={apiUrl+'/order/create'} method='post' className='flex flex-col w-full'>

                <div className='flex flex-col w-full gap-3 py-4'>

                {   
                    cartItems.map((item, i) => {   
                        return (
                            <>  
                                <div className='flex gap-2'>

                                    <span>{i+1}</span>
                                    <img className='w-16 aspect-square' src={item.image_product} alt="" />
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-bold'>{item.name_product}</p>
                                        <div className='flex items-center gap-2'>

                                            <div className='flex border border-gray-300 w-fit'>
                                                <button type='button' onClick={() => decreaseQuantity(item.id_product)} className='flex justify-center items-center bg-gray-700 hover:bg-gray-600 w-6 h-6 text-white font-bold rounded-sm cursor-pointer'>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.875 12C4.875 11.3787 5.37868 10.875 6 10.875H18.0007C18.622 10.875 19.1257 11.3787 19.1257 12C19.1257 12.6213 18.622 13.125 18.0007 13.125H6C5.37868 13.125 4.875 12.6213 4.875 12Z" fill="#fff"/>
                                                    </svg>
                                                </button>
                                                <p className='px-2'>{item.quantity}</p>
                                                <button type='button' onClick={() => increaseQuantity(item.id_product)} className='flex justify-center items-center bg-gray-700 hover:bg-gray-600 w-6 h-6 text-white font-bold rounded-sm cursor-pointer'>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0002 4.875C12.6216 4.875 13.1252 5.37868 13.1252 6V10.8752H18.0007C18.622 10.8752 19.1257 11.3789 19.1257 12.0002C19.1257 12.6216 18.622 13.1252 18.0007 13.1252H13.1252V18.0007C13.1252 18.622 12.6216 19.1257 12.0002 19.1257C11.3789 19.1257 10.8752 18.622 10.8752 18.0007V13.1252H6C5.37868 13.1252 4.875 12.6216 4.875 12.0002C4.875 11.3789 5.37868 10.8752 6 10.8752H10.8752V6C10.8752 5.37868 11.3789 4.875 12.0002 4.875Z" fill="#fff"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id_product)} type='button' className='p-1 bg-red-500 rounded-lg cursor-pointer hover:bg-red-400'>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.7223 12.7585C14.7426 12.3448 14.4237 11.9929 14.01 11.9726C13.5963 11.9522 13.2444 12.2711 13.2241 12.6848L12.9999 17.2415C12.9796 17.6552 13.2985 18.0071 13.7122 18.0274C14.1259 18.0478 14.4778 17.7289 14.4981 17.3152L14.7223 12.7585Z" fill="#fff"/>
                                                <path d="M9.98802 11.9726C9.5743 11.9929 9.25542 12.3448 9.27577 12.7585L9.49993 17.3152C9.52028 17.7289 9.87216 18.0478 10.2859 18.0274C10.6996 18.0071 11.0185 17.6552 10.9981 17.2415L10.774 12.6848C10.7536 12.2711 10.4017 11.9522 9.98802 11.9726Z" fill="#fff"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.249 2C9.00638 2 7.99902 3.00736 7.99902 4.25V5H5.5C4.25736 5 3.25 6.00736 3.25 7.25C3.25 8.28958 3.95503 9.16449 4.91303 9.42267L5.54076 19.8848C5.61205 21.0729 6.59642 22 7.78672 22H16.2113C17.4016 22 18.386 21.0729 18.4573 19.8848L19.085 9.42267C20.043 9.16449 20.748 8.28958 20.748 7.25C20.748 6.00736 19.7407 5 18.498 5H15.999V4.25C15.999 3.00736 14.9917 2 13.749 2H10.249ZM14.499 5V4.25C14.499 3.83579 14.1632 3.5 13.749 3.5H10.249C9.83481 3.5 9.49902 3.83579 9.49902 4.25V5H14.499ZM5.5 6.5C5.08579 6.5 4.75 6.83579 4.75 7.25C4.75 7.66421 5.08579 8 5.5 8H18.498C18.9123 8 19.248 7.66421 19.248 7.25C19.248 6.83579 18.9123 6.5 18.498 6.5H5.5ZM6.42037 9.5H17.5777L16.96 19.7949C16.9362 20.191 16.6081 20.5 16.2113 20.5H7.78672C7.38995 20.5 7.06183 20.191 7.03807 19.7949L6.42037 9.5Z" fill="#fff"/>
                                                </svg>

                                            </button>

                                        </div>
                                    </div>

                                </div>
                                
                            </>
                        )
                        
                    })
                }

                </div>

                <hr />
                
                <div className='flex w-full justify-between'>
                    <p>Total Harga:</p>
                    <p>{formatIdr(getTotalPrice())}</p>
                </div>

                <button ref={btnOrder} className='border border-gray-800 rounded-sm py-1 mt-8 cursor-pointer bg-gray-700 text-white hover:bg-gray-600' onClick={createOrder} type='button'>Pesan Sekarang</button>

            </form>
        </div>
    </div>
    
    </>
  )
});

export default CartOverlay
