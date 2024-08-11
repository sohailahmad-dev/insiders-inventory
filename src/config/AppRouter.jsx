import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import { Buyers } from '../pages/buyers/Buyers';
import { AddProperty } from '../pages/addProperty/AddProperty';






export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/AddProperty' element={<AddProperty />}></Route>
                    <Route path='/Buyers' element={<Buyers />}></Route>
                    <Route path='/Login' element={<Login />}></Route>
                    <Route path='/Signup' element={<Signup />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}