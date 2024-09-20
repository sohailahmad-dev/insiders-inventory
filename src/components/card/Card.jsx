import { Grid } from '@mui/material'
import './Card.css'
import React, { useState } from 'react'
import Btn from '../btn/Btn'
import location from '../../assets/imgs/location.png';
import img from '../../assets/local/img3.png'
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Loader from '../loader/Loader';
import { deleteData, postData } from '../../config/apiCalls';
import toast from 'react-hot-toast';


export default function Card({
  property,
  images = [img],
  title = 'Luxury Apartment',
  status = 'New',
  country = 'Australia',
  propertyType = 'Condo',
  price = '1200000',
  ROI = '15',
  initialInvestment = '25000',
  bedrooms = 2,
  bathrooms = 3,
  sqft = 120,
  isFavourite = false,
  onFavorite
}) {
  const navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  function handleFavorite() {
    setIsLoading(true)

    const dataObj = { propertyId: property?._id }

    if (isFavourite) {
      deleteData(`favorites/${property?._id}/remove`).then((response) => {
        toast.success(response?.message)
        onFavorite()
        setIsLoading(false)
      }
      ).catch((err) => {
        toast.error(err?.message || 'Network Error')
        setIsLoading(false)
      })
    } else {
      postData('favorites', dataObj).then((response) => {
        toast.success(response?.message)
        setIsLoading(false);
        onFavorite()
      }
      ).catch((err) => {
        toast.error(err?.message || 'Network Error')
        setIsLoading(false)
      })
    }


  }

  return (
    <div
      className="card-Item"
    >
      <div className="card-img"
        style={{ backgroundImage: `url(${images[0]})` }}
      >
        {status === 'Sold' && <span className='card-house-new' style={{ background: 'red' }} >{status}</span>}
        {status === 'New' && <span className='card-house-new' >{status}</span>}
        {status === 'Pending' && <span className='card-house-new' style={{ background: 'orange' }} >{status}</span>}
        {status === 'Withdrawn' && <span className='card-house-new' style={{ background: 'red', fontSize: 8 }} >{status}</span>}
        <span className="card-item-status">{propertyType}</span>
        {/* stats  */}
        <div className='card-item-statsBox'>
          <Grid container spacing={0} >
            <Grid item xs={6}>
              <div className="sldier1-stats-left">
                <div className="card-stats-label">Initial Investment</div>
                <div className="card-stats-figure">${initialInvestment}</div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="sldier1-stats-right">
                <div className="card-stats-label">Potential ROI</div>
                <div className="card-stats-figure">{ROI}%</div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="sldier1-item-contents">
        <div className='card-favorite-box'>
          <div className="card-item1-heading">{title}</div>
          <div
            className="card-favoriteIcon"
            onClick={handleFavorite}
          >{isFavourite ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />} </div>
        </div>
        <div className="card-item-price">${price}</div>
        <div className="card-item-specs">{bedrooms} bedroom(s) | {bathrooms} bathroom(s) | {sqft} sq. ft.</div>
        <div className="card-item-lcation">
          <img src={location} alt="location-icon" />
          {country}</div>
        <Btn
          label='Check Proprty Details'
          onClick={() => navigate('/PropertyDetail', { state: property })}
        ></Btn>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  )
}
