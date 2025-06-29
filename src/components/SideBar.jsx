import React from 'react'
import AdminLayout from './sidebar_components/AdminLayout'
import UserLayout from './sidebar_components/UserLayout'
import Context from '../Context'
import { useContext, useEffect } from 'react'
import GuestLayout from './sidebar_components/GuestLayout'

function SideBar(props) {

    const { nameUser, setNameUser } = useContext(Context);
    const { isAdmin, setIsAdmin } = useContext(Context);
    const { isLogin, setIsLogin } = useContext(Context);

    if(!isLogin) {
        return(
            <GuestLayout />
        )
    }
    if(isAdmin) {
        return (
            <AdminLayout username={nameUser} formAddProductOverlay={props.formAddProductOverlay} /> 
        )
    }
    return (
        <UserLayout username={nameUser} />
    )
}

export default SideBar