import React, { forwardRef, useContext } from 'react'
import SideBar from '../components/SideBar'
import Context from '../Context'

const Header = forwardRef((props, header) => {

  const {openSideBar, setOpenSideBar} = useContext(Context);

  return (
    <>  
        <header ref={header} className='text-white bg-gray-800 '>
            <div className='flex items-center'>
                <button onClick={() => {openSideBar ? setOpenSideBar(false) : setOpenSideBar(true)}} className='pl-4 cursor-pointer'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7.125L4 7.125C3.37868 7.125 2.875 6.62132 2.875 6C2.875 5.37868 3.37868 4.875 4 4.875L20 4.875C20.6213 4.875 21.125 5.37868 21.125 6C21.125 6.62132 20.6213 7.125 20 7.125ZM20 13.125L4 13.125C3.37868 13.125 2.875 12.6213 2.875 12C2.875 11.3787 3.37868 10.875 4 10.875L20 10.875C20.6213 10.875 21.125 11.3787 21.125 12C21.125 12.6213 20.6213 13.125 20 13.125ZM20 19.125L4 19.125C3.37868 19.125 2.875 18.6213 2.875 18C2.875 17.3787 3.37868 16.875 4 16.875L20 16.875C20.6213 16.875 21.125 17.3787 21.125 18C21.125 18.6213 20.6213 19.125 20 19.125Z" fill="#fff"/>
                  </svg>
                </button>
                <h1 className='italic font-bold p-4 text-2xl'>WarungApp.</h1>
            </div>
        </header>
    </>
  )
});

export default Header