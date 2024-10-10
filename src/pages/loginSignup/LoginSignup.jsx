import React from 'react'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
import signImg from '../../assets/imgs/signImg.png'
import Btn from '../../components/btn/Btn'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LoginSignup({ hide }) {
    const navigate = useNavigate();
    const location = useLocation();


    return (
        <div>
            {hide || <NavBar active='Login' />}
            <section className="padding">
                <Grid container spacing={5}>
                    <Grid item sm={4.5} xs={12}>
                        <div className="text-center sign-left">
                            <img src={signImg} alt="img" className='signImg' />
                        </div>
                    </Grid>
                    <Grid item sm={6.5} xs={12}>
                        <div className='sign-right'>
                            <div
                                onClick={() => navigate('/MasterLogin')}
                                className="sign-heading text-center mb-20"
                            >
                                {location?.state === 'Submit Property' ?
                                    "Login or Sign-Up to Submit an Off-Market Property"
                                    :
                                    "Login or Sign-Up to view available Off-Market Inventory"}

                            </div>

                            <div className='text-center'>
                                <div className="h-btns">
                                    <Btn
                                        onClick={() => navigate('/Login')}
                                        label='Login'

                                    />
                                    <Btn
                                        onClick={() => navigate('/Signup')}
                                        label='Sign-Up'
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#4DAD49'
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </section>
            {hide || <Footer active='Login' />}
        </div>
    )
}
