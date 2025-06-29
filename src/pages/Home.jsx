import Footer from '../templates/Footer'
import '../index.css'
import Header from '../templates/Header'
import SideBar from '../components/SideBar'
import ProductCards from '../components/ProductCards'
import Context from '../Context'
import { use, useContext, useEffect, useRef } from 'react'
import AddProductOverlay from '../components/AddProductOverlay'


function Home() {

    const { isLogin, setIsLogin } = useContext(Context);

    // useEffect(() => {
    //   console.log(imageInput.current)
    // })
  
    const formAddProductOverlay = useRef(null);
    const header = useRef(null);
    const contentContainer = useRef(null);

    useEffect(() => {
      let headerOffsetHeight = header.current.offsetHeight;
      contentContainer.current.style.height = `calc(100vh - ${headerOffsetHeight}px)`;
      contentContainer.current.style.paddingBottom = headerOffsetHeight+'px';
    })

  return (
    <>   
        
        <AddProductOverlay ref={formAddProductOverlay} />

        <Header ref={header} />

        <div className='flex'>

            <SideBar formAddProductOverlay={formAddProductOverlay} />
            <div ref={contentContainer} className='h-screen overflow-hidden w-full'>

              <div className='flex flex-col h-full overflow-scroll'>
                <div className='p-4 flex-2 relative'>
                    <h1 className='text-xl font-bold mb-4'>Produk:</h1>
                    <ProductCards />
                </div>
              </div>

            </div>



        </div>

        <Footer />

    </>
  )
}

export default Home