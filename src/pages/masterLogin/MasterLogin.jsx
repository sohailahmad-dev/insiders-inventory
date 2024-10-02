import React, { useState } from 'react'
import './MasterLogin.css'
import logo from '../../assets/imgs/logo.png'
import ReplyIcon from '@mui/icons-material/Reply';
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'
import { useNavigate } from 'react-router-dom'
import CheckBox from '../../components/checkBox1/CheckBox'
import toast from 'react-hot-toast'
import Loader from '../../components/loader/Loader';
import { postData } from '../../config/apiCalls';


export default function MasterLogin() {
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
                navigate('/AdminPanel')
            }, 1000)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })

    }
    return (
        <div className=' mLogin padding' >
            <div className='mLogin-box'>
                <div className='text-center'>
                    <img src={logo} alt="logo" className='mLogin-logo' />
                    <div className="logo-mLogin">
                        Insider's <span>Inventory</span>
                    </div>
                </div>
                <div className="sign-heading text-center mb-20" style={{ color: 'white' }}>Administrative Login</div>
                <InputField
                    label='Email'
                    placeholder='john@gmail.com'
                    onChange={(e) => addData('email', e.target.value)}
                    labelStyle={{ color: '#EFF0F2' }}
                />
                <InputField
                    label='Password'
                    onChange={(e) => addData('password', e.target.value)}
                    placeholder='Enter your password'
                    inputType='password'
                    labelStyle={{ color: '#EFF0F2' }}
                />
                <div className='sign-bottom' >
                    <CheckBox
                        label='Remember Me'
                        sx={{
                            color: '#EFF0F2',
                            '&.Mui-checked': {
                                color: '#EFF0F2',
                            },
                        }}
                        onChange={(e) => addData('rememberMe', e.target.checked)}
                        labelColor={'#EFF0F2'}

                    />
                    <div
                        onClick={() => navigate("/ForgetPassword")}
                    >Forgot Password?</div>
                </div>
                <div className='text-center'>
                    <Btn
                        onClick={handleLogin}
                        label='Sign In'
                    />

                </div>
                <div className='sign-bottom-text' style={{ color: 'white' }}>
                    <span
                        onClick={() => navigate('/')}
                    >
                        <ReplyIcon />
                    </span>
                    Back to Insider's Inventory

                </div>

            </div>
            <Loader isLoading={isLoading} />
        </div>
    )
}
