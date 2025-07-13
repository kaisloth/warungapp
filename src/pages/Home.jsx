import Footer from '../templates/Footer'
import '../index.css'
import Header from '../templates/Header'
import SideBar from '../components/SideBar'
import ProductCards from '../components/ProductCards'
import UserOrderCards from '../components/UserOrderCards'
import OrderCards from '../components/OrderCards'
import Context from '../Context'
import { useState, useContext, useEffect, useRef } from 'react'
import AddProductOverlay from '../components/AddProductOverlay'
import Cookies from 'js-cookie'


function Home() {

    const { isLogin, setIsLogin } = useContext(Context);
    const { isAdmin, setIsAdmin } = useContext(Context);
    const { nameUser, setNameUser } = useContext(Context);
    const { currentPage, setCurrentPage } = useContext(Context);
    const apiUrl = useContext(Context).apiUrl;
  
    const formAddProductOverlay = useRef(null);
    const header = useRef(null);
    const contentContainer = useRef(null);

    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState(null);
    const [userOrders, setUserOrders] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    let getProducts = async () => {

      try {

        const res = await fetch(apiUrl+'/product/get');
        if(!res.ok) {
          console.error('Res not ok!');
        }
        const data = await res.json();
        if(data.status == 200) {
            setProducts(data);
            setIsLoading(false);
          return;
        }
        setIsLoading(false);
        console.log(data.message);

      } catch (error) {
        console.error('Error Fetching Data:', error);
      }
    }

    let getUserOrders = async () => {

      try {

        const res = await fetch(apiUrl+'/order/get/'+Cookies.get('username'));
        if(!res.ok) {
          console.error('Res not ok!');
        }
        const data = await res.json();
        if(data.status == 200) {
            setUserOrders(data);
            setIsLoading(false);
          return;
        }
        setIsLoading(false);
        console.log(data.message);

      } catch (error) {
        console.error('Error Fetching Data:', error);
      }
    }
    
    let getOrders = async () => {

      try {

        const res = await fetch(apiUrl+'/order/get');
        if(!res.ok) {
          console.error('Res not ok!');
        }
        const data = await res.json();
        if(data.status == 200) {
            setOrders(data);
            setIsLoading(false);
          return;
        }
        setIsLoading(false);
        console.log(data.message);

      } catch (error) {
        console.error('Error Fetching Data:', error);
      }
    }

    useEffect(() => {
      let headerOffsetHeight = header.current.offsetHeight;
      contentContainer.current.style.height = `calc(100vh - ${headerOffsetHeight}px)`;
      contentContainer.current.style.paddingBottom = headerOffsetHeight+'px';

      if(currentPage == 'product') {
          getProducts();
      } else if(currentPage == 'order') {
          isAdmin ? getOrders() : getUserOrders();
      }
    }, [currentPage])


  if(currentPage == 'product') {
      return (
        <>   
            
            {isAdmin && <AddProductOverlay getProducts={getProducts} ref={formAddProductOverlay} />}
    
            <Header ref={header} />
    
            <div className='flex'>
    
                <SideBar formAddProductOverlay={formAddProductOverlay} />
                <div ref={contentContainer} className='h-screen overflow-hidden w-full p-4'>
    
                  <div className='flex flex-col h-full overflow-scroll'>
                    <div className='p-4 flex-2 relative'>
                        <h1 className='text-xl font-bold mb-4'>Produk:</h1>
                        {
                          isLoading ? 'Loading Produk data...' : products ? <ProductCards getProducts={getProducts} products={products} /> : <div>Tidak ada produk yang tersedia.</div>
                        }
                    </div>
                  </div>
    
                </div>
    
    
    
            </div>
    
            <Footer />
    
        </>
      )

  } 

  if(currentPage == 'order') {

        if(isLogin) {
          // For Users
            if(!isAdmin) {
              return (
                  <>
        
                    <Header ref={header} />
        
                    <div className='flex'>
        
                        <SideBar getUserOrders={getUserOrders} />
                        <div ref={contentContainer} className='h-screen overflow-hidden w-full p-4'>
        
                          <div className='flex flex-col h-full overflow-scroll pb-8'>
                            <div className='p-4 flex-2 relative'>
                                <h1 className='text-xl font-bold mb-4'>Pesanan:</h1>
                                {
                                  isLoading ? 'Memuat pesanan...' : userOrders ? <UserOrderCards statusOrder='ordered' orders={userOrders} getUserOrders={getUserOrders} /> : <div>Tidak ada pesanan.</div>
                                }
                            </div>
                            <div className='p-4 flex-2 relative'>
                                <h1 className='text-xl font-bold mb-4'>Sedang Dikerjakan:</h1>
                                {
                                  isLoading ? 'Memuat pesanan...' : userOrders ? <UserOrderCards statusOrder='onprocess' orders={userOrders} getUserOrders={getUserOrders} /> : <div>Tidak ada pesanan.</div>
                                }
                            </div>
                            <div className='p-4 flex-2 relative'>
                                <h1 className='text-xl font-bold mb-4'>Pesanan Selesai:</h1>
                                {
                                  isLoading ? 'Memuat pesanan...' : userOrders ? <UserOrderCards statusOrder='done' orders={userOrders} getUserOrders={getUserOrders} /> : <div>Tidak ada pesanan.</div>
                                }
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
                  
                  <AddProductOverlay getProducts={getProducts} ref={formAddProductOverlay} />
          
                  <Header ref={header} />
          
                  <div className='flex'>
          
                      <SideBar formAddProductOverlay={formAddProductOverlay} />
                      <div ref={contentContainer} className='h-screen overflow-hidden w-full p-4'>
          
                          <div className='flex flex-col h-full overflow-scroll pb-8'>
                            <div className='p-4 flex-2 relative'>
                                <h1 className='text-xl font-bold mb-4'>Pesanan:</h1>
                                {
                                    isLoading ? 'Memuat pesanan...' : orders ? <OrderCards statusOrder='ordered' orders={orders} getOrders={getOrders} /> : <div>Tidak ada pesanan.</div>
                                }
                            </div>
                            <div className='p-4 flex-2 relative'>
                                <h1 className='text-xl font-bold mb-4'>Sedang Dikerjakan:</h1>
                                {
                                    isLoading ? 'Memuat pesanan...' : orders ? <OrderCards statusOrder='onprocess' orders={orders} getOrders={getOrders} /> : <div>Tidak ada pesanan.</div>
                                }
                            </div>
                            <div className='p-4 flex-2 relative'>
                                <h1 className='text-xl font-bold mb-4'>Pesanan Selesai:</h1>
                                {
                                    isLoading ? 'Memuat pesanan...' : orders ? <OrderCards statusOrder='done' orders={orders} getOrders={getOrders} /> : <div>Tidak ada pesanan.</div>
                                }
                            </div>
                          </div>
          
                        </div>
          
                  </div>
          
                  <Footer />
          
              </>
              
            )
        };

      return (
        <>

          <Header ref={header} />

          <div className='flex'>

              <SideBar />
              <div ref={contentContainer} className='h-screen overflow-hidden w-full p-4'>

                <div className='flex flex-col h-full overflow-scroll pb-8'>
                  <div className='p-4 flex-2 relative'>
                      <h1 className='text-xl font-bold mb-4'>Pesanan:</h1>
                      <p>Tunggu Sebentar...</p>
                  </div>
                </div>

              </div>

          </div>

          <Footer />
        </>
      )

  }

}

export default Home