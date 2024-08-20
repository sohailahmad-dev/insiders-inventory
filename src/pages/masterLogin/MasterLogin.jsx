import React, { useState } from 'react'
import './MasterLogin.css'
import logo from '../../assets/imgs/logo.png'
import ReplyIcon from '@mui/icons-material/Reply';
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'
import { useNavigate } from 'react-router-dom'
import CheckBox from '../../components/checkBox1/CheckBox'

export default function MasterLogin() {
    const navigate = useNavigate();
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
                    label='Username'
                    placeholder='John Doe'
                    labelStyle={{ color: '#EFF0F2' }}
                />
                <InputField
                    label='Password'
                    placeholder='Enter your password'
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
                        labelColor={'#EFF0F2'}

                    />
                    <div>Forgot Password?</div>
                </div>
                <div className='text-center'>
                    <Btn
                        onClick={() => navigate('/AdminPanel')}
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
        </div>
    )
}
