import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';






export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/Login' element={<Login />}></Route>
                    <Route path='/Signup' element={<Signup />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}