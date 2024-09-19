import React, { useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
import signImg from '../../assets/imgs/signImg.png'
import Btn from '../../components/btn/Btn'
import { useNavigate } from 'react-router-dom'
import InputField from '../../components/inputField/InputField'
import { postData } from '../../config/apiCalls'
import Loader from '../../components/loader/Loader'
import toast from 'react-hot-toast'

export default function ForgetPassword({ hide }) {
    const navigate = useNavigate();
    let [dataObj, setDataObj] = useState({});
    let [isLoading, setIsLoading] = useState(false)

    const addData = (key, value) => {
        dataObj[key] = value;
        setDataObj({ ...dataObj });
    }


    const handleSubmit = () => {
        console.log(dataObj)

        setIsLoading(true)
        postData('forgotpassword', dataObj).then((response) => {
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
                                Forgot Your Password? No Problem. We're Here to Help You Reset It.
                            </div>
                            <InputField
                                label='Email'
                                placeholder='johndoe@gmail.com'
                                onChange={(e) => addData('email', e.target.value)}
                            />
                            <Btn
                                onClick={handleSubmit}
                                label='Submit'
                                style={{ marginTop: 20, }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </section>
            {hide || <Footer active='Login' />}
            <Loader isLoading={isLoading} />
        </div>
    )
}
