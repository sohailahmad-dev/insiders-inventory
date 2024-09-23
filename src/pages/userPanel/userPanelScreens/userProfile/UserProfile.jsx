import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import InputField from '../../../../components/inputField/InputField'
import CheckBox from '../../../../components/checkBox1/CheckBox'
import Btn from '../../../../components/btn/Btn'
import useAuthCheck from '../../../../hooks/UseAuthCheck'
import Loader from '../../../../components/loader/Loader'
import toast from 'react-hot-toast'
import { putData } from '../../../../config/apiCalls'


export default function UserProfile() {
    let [isLoading, setIsLoading] = useState(false);
    let [dataObj, setDataObj] = useState({});
    useAuthCheck();

    const addData = (key, val) => {
        dataObj[key] = val
        setDataObj({ ...dataObj })
    }

    const handleSubmit = () => {
        setIsLoading(true)
        putData('user/update', dataObj).then((response) => {
            toast.success(response.message)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setDataObj(user);
            console.log(user)
        }
    }, [])

    return (
        <div>
            {/* <div className="user-p-subHeading">Welcome</div>
            <div className="heading3 mb-20">Dashboard - Profile Page</div>
            <Grid container spacing={3}>
                <Grid item sm={3} xs={12}>
                    <div className="user-p-stats-item">
                        <div className="user-p-stats-figures">10</div>
                        <div className="user-p-stats-label-box">
                            <div className="user-p-stats-label">Total Listings</div>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <div className="user-p-stats-item">
                        <div className="user-p-stats-figures">5</div>
                        <div className="user-p-stats-label-box">
                            <div className="user-p-stats-circle"
                                style={{ background: 'green' }}
                            />
                            <div className="user-p-stats-label">Active</div>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <div className="user-p-stats-item">
                        <div className="user-p-stats-figures">3</div>
                        <div className="user-p-stats-label-box">
                            <div className="user-p-stats-circle"
                                style={{ background: '#FFCB11' }}

                            />
                            <div className="user-p-stats-label">Pending</div>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <div className="user-p-stats-item">
                        <div className="user-p-stats-figures">2</div>
                        <div className="user-p-stats-label-box">
                            <div className="user-p-stats-circle"
                                style={{ background: 'red' }}
                            />
                            <div className="user-p-stats-label">Sold</div>
                        </div>
                    </div>
                </Grid>
            </Grid> */}
            <div className="heading3 mt-20 mb-20">Edit Your Information</div>
            <div>
                <Grid container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='First Name'
                            placeholder='John'
                            value={dataObj?.firstName}
                            onChange={e => addData('firstName', e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Last Name'
                            placeholder='Doe'
                            value={dataObj?.lastName}
                            onChange={e => addData('lastName', e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Company Name (optional)'
                            placeholder='Name of your company'
                            value={dataObj?.companyName}
                            onChange={e => addData('companyName', e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Email'
                            placeholder='Enter your email'
                            value={dataObj?.email}
                            onChange={e => addData('email', e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Phone Number'
                            placeholder='Enter your phone number'
                            value={dataObj?.phoneNumber}
                            onChange={e => addData('phoneNumber', e.target.value)}
                        />
                    </Grid>
                    {dataObj.role !== 'Admin' && <Grid item xs={12}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={dataObj?.role}
                                onChange={e => addData('role', e.target.value)}
                            >
                                <FormControlLabel
                                    sx={{ marginRight: 5 }}
                                    value="Investor" control={<Radio color='success' />} label="Investor" />
                                <FormControlLabel
                                    sx={{ marginRight: 5 }}
                                    value="Admin" control={<Radio color='success' />} label="Admin" />
                                <FormControlLabel
                                    sx={{ marginRight: 5 }}
                                    value="Home Buyer" control={<Radio color='success' />} label="Home Buyer" />
                                <FormControlLabel
                                    sx={{ marginRight: 5 }}
                                    value="Agent" control={<Radio color='success' />} label="Agent" />
                                <FormControlLabel
                                    sx={{ marginRight: 5 }}
                                    value="Fund/REIT Investment Buyer" control={<Radio color='success' />} label="Fund/REIT Investment Buyer" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>}
                    <Grid item xs={12}>
                        <Btn
                            label='Update'
                            onClick={handleSubmit}
                        />
                    </Grid>
                </Grid>
            </div>
            <Loader isLoading={isLoading} />
        </div>
    )
}
