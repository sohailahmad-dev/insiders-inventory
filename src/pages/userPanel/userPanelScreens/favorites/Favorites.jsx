import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import { deleteData, getData } from '../../../../config/apiCalls'
import toast from 'react-hot-toast';
import useAuthCheck from '../../../../hooks/UseAuthCheck';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import noImg from '../../../../assets/imgs/noImg.png'


export default function Favorites() {
    const navigate = useNavigate();
    useAuthCheck()
    const location = useLocation();
    let [isLoading, setIsLoading] = useState(false)
    let [favorites, setFavorites] = useState([]);

    function handleFavorite(id) {
        setIsLoading(true)

        deleteData(`favorites/${id}/remove`).then((response) => {
            toast.success(response?.message)
            getFavorites();
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err?.message || 'Network Error')
            setIsLoading(false)
        })
    }

    function getFavorites() {
        setIsLoading(true)

        getData('favorites').then((response) => {
            setFavorites(response?.properties)
            setIsLoading(false)
        }
        ).catch((err) => {
            setIsLoading(false)
        })
    }




    useEffect(() => {
        getFavorites()
    }, [])



    return (
        <div>
            <div className="heading2 mb-20">{location?.state?.label ?? "Offers"}</div>

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
                        <Grid item sm={2.5}>
                            <div className="th-heading">Type</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Price</div>
                        </Grid>

                        <Grid item sm={1.5}>
                            <div className="th-heading">Actions</div>
                        </Grid>
                    </Grid>
                </div>
                <div className="ap-tb">
                    {(favorites && favorites.length > 0) ?
                        favorites.map((e, i) => (
                            <div className='ap-th' key={i}>
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
                                                {/* <div className="category-img"> */}
                                                <img src={e?.images?.[0] || noImg} alt='img' />
                                                {/* </div> */}
                                                <div>
                                                    <div className="tr-data">{e?.propertyInformation?.propertyType}</div>
                                                    <div className="tr-data-loc"> {e?.address?.street + ", " + e?.address?.city + ", "}{e?.country}</div>
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
                                    <Grid item sm={2.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Type</div>
                                            <div className="tr-data">{e?.opportunityType}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Price</div>
                                            <div className="tr-data" style={{ color: 'green' }} >${e?.price?.toLocaleString('eng-US')}</div>
                                        </div>
                                    </Grid>

                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Actions</div>
                                            <div
                                                className="card-favoriteIcon"
                                                onClick={() => handleFavorite(e?._id)}
                                            >
                                                <FavoriteIcon sx={{ color: 'red' }} />
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        )) : <div className="heading2 mt-20 text-center">No Favorites Available</div>
                    }
                </div>
            </div>
            <Loader isLoading={isLoading} />
        </div>
    )
}
