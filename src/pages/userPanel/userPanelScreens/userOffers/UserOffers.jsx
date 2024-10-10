import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import { getData } from '../../../../config/apiCalls'
import useAuthCheck from '../../../../hooks/UseAuthCheck';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';



export default function UserOffers() {
    const navigate = useNavigate();
    useAuthCheck()
    const location = useLocation();
    let [offers, setOffers] = useState([]);
    let [isLoading, setIsLoading] = useState(false)




    function getOffers(endPoint = 'my-sent-offers') {
        setIsLoading(true)
        let userId;
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            userId = storedUser?._id;
        }

        getData(endPoint).then((response) => {
            setOffers(response?.offers)
            setIsLoading(false)
        }
        ).catch((err) => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (location?.state?.label === 'Received Offers') {
            getOffers('my-received-offers')
        } else if (location?.state?.label === 'Property Offers') {
            getOffers(`property/${location?.state?.propertyId}/offers`)
        } else {
            getOffers()
        }

    }, [location?.state?.label])



    return (
        <div>
            <div className="heading2 mb-20">{location?.state?.label ?? "Offers"}</div>

            <div className="ap-table">
                <div className="ap-th">
                    <Grid container spacing={1}>
                        <Grid item sm={0.5}>
                            <div className="th-heading">#</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading"> Name</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Email</div>
                        </Grid>
                        <Grid item sm={1}>
                            <div className="th-heading">Company Name</div>
                        </Grid>
                        <Grid item sm={1}>
                            <div className="th-heading">Offered Amount</div>
                        </Grid>
                        <Grid item sm={1}>
                            <div className="th-heading">Terms</div>
                        </Grid>
                        <Grid item sm={1}>
                            <div className="th-heading">Has Home to Sell</div>
                        </Grid>
                        <Grid item sm={2.5}>
                            <div className="th-heading">User</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Property</div>
                        </Grid>
                    </Grid>
                </div>
                <div className="ap-tb">
                    {offers && offers.length > 0 &&
                        offers.map((e, i) => (
                            <div className='ap-th' key={i}>
                                <Grid container spacing={1}>
                                    <Grid item sm={0.5} xs={12} >
                                        <div className="ap-tr">
                                            <div className="th-heading1">#</div>
                                            <div className="tr-data">{i + 1}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1"> Name</div>
                                            <div className="tr-data">{e?.firstName + " " + e?.lastName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Email</div>
                                            <div className="tr-data">{e?.email}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Company Name</div>
                                            <div className="tr-data" >{e?.companyName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Offered Amount</div>
                                            <div className="tr-data">{e?.offerAmount?.toLocaleString('eng-US')}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Terms</div>
                                            <div className="tr-data">{e?.terms}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Has Home To Sell</div>
                                            <div className="tr-data">{e?.hasHomeToSell}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">User</div>
                                            <div className='tr-data' >
                                                {e?.user?.email ?? e?.user}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Property</div>
                                            <div
                                            >
                                                <HomeOutlinedIcon
                                                    onClick={() => navigate('/PropertyDetail', {
                                                        state: e?.property
                                                    })}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: '#32CD32',
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
            <Loader isLoading={isLoading} />
        </div>
    )
}
