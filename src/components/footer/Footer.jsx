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
import Loader from '../loader/Loader'
import { postData } from '../../config/apiCalls'
import toast from 'react-hot-toast'

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

const links1 = [
    {
        label: 'Home',
        to: '/',
    },
    {
        label: 'All Off-Market Inventory',
        to: '/Properties'
    },
    {
        label: 'Submit an Off-Market Property',
        to: '/AddProperty'
    },

]

const links2 = [
    {
        label: 'Buy & Hold',
        to: '/Properties/Buy & Hold'
    },
    {
        label: 'Flip Opportunities',
        to: '/Properties/Flip Opportunities'
    },
    {
        label: 'Retail',
        to: '/Properties/Retail'
    },
    {
        label: 'Owner-Occupant',
        to: '/Properties/Owner-Occupant'
    },
    {
        label: 'Current Renovation',
        to: '/Properties/Current Renovation'
    },
]



export default function Footer({ active, inPanel, hideEmail }) {
    let [activeLink, setActiveLink] = useState('Home');
    let isMobile = useIsMobile();
    const navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false);
    let [dataObj, setDataObj] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const addData = (key, value) => {
        dataObj[key] = value;
        setDataObj({ ...dataObj });
    }

    const handleSubmit = () => {
        const { firstName, lastName, email, phone } = dataObj;
        setIsLoading(true)
        if (firstName && lastName && email && phone) {
            postData('newsletter', dataObj).then((response) => {
                toast.success("Successfully Subscribed")
                setDataObj({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                })
                setIsLoading(false)
            }
            ).catch((err) => {
                toast.error(err.message ?? 'Network Error')
                setIsLoading(false)
            })
        } else {
            toast.error('Required Fields are missing!')
            setIsLoading(false)
        }

    }

    useEffect(() => {
        if (active) {
            setActiveLink(active)
        }
    }, [])
    return (
        <div className='footer'>
            {inPanel && <div className='panel-div' style={{
                background: inPanel ? '#0F2928' : 'white',
            }}></div>}
            <div className="footer-upper">
                <div style={{ height: 10, marginTop: inPanel ? 0 : 40 }} > </div>
                <Grid container spacing={1}>
                    <Grid item sm={1} xs={12}></Grid>
                    <Grid item sm={10} xs={12}>
                        <div className="footer-upper-right">
                            <div className="footer-heading">Signup for the Latest Deals</div>
                            <div className="footer-upper-text">By joining our mailing list, you'll receive the latest updates and opportunities in investment properties directly to your inbox.</div>
                            <Grid container spacing={1}>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='First Name'
                                        value={dataObj?.firstName}
                                        onChange={e => addData("firstName", e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='Last Name'
                                        value={dataObj?.lastName}
                                        onChange={e => addData("lastName", e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='Email'
                                        value={dataObj?.email}
                                        onChange={e => addData("email", e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FooterInput
                                        placeholder='Phone Number'
                                        value={dataObj?.phone}
                                        onChange={e => addData("phone", e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className='text-center'>
                                        <Btn
                                            label='Sign up for the Latest Deals'
                                            onClick={handleSubmit}
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
                    <Grid item sm={4} xs={12}>
                        <img src={logo} alt="logo" className='footer-logo' />
                        <div className="logo-nb">
                            Insider's <span>Inventory</span>
                        </div>
                        <div className="footer-text">Your Gateway to Real Estate Excellence. </div>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <div className='footerLinks'>
                            {links1.map(e => (
                                <div
                                    key={e?.label}
                                    className={activeLink == e?.label ? "link-nb" : "link-nb1"}
                                    onClick={() => {
                                        navigate(e?.to)
                                    }
                                    }
                                >{e?.label}</div>
                            ))}
                        </div>
                        <div className='footerLinks mt-20'>
                            {links2.map(e => (
                                <div
                                    key={e?.label}
                                    className={activeLink == e?.label ? "link-nb" : "link-nb1"}
                                    onClick={() => {
                                        navigate(e?.to)
                                    }
                                    }
                                >{e?.label}</div>
                            ))}
                        </div>


                        {/* <div className="footer-social">
                            {socials.map((e, i) => (
                                <img src={e?.icon} key={i} alt='icon' />
                            ))}
                        </div> */}
                    </Grid>
                </Grid>

                <div className="footer-line"></div>
                <div className="footer-text text-center">Copyright Insider’s Inventory 2024 . All rights reserved.</div>
                <Loader isLoading={isLoading} />
            </div>
        </div >
    )
}
