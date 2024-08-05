import React, { useEffect, useState } from 'react'
import './Footer.css'
import building from '../../assets/imgs/building.png'
import logo from '../../assets/imgs/logo.png'
import instagram from '../../assets/imgs/instagram.png'
import facebook from '../../assets/imgs/facebook.png'
import linkedin from '../../assets/imgs/linkedin.png'
import twitter from '../../assets/imgs/twitter.png'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useIsMobile from '../../hooks/UseIsMobile'
import InputField from '../inputField/InputField'
import FooterInput from '../footerInput/FooterInput'
import Btn from '../btn/Btn'

const socials = [
    {
        icon: facebook,
        to: '/'
    },
    {
        icon: twitter,
        to: ''
    },
    {
        icon: linkedin,
        to: ''
    },
    {
        icon: instagram,
        to: ''
    }
]

export default function Footer({ active }) {
    let [activeLink, setActiveLink] = useState('Home');
    let isMobile = useIsMobile();
    const navigate = useNavigate();

    useEffect(() => {
        if (active) {
            setActiveLink(active)
        }
    }, [])
    return (
        <div className='footer'>
            <div className="footer-upper">
                <img src={building} className='building' />
                <Grid container spacing={1}>
                    <Grid item sm={4.5} xs={12}></Grid>
                    <Grid item sm={7.5} xs={12}>
                        <div className="footer-upper-right">
                            <div className="footer-heading">Signup for the Latest Deals</div>
                            <div className="footer-upper-text">By joining our mailing list, you'll receive the latest updates and opportunities in investment properties directly to your inbox.</div>
                            <Grid container spacing={1}>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='First Name'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='Last Name'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='Email'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='Phone Number'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className='text-center'>
                                        <Btn
                                            label='Sign up for the Latest Deals'
                                        ></Btn>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className=" padding footer-lower">
                <Grid container spacing={5}>
                    <Grid item sm={6} xs={12}>
                        <img src={logo} alt="logo" className='footer-logo' />
                        <div className="logo-nb">
                            Insider's <span>Inventory</span>
                        </div>
                        <div className="footer-text">Your Gateway to Real Estate Excellence. </div>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <div className='footerLinks'>

                            <div
                                className={activeLink == 'Home' ? "link-nb" : "link-nb1"}
                                onClick={() => {
                                    navigate('/')
                                }
                                }
                            >Home</div>

                            <div
                                className={activeLink === 'Buyers' ? "link-nb" : "link-nb1"}
                                onClick={() => {
                                    navigate('/')
                                }
                                }
                            >Buyers</div>

                            <div
                                className={activeLink === 'Sellers' ? "link-nb" : "link-nb1"}
                                onClick={() => {
                                    navigate('/')
                                }
                                }
                            >Sellers</div>

                            <div
                                className={activeLink === 'Buy & Hold' ? "link-nb" : "link-nb1"}
                                onClick={() => {
                                    navigate('/')
                                }
                                }
                            >Buy & Hold</div>

                            <div
                                className={activeLink === 'Retail' ? "link-nb" : "link-nb1"}
                                onClick={() => {
                                    navigate('/')
                                }
                                }
                            >Retail</div>

                            <div
                                className={activeLink === 'Flip Opportunities' ? "link-nb" : "link-nb1"}
                                onClick={() => {
                                    navigate('/')
                                }
                                }
                            >Flip Opportunities</div>

                            <div
                                className={activeLink === 'Off-Market Inventory' ? "link-nb" : "link-nb1"}
                                onClick={() => {
                                    navigate('/')
                                }
                                }
                            >Off-Market Inventory</div>
                        </div>
                        <div className="footer-social">
                            {socials.map(e => (
                                <img src={e?.icon} alt='icon' />
                            ))}
                        </div>
                    </Grid>
                </Grid>

                <div className="footer-line"></div>
                <div className="footer-text text-center">Copyright Insider’s Inventory 2024 . All rights reserved.</div>
            </div>
        </div>
    )
}
