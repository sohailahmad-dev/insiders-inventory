import { Grid } from '@mui/material'
import './Card.css'
import React from 'react'
import Btn from '../btn/Btn'
import location from '../../assets/imgs/location.png';
import img from '../../assets/local/img3.png'
import { useNavigate } from 'react-router-dom';


export default function Card({
  property,
  images = [img],
  title = 'Luxury Apartment',
  status = 'New',
  country = 'Australia',
  propertyType = 'Condo',
  price = '1200000',
  ROI = '37',
  initialInvestment = '25000',
  bedrooms = 2,
  bathrooms = 3,
  sqft = 120,
}) {
  const navigate = useNavigate();
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
        <div className="card-item1-heading">{title}</div>
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
    </div>
  )
}
