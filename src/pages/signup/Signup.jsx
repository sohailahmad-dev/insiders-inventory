import React, { useState } from 'react'
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

export default function Signup() {
    const navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false);
    let [dataObj, setDataObj] = useState({});

    const addData = (key, value) => {
        dataObj[key] = value;
        setDataObj({ ...dataObj });
    }

    // Roles handling
    const roles = ['Investor', 'Home Buyer', 'Agent', 'Fund/REIT Investment Buyer'];
    const [selectedRole, setSelectedRole] = useState('');

    const handleChange = (role, checked) => {
        if (checked) {
            setSelectedRole(role);
            addData('role', role);
        }

    };


    const handleSubmit = () => {
        console.log(dataObj)

        setIsLoading(true)
        postData('register', dataObj).then((response) => {
            toast.success(response.message)
            setIsLoading(false)
            setTimeout(() => {
                navigate('/Login')
            }, 1000)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })

    }

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

                            <div className="sign-heading text-center mb-20">Become a Member or Sign-In to view Available Properties</div>
                            <InputField
                                label='First Name'
                                placeholder='John'
                                onChange={(e) => addData('firstName', e.target.value)}

                            />
                            <InputField
                                label='Last Name'
                                placeholder='Doe'
                                onChange={(e) => addData('lastName', e.target.value)}
                            />
                            <InputField
                                label='Company Name (optional)'
                                placeholder='Name of your company'
                                onChange={(e) => addData('companyName', e.target.value)}
                            />
                            <InputField
                                label='Email'
                                placeholder='Enter your email'
                                onChange={(e) => addData('email', e.target.value)}
                            />
                            {/* checbox  */}
                            <div style={{ flexWrap: 'wrap', display: 'flex' }}>
                                {roles.map((role) => (
                                    <CheckBox
                                        key={role}
                                        label={role}
                                        style={{ width: '50%' }}
                                        checked={selectedRole === role}
                                        onChange={(e) => handleChange(role, e.target.checked)}
                                    />
                                ))}
                            </div>
                            <InputField
                                label='Phone Number'
                                placeholder='Enter your phone number '
                                onChange={(e) => addData('phoneNumber', e.target.value)}
                            />
                            <InputField
                                label='Password'
                                placeholder='Enter password'
                                onChange={(e) => addData('password', e.target.value)}
                            />
                            <InputField
                                label='Confirm Password'
                                placeholder='Confirm password'
                                onChange={(e) => addData('confirmPassword', e.target.value)}
                            />

                            <div className='sign-bottom' >
                                <div className='check-box'>
                                    <FormControlLabel
                                        control={<Checkbox
                                            size='sm'
                                            color='success'
                                            onChange={(e) => addData('privacyPolicyAccepted', e.target.checked)}

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
                                    onClick={handleSubmit}
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
            <Loader isLoading={isLoading} />
        </div>
    )
}
