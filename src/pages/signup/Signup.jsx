import React, { useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Checkbox, FormControlLabel, Grid } from '@mui/material'
import signImg from '../../assets/imgs/signImg.png'
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'
import { useNavigate } from 'react-router-dom'
import CheckBox from '../../components/checkBox1/CheckBox'

export default function Signup() {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar active='Signup' />
            <section className="padding">
                <Grid container spacing={5}>
                    <Grid item sm={5.5} xs={12}>
                        <div className="text-center sign-left">
                            <img src={signImg} alt="img" className='signImg' />
                        </div>

                    </Grid>
                    <Grid item sm={6.5} xs={12}>
                        <div className='sign-right'>

                            <div className="sign-heading text-center mb-20">Sign-up to view available inventory  <br className="desktop" /> or to list a property</div>
                            <InputField
                                label='First Name'
                                placeholder='John'
                            />
                            <InputField
                                label='Last Name'
                                placeholder='Doe'
                            />
                            <InputField
                                label='Company Name (optional)'
                                placeholder='Name of your company'
                            />
                            <InputField
                                label='Email'
                                placeholder='Enter your email'
                            />
                            {/* checbox  */}
                            <div style={{ display: 'flex' }}>
                                <CheckBox
                                    label='Investor'
                                />
                                <CheckBox
                                    label='Home Buyer'
                                />
                            </div>
                            <div style={{ display: 'flex' }}>

                                <CheckBox
                                    label='Agent'
                                />
                                <CheckBox
                                    label='Fund/REIT Investment Buyer'
                                />
                            </div>
                            <InputField
                                label='Phone Number'
                                placeholder='Enter your phone number '
                            />
                            <InputField
                                label='Password'
                                placeholder='Enter password'
                            />

                            <div className='sign-bottom' >
                                <div className='check-box'>
                                    <FormControlLabel
                                        control={<Checkbox
                                            size='sm'
                                            color='success'
                                            onChange={() => { }}
                                        />}
                                        sx={{
                                            marginRight: 0
                                        }}
                                    />
                                    <span style={{ color: '#4D5959', marginRight: 5 }}>I confirmed that I have read and accepted the
                                    </span>
                                    <div> Privacy Policy</div>

                                </div>
                            </div>
                            <div className='text-center'>
                                <Btn
                                    label='Sign Up'
                                />

                            </div>
                            <div className='sign-bottom-text'>Already have an account? <span
                                onClick={() => navigate('/Login')}
                            > Login</span></div>

                        </div>
                    </Grid>
                </Grid>
            </section>
            <Footer active='Signup' />
        </div>
    )
}
