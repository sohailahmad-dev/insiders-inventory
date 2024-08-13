import { Grid } from '@mui/material'
import './Card.css'
import React from 'react'
import Btn from '../btn/Btn'
import location from '../../assets/imgs/location.png';
import { useNavigate } from 'react-router-dom';


export default function Card({ status, img, currentStatus }) {
  const navigate = useNavigate();
  return (
    <div
      className="card-Item"
      onClick={() => navigate('/PropertyDetail', { state: Math.random() })}
    >
      <div className="card-img"
        style={{ backgroundImage: `url(${img})` }}
      >
        {currentStatus === 'Sold' && <span className='card-house-sold' >{currentStatus}</span>}
        {currentStatus === 'New' && <span className='card-house-new' >{currentStatus}</span>}
        <span className="card-item-status">{status}</span>
        {/* stats  */}
        <div className='card-item-statsBox'>
          <Grid container spacing={0} >
            <Grid item xs={6}>
              <div className="sldier1-stats-left">
                <div className="card-stats-label">Initial Investment</div>
                <div className="card-stats-figure">$45,120</div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="sldier1-stats-right">
                <div className="card-stats-label">Potential ROI</div>
                <div className="card-stats-figure">37%</div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="sldier1-item-contents">
        <div className="card-item1-heading">Luxury Apartment</div>
        <div className="card-item-price">$450,000</div>
        <div className="card-item-specs">3 bedroom | 1 bathroom | 971 sq. ft.</div>
        <div className="card-item-lcation">
          <img src={location} alt="location-icon" />
          Australia</div>
        <Btn
          label='Login to make an offer'
        ></Btn>
      </div>
    </div>
  )
}
