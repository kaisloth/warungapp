import React, { forwardRef } from 'react'
import SideBar from '../components/SideBar'

const Header = forwardRef((props, header) => {

  return (
    <>  
        <header ref={header} className='text-white bg-gray-800 '>
            <div>
                <h1 className='italic font-bold p-4 text-2xl'>WarungApp.</h1>
            </div>
        </header>
    </>
  )
});

export default Header