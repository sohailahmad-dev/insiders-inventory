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
import Loader from '../../components/loader/Loader'
import { postData } from '../../config/apiCalls'
import toast from 'react-hot-toast'

export default function Login({ hide }) {
    const navigate = useNavigate();
    let [dataObj, setDataObj] = useState({});
    let [isLoading, setIsLoading] = useState(false)

    const addData = (key, value) => {
        dataObj[key] = value;
        setDataObj({ ...dataObj });
    }


    function handleLogin() {
        setIsLoading(true)

        postData('login', dataObj).then((response) => {
            toast.success(response.message)
            setIsLoading(false)
            localStorage.setItem('user', JSON.stringify(response.user))

            setTimeout(() => {
                navigate('/UserPanel')
            }, 1000)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })

    }

    return (
        <div>
            {hide || <NavBar active='Login' />}
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
                                className="sign-heading text-center mb-20"
                            >
                                Login to browse inventory, submit an off- market property, or make an offer today!
                            </div>
                            <InputField
                                label='Email'
                                placeholder='johndoe@gmail.com'
                                onChange={(e) => addData('email', e.target.value)}
                            />
                            <InputField
                                label='Password'
                                placeholder='Enter your password'
                                onChange={(e) => addData('password', e.target.value)}

                            />
                            <div className='sign-bottom' >
                                <CheckBox
                                    label='Remember Me'
                                    onChange={(e) => addData('rememberMe', e.target.checked)}
                                />
                                <div
                                    onClick={() => navigate("/ForgetPassword")}
                                >Forgot Password?</div>
                            </div>
                            <div className='text-center'>
                                <Btn
                                    label='Member Login'
                                    onClick={handleLogin}
                                />

                            </div>
                            <div className='sign-bottom-text'>Not a Member?
                                <span
                                    onClick={() => navigate('/Signup')}
                                > Sign-Up</span>
                            </div>

                        </div>
                    </Grid>
                </Grid>

            </section>
            {hide || <Footer active='Login' />}
            <Loader isLoading={isLoading} />
        </div>
    )
}
