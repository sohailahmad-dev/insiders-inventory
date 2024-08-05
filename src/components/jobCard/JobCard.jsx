import React from 'react'
import Btn from '../btn/Btn'
import { Grid } from '@mui/material'

export default function JobCard({ name = 'default', description = 'default', requirements, showControls, onEdit, onDelete, onApply, location, salary, postingDate, expiryDate }) {
  return (
    <div className="course-card">
      <div className="course-card-body">
        <div className='course-card-heading' >{name}</div>
        <div className="course-card-descripiton">
          <b>Descripition: </b> {description}
        </div>
        <div className="course-card-descripiton">
          <b>Requirements: </b> {requirements}
        </div>
        <Grid container spacing={1} >
          <Grid item sm={6} xs={12}>
            <div className="course-card-descripiton">
              <b>Salary: </b> {salary}
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className="course-card-descripiton">
              <b>Location: </b> {location}
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className="course-card-descripiton">
              <b>Posting Date </b> {postingDate}
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className="course-card-descripiton">
              <b>Expiry Date </b> {expiryDate}
            </div>
          </Grid>

        </Grid>
        <div style={{ marginTop: '10px' }} ></div>
        {showControls ? <div className="course-card-btns-box">
          <Btn label='Edit' onClick={onEdit} className="course-card-btn" />
          <Btn label='Delete' onClick={onDelete} className="course-card-btn" style={{ background: 'red' }} />
        </div> :
          <div className="course-card-btns-box">
            <Btn label='Apply' onClick={onApply} className="course-card-btn" style={{ backgroundColor: 'green' }} />
          </div>}
      </div>

    </div>
  )
}
