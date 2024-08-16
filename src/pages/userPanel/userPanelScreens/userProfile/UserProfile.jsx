import React from 'react'
import './UserProfile.css'
import { Grid } from '@mui/material'
import InputField from '../../../../components/inputField/InputField'
import CheckBox from '../../../../components/checkBox1/CheckBox'
import Btn from '../../../../components/btn/Btn'


export default function UserProfile() {

    return (
        <div>
            <div className="user-p-subHeading">Welcome</div>
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
            </Grid>
            <div className="heading3 mt-20 mb-20">Edit Your Information</div>
            <div>
                <Grid container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='First Name'
                            placeholder='John'
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Last Name'
                            placeholder='Doe'
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Company Name (optional)'
                            placeholder='Name of your company'
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Email'
                            placeholder='Enter your email'
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Phone Number'
                            placeholder='Enter your phone number'
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <InputField
                            label='Password'
                            placeholder='Enter Password'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <CheckBox
                                label='Investor'
                            />
                            <CheckBox
                                label='Home Buyer'
                                style={{ minWidth: 130 }}

                            />
                            <CheckBox
                                label='Agent'

                            />
                            <CheckBox
                                label='Fund/REIT Investment Buyer'
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Btn
                            label='Update'
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
