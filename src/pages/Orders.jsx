import React, {useRef, useState, useEffect, useContext} from 'react'
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import SideBar from '../components/SideBar';
import ProductCards from '../components/ProductCards';
import AddProductOverlay from '../components/AddProductOverlay';
import OrderCards from '../components/OrderCards';
import OrderDetailOverlay from '../components/OrderDetailOverlay';
import Context from '../Context';
import UserOrderCards from '../components/UserOrderCards';
import { redirect } from 'react-router-dom';


const Orders = () => {

    const formAddProductOverlay = useRef(null);
    const header = useRef(null);
    const contentContainer = useRef(null);

    useEffect(() => {
      let headerOffsetHeight = header.current.offsetHeight;
      contentContainer.current.style.height = `calc(100vh - ${headerOffsetHeight}px)`;
      contentContainer.current.style.paddingBottom = headerOffsetHeight+'px';
    })

    let ordersData = [
      {
        buyer_name: 'John Doe',
        total_items: 3,
        total_price: 100000,
        created_at: '25-06-2025',
        status: 'odered'
      },
      {
        buyer_name: 'Jane Doe',
        total_items: 3,
        total_price: 200000,
        created_at: '27-06-2025',        
        status: 'odered'
      }
    ]

    const { isLogin, setIsLogin } = useContext(Context);
    const { isAdmin, setIsAdmin } = useContext(Context);

    if(!isLogin) {
        return window.location.href = '/';
    };
    
    // For Users
    if(!isAdmin) {
      return (
          <>

            <Header ref={header} />

            <div className='flex'>

                <SideBar formAddProductOverlay={formAddProductOverlay} />
                <div ref={contentContainer} className='h-screen overflow-hidden w-full'>

                  <div className='flex flex-col h-full overflow-scroll pb-8'>
                    <div className='p-4 flex-2 relative'>
                        <h1 className='text-xl font-bold mb-4'>Pesanan:</h1>
                        <UserOrderCards statusOrder='ordered' orders={ordersData} />
                    </div>
                    <div className='p-4 flex-2 relative'>
                        <h1 className='text-xl font-bold mb-4'>Sedang Dikerjakan:</h1>
                        <UserOrderCards statusOrder='onprocess' orders={ordersData} />
                    </div>
                    <div className='p-4 flex-2 relative'>
                        <h1 className='text-xl font-bold mb-4'>Pesanan Selesai:</h1>
                        <UserOrderCards statusOrder='done' orders={ordersData} />
                    </div>
                  </div>

                </div>

            </div>

            <Footer />
          </>
        )
    }

  return (
    <>   
        
        <AddProductOverlay ref={formAddProductOverlay} />

        <Header ref={header} />

        <div className='flex'>

            <SideBar formAddProductOverlay={formAddProductOverlay} />
            <div ref={contentContainer} className='h-screen overflow-hidden w-full'>

                <div className='flex flex-col h-full overflow-scroll pb-8'>
                  <div className='p-4 flex-2 relative'>
                      <h1 className='text-xl font-bold mb-4'>Pesanan:</h1>
                      <OrderCards statusOrder='ordered' orders={ordersData} />
                  </div>
                  <div className='p-4 flex-2 relative'>
                      <h1 className='text-xl font-bold mb-4'>Sedang Dikerjakan:</h1>
                      <OrderCards statusOrder='onprocess' orders={ordersData} />
                  </div>
                  <div className='p-4 flex-2 relative'>
                      <h1 className='text-xl font-bold mb-4'>Pesanan Selesai:</h1>
                      <OrderCards statusOrder='done' orders={ordersData} />
                  </div>
                </div>

              </div>

        </div>

        <Footer />

    </>
  )
}

export default Orders;
