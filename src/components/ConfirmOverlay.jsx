import React, { useRef, forwardRef, useEffect, useContext } from 'react'
import Context from '../Context'

const ConfirmOverlay = forwardRef((props, confirmOverlay) => {
    const btnDeleteOrder = useRef(null);
    const {apiUrl} = useContext(Context);

    let fetchDeleteOrder = async () => {
        const res = await fetch(apiUrl+'/order/delete/'+props.orderId);
        if (!res.ok) console.log('res not ok');
        const data = await res.json();
        if (data.status == 200) {props.getUserOrders(); confirmOverlay.current.classList.replace('flex', 'hidden');}
        else console.log(data.message);
    }

    useEffect(() => {
        console.log(props.orderId)
        btnDeleteOrder.current.addEventListener('click', () => fetchDeleteOrder())
    }, [props.orderId]);

  return (
    <div ref={confirmOverlay} className='fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen hidden justify-center pt-32 z-50'>
        <div className='px-8 pb-8 pt-4 rounded-lg flex flex-col gap-6 justify-center max-w-lg h-fit align-center bg-white'>
            <button className='self-end cursor-pointer translate-x-4' type='button' onClick={() => {confirmOverlay.current.classList.replace('flex', 'hidden')}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.9545 5.95548C6.39384 5.51614 7.10616 5.51614 7.5455 5.95548L11.999 10.409L16.4524 5.95561C16.8918 5.51627 17.6041 5.51627 18.0434 5.95561C18.4827 6.39495 18.4827 7.10726 18.0434 7.5466L13.59 12L18.0434 16.4534C18.4827 16.8927 18.4827 17.605 18.0434 18.0444C17.6041 18.4837 16.8918 18.4837 16.4524 18.0444L11.999 13.591L7.5455 18.0445C7.10616 18.4839 6.39384 18.4839 5.9545 18.0445C5.51517 17.6052 5.51516 16.8929 5.9545 16.4535L10.408 12L5.9545 7.54647C5.51516 7.10713 5.51517 6.39482 5.9545 5.95548Z" fill="#323544"/>
                </svg>
            </button>
            <span className='flex justify-center'>

                <svg width="64" height="64" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12.3906C2 6.86778 6.47715 2.39062 12 2.39062C17.5228 2.39062 22 6.86778 22 12.3906C22 17.9135 17.5228 22.3906 12 22.3906C6.47715 22.3906 2 17.9135 2 12.3906ZM12 9.74855C12.5965 9.74855 13.08 10.2321 13.08 10.8285C13.08 11.1942 12.8989 11.5177 12.6182 11.7142C12.3475 11.9037 12.0204 12.1568 11.7572 12.4747C11.491 12.7962 11.25 13.2332 11.25 13.7747C11.25 14.189 11.5858 14.5247 12 14.5247C12.4142 14.5247 12.75 14.189 12.75 13.7747C12.75 13.6997 12.7807 13.5905 12.9125 13.4314C13.0471 13.2688 13.2442 13.107 13.4785 12.943C14.143 12.4777 14.58 11.7042 14.58 10.8285C14.58 9.40363 13.4249 8.24855 12 8.24855C10.5751 8.24855 9.42006 9.40363 9.42006 10.8285C9.42006 11.2427 9.75584 11.5785 10.1701 11.5785C10.5843 11.5785 10.9201 11.2427 10.9201 10.8285C10.9201 10.2321 11.4036 9.74855 12 9.74855ZM11.2493 15.7827C11.2493 16.1969 11.5851 16.5327 11.9993 16.5327C12.4135 16.5327 12.75 16.1969 12.75 15.7827C12.75 15.3685 12.4135 15.0327 11.9993 15.0327C11.5851 15.0327 11.2493 15.3685 11.2493 15.7827Z" fill="#ff0000"/>
                </svg>


            </span>

            <p className='text-center text-xl font-bold'>{props.text}</p>

            <button type='button' ref={btnDeleteOrder} className='bg-red-500 hover:bg-red-600 p-2 rounded-sm text-center mt-4 text-white cursor-pointer'>Oke</button>

        </div>
    </div>
  )
})

export default ConfirmOverlay