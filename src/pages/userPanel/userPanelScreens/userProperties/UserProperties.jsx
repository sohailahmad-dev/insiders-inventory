import React from 'react'
import SelectBox from '../../../../components/selectBox/SelectBox'
import { Grid } from '@mui/material'
import InputField from '../../../../components/inputField/InputField'
import Btn from '../../../../components/btn/Btn'

export default function UserProperties() {
    return (
        <div>
            <div className="heading2 mb-20">My Properties</div>
            <Grid container spacing={1}>
                <Grid item sm={2} xs={6}>
                    <SelectBox
                        label='Sale Status'
                        options={['Pending', 'Sold']}
                    />
                </Grid>
                <Grid item sm={2} xs={6}>
                    <SelectBox
                        label='Type'
                        options={['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential']}
                    />
                </Grid>
                <Grid item sm={2} xs={6}>
                    <SelectBox
                        label='Property Status'
                        options={['Pending', 'Sold']}
                    />
                </Grid>
                <Grid item sm={2} xs={6}>
                    <SelectBox
                        label='Price'
                        options={['200000', '300000']}
                    />
                </Grid>
                <Grid item sm={4} xs={6}>
                    <div style={{ display: 'flex', gap: '5px' }} >
                        <InputField
                            placeholder='Search a Listing'
                        />
                        <Btn
                            label='Search'
                        />
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}
