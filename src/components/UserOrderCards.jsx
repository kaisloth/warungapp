import React, {useEffect, useState, useRef} from 'react'
import Cookies from 'js-cookie';
import ConfirmOverlay from './ConfirmOverlay';

const UserOrderCards = (props) => {

    let formatIdr = amount => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(amount);
    }
    
    const [fetchOrderStatus, setFetchOrderStatus] = useState(0);
    const [fetchOrderMessage, setFetchOrderMessage] = useState('');
    const [fetchOrderData, setFetchOrderData] = useState(null);

    const confirmOverlay = useRef(null);
    const btnDeleteOrder = useRef(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL+'/order/get/'+Cookies.get('username'))
            .then(res => res.json())
            .then(data => {
                if(!data.status == 200) {
                    setFetchOrderStatus(data.status);
                    setFetchOrderMessage(data.message);
                    return
                }
                setFetchOrderStatus(data.status);
                setFetchOrderMessage(data.message);
                setFetchOrderData(data.order);
                return
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    
    if (fetchOrderStatus === 200 && (!fetchOrderData || fetchOrderData.length === 0)) {
        return (
            <div>
                <p>Tidak ada pesanan.</p>
            </div>
        );
    }

    // You might also want to show a loading state while fetching data
    if (fetchOrderStatus === 0 && fetchOrderData === null) {
        return (
            <div>
                <p>Memuat pesanan...</p>
            </div>
        );
    }

    // If fetchOrderStatus is not 200 (e.g., an error occurred), you could display an error message
    if (fetchOrderStatus !== 200) {
        return (
            <div>
                <p>{fetchOrderMessage || "Tidak ada pesanan."}</p>
            </div>
        );
    }

    const orderedOrders = fetchOrderData.filter(item => item.status_order === 'ordered');
    const onprocessOrders = fetchOrderData.filter(item => item.status_order === 'onprocess');
    const doneOrders = fetchOrderData.filter(item => item.status_order === 'done');

    if(props.statusOrder == 'ordered') {

        if(orderedOrders.length < 1) {
            return (
                <div>
                    <p>Tidak ada pesanan.</p>
                </div>
            )
        }
        return (
          <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4'>

              {
                  orderedOrders.map((order) => {
      
                      let name_product = order.name_product.split(',');
                      let price_product = order.price_product.split(',');
                      let quantity_product = order.quantity_product.split(',');

                      return (

                        <>
                          <div className='text-start'>
                              <div className='rounded-lg shadow-xl border-1 border-gray-200 w-full p-3 cursor-pointer hover:shadow-2xl transition duration-500'>
                                  <div className='flex justify-between'>
                                      <p className='text-sm text-gray-500'>{order.created_at}</p>
                                  </div>
                                  <hr className='border-gray-300 my-2' />
      
                                  <div>
                                      {
                                          name_product.map((product_name, i) => {
                                              return (
                                                  <div className='flex justify-between'>
                                                      <p className='flex-1 text-sm text-gray-500'>{product_name}</p>
                                                      <p className='text-center flex-2 text-sm text-gray-500'>{'x'+quantity_product[i]}</p>
                                                      <p className='flex-1 text-sm text-gray-500 text-end'>{formatIdr(price_product[i])}</p>
                                                  </div>
                                              )
                                          })
                                      }
                                  </div>
      
                                  <hr className='border-gray-300 mt-2'/>
                                  <div className='flex justify-between'>
                                      <p className='text-sm xl:text-lg'>Total Harga:</p>
                                      <p className='text-sm xl:text-lg'>{formatIdr(order.total_price)}</p>
                                  </div>
                                  <button onClick={() => {
                                    let apiUrl = import.meta.env.VITE_API_URL;
                                    let orderId = order.id_order;
                                    btnDeleteOrder.current.setAttribute('href', `${apiUrl}/order/delete/${orderId}`)
                                    confirmOverlay.current.classList.replace('hidden', 'flex')
                                    
                                    }} className='bg-red-500 block text-center hover:bg-red-400 mt-4 rounded-sm p-1 cursor-pointer text-white w-full'>Batalkan Pesanan!</button>
                              </div>
                          </div>

                          <ConfirmOverlay text={"Apakah anda yakin ingin membatalkan pesanan ini?"} ref={{'confirmOverlay': confirmOverlay, 'btnDeleteOrder': btnDeleteOrder}} />
                        </>
                      )
                  })
              }
          </div>

      
          </>
        )
                    

    } else if (props.statusOrder == 'onprocess') {

        if(onprocessOrders.length < 1) {
            return (
                <div>
                    <p>Tidak ada pesanan.</p>
                </div>
            )
        }

        return (
            <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4'>
                {
                    onprocessOrders.map((order) => {
        
                        let name_product = order.name_product.split(',');
                        let price_product = order.price_product.split(',');
                        let quantity_product = order.quantity_product.split(',');
        
                        console.log(price_product)
        
                        return (
                            <div className='text-start'>
                                <div className='rounded-lg shadow-xl border-1 border-gray-200 w-full p-3 cursor-pointer hover:shadow-2xl transition duration-500'>
                                    <div className='flex justify-between'>
                                        <p className='text-sm text-gray-500'>{order.created_at}</p>
                                    </div>
                                    <hr className='border-gray-300 my-2' />
        
                                    <div>
                                        {
                                            name_product.map((product_name, i) => {
                                                return (
                                                    <div className='flex justify-between'>
                                                        <p className='flex-1 text-sm text-gray-500'>{product_name}</p>
                                                        <p className='text-center flex-2 text-sm text-gray-500'>{'x'+quantity_product[i]}</p>
                                                        <p className='flex-1 text-sm text-gray-500 text-end'>{formatIdr(price_product[i])}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
        
                                    <hr className='border-gray-300 mt-2'/>
                                    <div className='flex justify-between'>
                                        <p className='text-sm xl:text-lg'>Total Harga:</p>
                                        <p className='text-sm xl:text-lg'>{formatIdr(order.total_price)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        
            </>
          )

    } else if (props.statusOrder == 'done') {

        if(doneOrders.length < 1) {
            return (
                <div>
                    <p>Tidak ada pesanan.</p>
                </div>
            )
        }

        return (
            <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4'>
                {
                    doneOrders.map((order) => {
        
                        let name_product = order.name_product.split(',');
                        let price_product = order.price_product.split(',');
                        let quantity_product = order.quantity_product.split(',');
        
                        console.log(price_product)
        
                        return (
                            <div className='text-start'>
                                <div className='rounded-lg shadow-xl border-1 border-gray-200 w-full p-3 cursor-pointer hover:shadow-2xl transition duration-500'>
                                    <div className='flex justify-between'>
                                        <p className='text-sm text-gray-500'>{order.created_at}</p>
                                    </div>
                                    <hr className='border-gray-300 my-2' />
        
                                    <div>
                                        {
                                            name_product.map((product_name, i) => {
                                                return (
                                                    <div className='flex justify-between'>
                                                        <p className='flex-1 text-sm text-gray-500'>{product_name}</p>
                                                        <p className='text-center flex-2 text-sm text-gray-500'>{'x'+quantity_product[i]}</p>
                                                        <p className='flex-1 text-sm text-gray-500 text-end'>{formatIdr(price_product[i])}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
        
                                    <hr className='border-gray-300 mt-2'/>
                                    <div className='flex justify-between'>
                                        <p className='text-sm xl:text-lg'>Total Harga:</p>
                                        <p className='text-sm xl:text-lg'>{formatIdr(order.total_price)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        
            </>
        )
    }
}

export default UserOrderCards