import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import { Buyers } from '../pages/buyers/Buyers';
import { AddProperty } from '../pages/addProperty/AddProperty';
import PropertyDetail from '../pages/propertyDetail/PropertyDetail';
import MasterLogin from '../pages/masterLogin/MasterLogin';
import AdminPanel from '../pages/adminPanel/AdminPanel';
import UserPanel from '../pages/userPanel/UserPanel';


export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/AddProperty' element={<AddProperty />}></Route>
                    <Route path='/Buyers' element={<Buyers />}></Route>
                    <Route path='/PropertyDetail' element={<PropertyDetail />}></Route>
                    <Route path='/MasterLogin' element={<MasterLogin />}></Route>
                    <Route path='/Login' element={<Login />}></Route>
                    <Route path='/Signup' element={<Signup />}></Route>
                    <Route path='AdminPanel/*' element={<AdminPanel />}></Route>
                    <Route path='UserPanel/*' element={<UserPanel />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}