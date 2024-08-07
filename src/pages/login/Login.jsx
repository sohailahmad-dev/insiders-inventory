import React, { useState } from 'react'
import './Login.css'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Checkbox, FormControlLabel, Grid } from '@mui/material'
import signImg from '../../assets/imgs/signImg.png'
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'

export default function Login() {
    return (
        <div>
            <NavBar active='Login' />
            <section className="padding">
                <Grid container spacing={5}>
                    <Grid item sm={5.5} xs={12}>
                        <img src={signImg} alt="img" className='signImg' />
                    </Grid>
                    <Grid item sm={6.5} xs={12}>
                        <div className='sign-right'>
                            <div className="sign-heading text-center mb-20">Log in to Submit an Off-Market <br className="desktop" /> Property</div>
                            <InputField
                                label='Username'
                                placeholder='John Doe'
                            />
                            <InputField
                                label='Password'
                                placeholder='Enter your password'
                            />
                            <div className='sign-bottom' >
                                <div className='check-box'>
                                    <FormControlLabel
                                        control={<Checkbox
                                            onChange={() => { }}
                                        />}
                                        sx={{
                                            marginRight: 0
                                        }}
                                    />
                                    <span style={{ color: '#4D5959' }}>Remember Me
                                    </span>
                                </div>
                                <div>Forgot Password?</div>
                            </div>
                            <div className='text-center'>
                                <Btn
                                    label='Sign In'
                                />

                            </div>
                            <div className='sign-bottom-text'>Don't have an account? <span> Sign up</span></div>

                        </div>
                    </Grid>
                </Grid>
            </section>
            <Footer active='Login' />
        </div>
    )
}
