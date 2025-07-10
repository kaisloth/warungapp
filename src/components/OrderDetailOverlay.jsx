import React, {useEffect, useRef, forwardRef, useContext, useState} from 'react'
import Context from '../Context'

const OrderDetailOverlay = forwardRef((props, orderDetailOverlay) => {

    let formatIdr = amount => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(amount);
    }

    const { isLogin, setIsLogin } = useContext(Context);
    const { isAdmin, setIsAdmin } = useContext(Context);
    const apiUrl = useContext(Context).apiUrl;

    const [nameProduct, setNameProduct] = useState([[]]);
    const [priceProduct, setPriceProduct] = useState([[]]);
    const [quantityProduct, setQuantityProduct] = useState([[]]);

    const [isLoading, setIsLoading] = useState(false);
    const btnToProcess = useRef(null);
    const btnToDone = useRef(null);
    const btnReject = useRef(null);

    let toProcess = () => {
        setIsLoading(true);
        fetch(apiUrl+'/order/process/'+props.orderedProducts.id_order)
        .then(res => {res.ok ? res.json() : console.log('res not ok');})
        .then(data => {setIsLoading(false);props.getOrders()})
    };
    let toDone = () => {
        setIsLoading(true);
        fetch(apiUrl+'/order/done/'+props.orderedProducts.id_order)
        .then(res => {res.ok ? res.json() : console.log('res not ok');})
        .then(data => {setIsLoading(false);props.getOrders()})
    };
    let reject = () => {
        setIsLoading(true);
        fetch(apiUrl+'/order/delete/'+props.orderedProducts.id_order)
        .then(res => {res.ok ? res.json() : console.log('res not ok');})
        .then(data => {setIsLoading(false);props.getOrders()})
    };
    
    useEffect(() => {
        if(props.orderedProducts[0] != "") {
            setNameProduct(props.orderedProducts.name_product.split(','));
            setPriceProduct(props.orderedProducts.price_product.split(','));
            setQuantityProduct(props.orderedProducts.quantity_product.split(','));
        }

        console.log(orderDetailOverlay.current)

    }, [props.orderedProducts])

    if(props.changeStatus == 'toprocess') {

        if(isLoading) {
            return (
                <>
                    <div>Tunggu Sebentar...</div>
                </>
            )
        }

        return (
            <div ref={orderDetailOverlay} className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,.5)] hidden flex-col items-center pt-32 z-50'>
                <div className='bg-white border border-gray-200 w-80 h-fit px-8 pb-8 pt-4 rounded-lg flex flex-col'>
                    <button className='self-end cursor-pointer translate-x-4' type='button' onClick={() => {orderDetailOverlay.current.classList.replace('flex', 'hidden')}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.9545 5.95548C6.39384 5.51614 7.10616 5.51614 7.5455 5.95548L11.999 10.409L16.4524 5.95561C16.8918 5.51627 17.6041 5.51627 18.0434 5.95561C18.4827 6.39495 18.4827 7.10726 18.0434 7.5466L13.59 12L18.0434 16.4534C18.4827 16.8927 18.4827 17.605 18.0434 18.0444C17.6041 18.4837 16.8918 18.4837 16.4524 18.0444L11.999 13.591L7.5455 18.0445C7.10616 18.4839 6.39384 18.4839 5.9545 18.0445C5.51517 17.6052 5.51516 16.8929 5.9545 16.4535L10.408 12L5.9545 7.54647C5.51516 7.10713 5.51517 6.39482 5.9545 5.95548Z" fill="#323544"/>
                        </svg>
                    </button>
                    <h2 className='text-center text-2xl font-extrabold text-slate-900 select-none mb-6'>Detail Pesanan</h2>
                    <div className="flex flex-col mb-2">
                        <p>{props.nameUser}</p>
                        <p className='text-sm text-gray-500'>{props.orderDate}</p>
                    </div>

                    <hr />

                    <div className="flex flex-col my-2 list-none w-full">
                        {
                            nameProduct.map((itemName, i) => {
                                
                                return ( 

                                    <div className='flex gap-2'>
                                        <p className='flex-1'>{itemName}</p>
                                        <p className='flex-2 text-center'>{'x'+quantityProduct[i]}</p>
                                        <p className='flex-1 text-end'>{formatIdr(priceProduct[i])}</p>   
                                    </div>
                                )

                            })
                        }
                        
                    </div>

                    <hr />

                    <div className="flex my-2 justify-between list-none">
                    <p>Total Harga:</p>
                    <p>{formatIdr(props.orderedProducts.total_price)}</p>
                    </div>

                    <div className='mt-6 flex gap-2'>

                        <button ref={btnToProcess} type='button' onClick={toProcess} className='border rounded-sm py-1 w-full cursor-pointer bg-green-500 hover:bg-green-700 text-white'>Terima</button>
                        <button ref={btnReject}  type='button' onClick={reject} className='border rounded-sm py-1 w-full cursor-pointer bg-red-500 hover:bg-red-700 text-white'>Tolak</button>

                    </div>

                </div>
            </div>
        )
    } else if (props.changeStatus == 'todone') {

        if(isLoading) {
            return (
                <>
                    <div>Tunggu Sebentar...</div>
                </>
            )
        }

        return (
            <div ref={orderDetailOverlay} className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,.5)] hidden flex-col items-center pt-32 z-50'>
                <div className='bg-white border border-gray-200 w-80 h-fit px-8 pb-8 pt-4 rounded-lg flex flex-col'>
                    <button className='self-end cursor-pointer translate-x-4' type='button' onClick={() => {orderDetailOverlay.current.classList.replace('flex', 'hidden')}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.9545 5.95548C6.39384 5.51614 7.10616 5.51614 7.5455 5.95548L11.999 10.409L16.4524 5.95561C16.8918 5.51627 17.6041 5.51627 18.0434 5.95561C18.4827 6.39495 18.4827 7.10726 18.0434 7.5466L13.59 12L18.0434 16.4534C18.4827 16.8927 18.4827 17.605 18.0434 18.0444C17.6041 18.4837 16.8918 18.4837 16.4524 18.0444L11.999 13.591L7.5455 18.0445C7.10616 18.4839 6.39384 18.4839 5.9545 18.0445C5.51517 17.6052 5.51516 16.8929 5.9545 16.4535L10.408 12L5.9545 7.54647C5.51516 7.10713 5.51517 6.39482 5.9545 5.95548Z" fill="#323544"/>
                        </svg>
                    </button>
                    <h2 className='text-center text-2xl font-extrabold text-slate-900 select-none mb-6'>Detail Pesanan</h2>
                    <div className="flex flex-col mb-2">
                        <p>{props.nameUser}</p>
                        <p className='text-sm text-gray-500'>{props.orderDate}</p>
                    </div>

                    <hr />

                    <div className="flex flex-col my-2 list-none w-full">
                        {
                            nameProduct.map((itemName, i) => {
                                
                                return ( 

                                    <div className='flex gap-2'>
                                        <p className='flex-1'>{itemName}</p>
                                        <p className='flex-2 text-center'>{'x'+quantityProduct[i]}</p>
                                        <p className='flex-1 text-end'>{formatIdr(priceProduct[i])}</p>   
                                    </div>
                                )

                            })
                        }
                        
                    </div>

                    <hr />

                    <div className="flex my-2 justify-between list-none">
                    <p>Total Harga:</p>
                    <p>{formatIdr(props.orderedProducts.total_price)}</p>
                    </div>

                    <div className='mt-6 flex gap-2'>

                        <button ref={btnToDone} type='button' onClick={toDone} className='border rounded-sm py-1 w-full cursor-pointer bg-green-500 hover:bg-green-700 text-white'>Selesaikan</button>
                        <button ref={btnReject} type='button' onClick={reject} className='border rounded-sm py-1 w-full cursor-pointer bg-red-500 hover:bg-red-700 text-white'>Hapus</button>

                    </div>

                </div>
            </div>
        )
    }


});

export default OrderDetailOverlay
