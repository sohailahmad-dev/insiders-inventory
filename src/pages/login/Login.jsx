import React, { useState } from 'react'
import './Login.css'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Checkbox, FormControlLabel, Grid } from '@mui/material'
import signImg from '../../assets/imgs/signImg.png'
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'
import { useNavigate } from 'react-router-dom'
import CheckBox from '../../components/checkBox1/CheckBox'

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/UserPanel');
    }
    return (
        <div>
            <NavBar active='Login' />
            <section className="padding">
                <Grid container spacing={5}>
                    <Grid item sm={5.5} xs={12}>
                        <div className="text-center sign-left">
                            <img src={signImg} alt="img" className='signImg' />
                        </div>

                    </Grid>
                    <Grid item sm={6.5} xs={12}>
                        <div className='sign-right'>
                            <div
                                onClick={() => navigate('/MasterLogin')}
                                className="sign-heading text-center mb-20">
                                Log in to Submit an Off-Market <br className="desktop" /> Property
                            </div>
                            <InputField
                                label='Username'
                                placeholder='John Doe'
                            />
                            <InputField
                                label='Password'
                                placeholder='Enter your password'

                            />
                            <div className='sign-bottom' >
                                <CheckBox
                                    label='Remember Me'
                                />
                                <div>Forgot Password?</div>
                            </div>
                            <div className='text-center'>
                                <Btn
                                    label='Sign In'
                                    onClick={handleLogin}
                                />

                            </div>
                            <div className='sign-bottom-text'>Don't have an account?
                                <span
                                    onClick={() => navigate('/Signup')}
                                > Sign up</span>
                            </div>

                        </div>
                    </Grid>
                </Grid>
            </section>
            <Footer active='Login' />
        </div>
    )
}
