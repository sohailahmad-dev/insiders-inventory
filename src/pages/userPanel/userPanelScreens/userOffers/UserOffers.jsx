import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import { getData } from '../../../../config/apiCalls'
import toast from 'react-hot-toast';
import useAuthCheck from '../../../../hooks/UseAuthCheck';


export default function UserOffers() {
    useAuthCheck()
    let [offers, setOffers] = useState([]);
    let [isLoading, setIsLoading] = useState(false)




    function getOffers() {
        setIsLoading(true)
        let userId;
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            userId = storedUser?._id;
            console.log(storedUser)
        }

        getData(`user/${userId}/offers`).then((response) => {
            toast.success(response.message)
            console.log(response)
            setOffers(response?.offers)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getOffers()
    }, [])



    return (
        <div>
            <div className="heading2 mb-20">All Users</div>

            <div className="ap-table">
                <div className="ap-th">
                    <Grid container spacing={1}>
                        <Grid item sm={0.5}>
                            <div className="th-heading">#</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">First Name</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Last Name</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Email</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Category</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Phone Number</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Actions</div>
                        </Grid>
                    </Grid>
                </div>
                <div className="ap-tb">
                    {offers && offers.length > 0 &&
                        offers.map((e, i) => (
                            <div className='ap-th'>
                                <Grid container spacing={1}>
                                    <Grid item sm={0.5} xs={12} >
                                        <div className="ap-tr">
                                            <div className="th-heading1">#</div>
                                            <div className="tr-data">{i + 1}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">First Name</div>
                                            <div className="tr-data">{e?.firstName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Last Name</div>
                                            <div className="tr-data">{e?.lastName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Email</div>
                                            <div className="tr-data">{e?.email}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Company</div>
                                            <div className="tr-data" >{e?.companyName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Offered Amount</div>
                                            <div className="tr-data">{e?.offerAmount}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Property ID</div>
                                            <div className='tr-data' >
                                                {e?.property?._id.slice(0, 10)}...
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
