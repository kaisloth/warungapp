import React, { useRef, forwardRef, useEffect } from 'react'

const NotifOverlays = forwardRef((props, notifOverlay) => {

  const btnOk = useRef(null);

  useEffect(() => {
     btnOk.current.addEventListener('click', () => {
       props.getUserOrders();
      notifOverlay.current.classList.replace('flex', 'hidden');
    })
  })

  return (
    <div ref={notifOverlay} className='fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen hidden justify-center pt-32 z-50'>
        <div className='p-8 rounded-lg flex flex-col gap-6 justify-center h-fit align-center bg-white'>
            <span className='flex justify-center mt-4'>

                <svg width="64" height="64" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12.3906C2 6.86778 6.47715 2.39062 12 2.39062C17.5228 2.39062 22 6.86778 22 12.3906C22 17.9135 17.5228 22.3906 12 22.3906C6.47715 22.3906 2 17.9135 2 12.3906ZM15.5071 9.85447C15.2142 9.56158 14.7393 9.56158 14.4464 9.85447L10.9649 13.336L9.55359 11.9247C9.2607 11.6318 8.78582 11.6318 8.49293 11.9247C8.20004 12.2176 8.20004 12.6925 8.49294 12.9854L10.4346 14.927C10.7275 15.2199 11.2023 15.2199 11.4952 14.927L15.5071 10.9151C15.8 10.6222 15.8 10.1474 15.5071 9.85447Z" fill="#00c951"/>
                </svg>

            </span>
            <p className='text-center text-2xl font-bold'>Pesanan berhasil dibuat!</p>

            <button ref={btnOk} className='bg-gray-800 hover:bg-gray-700 p-2 mt-2 rounded-sm text-white cursor-pointer'>Oke</button>

        </div>
    </div>
  )
})

export default NotifOverlays