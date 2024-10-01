import React, { useEffect, useState } from 'react'
import SelectBox from '../../../../components/selectBox/SelectBox'
import { Grid } from '@mui/material'
import InputField from '../../../../components/inputField/InputField'
import Btn from '../../../../components/btn/Btn'
import noImg from '../../../../assets/imgs/noImg.jpeg';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import { getData, putData } from '../../../../config/apiCalls'
import toast from 'react-hot-toast'
import useAuthCheck from '../../../../hooks/UseAuthCheck'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';



export default function Properties() {
    useAuthCheck(true)
    const navigate = useNavigate();
    let [properties, setProperties] = useState([]);
    let [dataObj, setDataObj] = useState({})
    let [isLoading, setIsLoading] = useState(false);


    function getProperties() {
        setIsLoading(true)

        getData('properties').then((response) => {
            setProperties(response?.properties)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    const updateStatus = (id, status) => {
        putData(`property/status/${id}`, { status }).then((response) => {
            console.log(response);
            toast.success(response?.message);
            getProperties()
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getProperties();
    }, [])

    return (
        <div>
            <div className="heading2 mb-20">All Properties</div>
            {/* <Grid container spacing={1}>
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
            </Grid> */}

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
                    {properties && properties.length > 0 &&
                        properties.map((e, i) => (
                            <div className='ap-th'>
                                <Grid container spacing={1}>
                                    <Grid item sm={0.75} xs={12} >
                                        <div className="ap-tr">
                                            <div className="th-heading1">#</div>
                                            <div className="tr-data">{i + 1}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={3.25} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Property</div>
                                            <div className="tr-property">
                                                <img src={e?.images?.[0] || noImg} alt='img' />
                                                <div>
                                                    <div className="tr-data">{e?.title}</div>
                                                    <div className="tr-data-loc">{e?.country}</div>
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
                                            <div className="tr-data">{e?.opportunityType}</div>
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
                                                options={['Pending', 'Sold', 'Withdrawn']}
                                                onSelect={status => updateStatus(e?._id, status)}
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
                                                    onClick={() => navigate('/AdminPanel/AddProperty', {
                                                        state: {
                                                            property: e,
                                                            path: 'AddProperty',
                                                            isEdit: true,
                                                        }
                                                    })}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: '#32CD32',
                                                        marginRight: 1

                                                    }}
                                                />
                                                <LocalOfferIcon
                                                    onClick={() => {
                                                        navigate('/AdminPanel/Offers', {
                                                            state: {
                                                                propertyId: e?._id,
                                                                label: 'Property Offers'
                                                            }
                                                        })
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
