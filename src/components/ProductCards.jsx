import React, { useState, useEffect, useRef, useContext } from 'react'
import ProductDetailOverlay from './ProductDetailOverlay';
import Context from '../Context';
import { useCart } from '../CartContext';

function ProductCards() {

  const { isLogin, setIsLogin } = useContext(Context);
  const { isAdmin, setIsAdmin } = useContext(Context);

    const { addToCart } = useCart();

    const formEditProductOverlay = useRef(null);
    const productDetailOverlay = useRef(null);


    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    const [idProduct, setIdProduct] = useState(null);
    const [nameProduct, setNameProduct] = useState(null);
    const [priceProduct, setPriceProduct] = useState(null);
    const [stockProduct, setStockProduct] = useState(null);
    const [imageProduct, setImageProduct] = useState(null);

    useEffect(() => {

        const fetchProducts = async () => { // Use async/await for cleaner code
            try {
              const res = await fetch(import.meta.env.VITE_API_URL+'/getproducts');
              if (!res.ok) { // Check for HTTP errors
                  throw new Error(`HTTP error! Status: ${res.status}`);
              }
              const data = await res.json();
              setProducts(data);
            } catch (error) {
              console.error('Fetch error:', error);
              setError(error.message); // Set error state
            } finally {
              setLoading(false); // Set loading to false after fetch attempt
            }
          };
      
          fetchProducts();

    },[]);

    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    if(!isLogin) {
      return (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 items-start'>
              {
                  products.map((product) => {
                      return (
                        <div className='text-start cursor-pointer hover:shadow-2xl transition duration-500'>
                          <div className='rounded-lg shadow-xl border-1 border-gray-200 p-3'>
                              <img className='w-full aspect-video' src={product.image_product} alt="" />
                              <h2 className='text-lg font-bold mb-1'>{product.name_product}</h2>
                              <p>Harga: Rp. {product.price_product}</p>
                              <p className='text-xs text-left'>Stocks: {product.stock_product} Kg</p>
                          </div>
                        </div>
                      )
                  })
              }
          </div>
        </>
      )
    }
  
    if(!isAdmin) {

        return (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 items-start'>
                {
                    products.map((product) => {
                        return (
                          <button type='button' className='text-start cursor-pointer hover:shadow-2xl transition duration-500' onClick={() => addToCart(product)}>
                            <div className='rounded-lg shadow-xl border-1 border-gray-200 p-3'>
                                <img className='w-full aspect-video' src={product.image_product} alt="" />
                                <h2 className='text-lg font-bold mb-1'>{product.name_product}</h2>
                                <p>Harga: Rp. {product.price_product}</p>
                                <p className='text-xs text-left'>Stocks: {product.stock_product} Kg</p>
                            </div>
                          </button>
                        )
                    })
                }
            </div>
          </>
        )
    }
    
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full items-start gap-4'>
        {
            products.map((product) => {
                return (
                  <>
                  <button type='button' className='text-start cursor-pointer hover:shadow-2xl transition duration-500' onClick={() => 
                  {
                    formEditProductOverlay.current.classList.replace('hidden', 'flex');

                    setIdProduct(product.id_product);
                    setNameProduct(product.name_product);
                    setPriceProduct(product.price_product);
                    setStockProduct(product.stock_product);
                    setImageProduct(product.image_product);
                    
                  }}>
                    <div className='rounded-lg shadow-xl border-1 border-gray-200 p-3'>
                        <img className='aspect-video w-full' src={product.image_product} alt="" />
                        <h2 className='text-lg font-bold mb-1'>{product.name_product}</h2>
                        <p>Harga: Rp. {product.price_product}</p>
                        <p className='text-xs text-left'>Stocks: {product.stock_product} Kg</p>
                    </div>
                  </button>

                  <ProductDetailOverlay product={{'idProduct': idProduct, 'nameProduct': nameProduct, 'priceProduct': priceProduct, 'stockProduct': stockProduct, 'imageProduct': imageProduct}} ref={formEditProductOverlay} />
                  </>
                )
            })
        }
    </div>


    </>
  )
}

export default ProductCards