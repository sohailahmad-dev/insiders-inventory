import React from 'react'
import Btn from '../btn/Btn'

export default function Card({ name = 'default', description = 'default', img, showControls, onEdit, onDelete, onDetail, onApply }) {
  return (
    <div className="course-card">
      <img src={img ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Z-Viu23Zi9aepAkisUn3zQAUzGBys45htQ&s'} alt="img" />
      <div className="course-card-body">
        <div className='course-card-heading' >{name}</div>
        <div className="course-card-descripiton">
          {description.slice(0, 80)} . . .
        </div>
        {showControls ? <div className="course-card-btns-box">
          <Btn label='Details' onClick={onDetail} className="course-card-btn" style={{ backgroundColor: 'green' }} />
          <Btn label='Edit' onClick={onEdit} className="course-card-btn" />
          <Btn label='Delete' onClick={onDelete} className="course-card-btn" style={{ background: 'red' }} />
        </div> :
          <div className="course-card-btns-box">
            <Btn label='Enroll Now' onClick={onApply} className="course-card-btn" style={{ backgroundColor: 'green' }} />
            <Btn label='Check Details' onClick={onDetail} className="course-card-btn" />
          </div>}
      </div>

    </div>
  )
}
