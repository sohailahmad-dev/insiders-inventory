import React from 'react'
import './UserProperties.css'
import SelectBox from '../../../../components/selectBox/SelectBox'
import { Grid } from '@mui/material'
import InputField from '../../../../components/inputField/InputField'
import Btn from '../../../../components/btn/Btn'
import img3 from '../../../../assets/local/img3.png';
import img4 from '../../../../assets/local/img4.png';
import img5 from '../../../../assets/local/img5.png';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const data = [
    {
        id: 1,
        img: img3,
        status: 'Vacant',
        type: 'Commercial',
        price: '112000',
    },
    {
        id: 2,
        img: img4,
        status: 'Tenant-Occupied',
        type: 'Condo',
        price: '202000',
    },
    {
        id: 3,
        img: img5,
        status: 'Owner-Occupied',
        type: 'Single-Family',
        price: '450000',
    },
    {
        id: 5,
        img: img3,
        status: 'Vacant',
        type: 'Commercial',
        price: '112000',
    },

]

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

            <div className="ap-table">
                <div className="ap-th">
                    <Grid container spacing={1}>
                        <Grid item sm={0.75}>
                            <div className="th-heading">#</div>
                        </Grid>
                        <Grid item sm={3.25}>
                            <div className="th-heading">Property</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Property Status</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Type</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Price</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Status</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Actions</div>
                        </Grid>
                    </Grid>
                </div>
                <div className="ap-tb">
                    {data.map(e => (
                        <div className='ap-th'>
                            <Grid container spacing={1}>
                                <Grid item sm={0.75} xs={12} >
                                    <div className="ap-tr">
                                        <div className="th-heading1">#</div>
                                        <div className="tr-data">{e?.id}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={3.25} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Property</div>
                                        <div className="tr-property">
                                            <img src={e?.img} alt='img' />
                                            <div>
                                                <div className="tr-data">Apartment with subunits</div>
                                                <div className="tr-data-loc">Jersey city, Greenville</div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Property Status</div>
                                        <div className="tr-data">{e?.status}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={1.5} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Type</div>
                                        <div className="tr-data">{e?.type}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={1.5} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Price</div>
                                        <div className="tr-data" style={{ color: 'green' }} >${e?.price}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={1.5} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Status</div>
                                        <SelectBox
                                            label='Status'
                                            options={['Pending', 'Sold']}
                                            style={{
                                                marginTop: 0,
                                                height: '30px',
                                                width: '90%'
                                            }}
                                            labelStyle={{
                                                fontSize: 12,
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item sm={1.5} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Actions</div>
                                        <div >
                                            <EditIcon
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: '#32CD32',
                                                    marginRight: 1

                                                }}
                                            />
                                            <DeleteIcon
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: 'red',
                                                    marginRight: 1

                                                }}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
