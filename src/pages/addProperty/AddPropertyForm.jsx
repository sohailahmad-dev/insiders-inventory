import React, { useState } from 'react'
import CheckBox from '../../components/checkBox1/CheckBox'
import { Grid } from '@mui/material';
import InputField from '../../components/inputField/InputField';
import SelectBox from '../../components/selectBox/SelectBox';
import FileUpload from '../../components/fileInput/FileUpload';

const types = ['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential', 'Portfolio Package'];
const opportunityTypes = ['Buy & Hold', 'Flip Opportunity', 'Retail', 'Owner-Occupant', 'Current Renovation']

export default function AddPropertyForm() {
    let [dataObj, setDataObj] = useState({});

    const addData = (label, value) => {
        dataObj[label] = value;
        setDataObj({ ...dataObj });
    }

    return (
        <>
            <div className="heading3">Opportunity Type</div>
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {opportunityTypes && opportunityTypes.length > 0 &&
                    opportunityTypes.map(e => (
                        <CheckBox
                            key={e}
                            label={e}
                        />
                    ))}

            </div>
            {true && <>
                <div className="heading3 mt-20 mb-20">Lockbox Code</div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputField
                            placeholder='Lockbox Code'
                        />
                    </Grid>
                </Grid>
            </>}
            <div className="heading3">Property Address</div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputField
                        placeholder='Street Address'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='City'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='Zip Code'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='State'
                    />
                </Grid>
            </Grid>
            <div className="heading3 mt-20">Details about your Listing</div>
            <Grid container spacing={2}>

                <Grid item sm={6} xs={12}>
                    <SelectBox
                        label='Current Status'
                        options={['Owner-Occupied', 'Tenant-Occupied', 'Vacant', 'Eviction/Squatter']}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <SelectBox
                        label='Leased?'
                        options={['Yes', 'No']}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='Price'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='Initial Investment / Down Payment'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='Date'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='Size (SqFt)'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='# of Bedroom'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='# of Bathrooms'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <SelectBox
                        label='Basement'
                        options={['Yes', 'No']}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <SelectBox
                        label='Garage'
                        options={['Yes', 'No']}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <SelectBox
                        label='Property Management Company'
                        options={['Yes', 'No']}
                        onSelect={(e) => addData('property_management_company', e)}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <InputField
                        placeholder='Cash on Cash Return'
                    />
                </Grid>
                {dataObj.property_management_company === 'Yes' &&
                    <>
                        <Grid item sm={6} xs={12}>
                            <InputField
                                placeholder='Management Company Name'
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <InputField
                                placeholder='Property Management Company Information'
                            />
                        </Grid>
                    </>}
                <Grid item sm={6} xs={12}>
                    <SelectBox
                        label='Owner Type'
                        options={['Assignment / Wholesale', 'Corp / REIT / Fund', 'Private']}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <SelectBox
                        label='Financing Types'
                        options={['Cash', 'Conventional', 'FHA', 'Land Contract']}
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <InputField
                        placeholder='Additional Information / Remarks'
                    />
                </Grid>
                <Grid item xs={12}>
                    <FileUpload />
                </Grid>
                <Grid item xs={12}>
                    <FileUpload
                        label='Upload Videos'
                    />
                </Grid>
            </Grid>
        </>
    )
}
