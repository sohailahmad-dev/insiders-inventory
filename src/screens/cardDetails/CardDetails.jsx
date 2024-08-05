import React, { useEffect, useState } from 'react'
import './CardDetails.css'
import { useLocation } from 'react-router-dom'

export default function CardDetails() {
    const location = useLocation();
    let [item, setItem] = useState({});

    useEffect(() => {
        setItem(location.state);
        console.log(location.state)
    }, [])
    return (
        <div className='cardDetails'>
            <img src={item?.image_url ?? item?.img_url ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Z-Viu23Zi9aepAkisUn3zQAUzGBys45htQ&s'} alt="img" />
            {item?.trainer ? <>
                <div className='cardDetail-item'>
                    Training Program Name: <span>{item?.program_name}</span>
                </div>
                <div className='cardDetail-item'>
                    Trainer: <span>{item?.trainer}</span>
                </div>
            </> :
                <>
                    <div className='cardDetail-item'>
                        Course Name: <span>{item?.course_name}</span>
                    </div>
                    <div className='cardDetail-item'>
                        Instructor: <span>{item?.instructor}</span>
                    </div>
                </>}
            <div className='cardDetail-item'>
                Duration: <span>{item?.duration}</span>
            </div>
            <div className='cardDetail-item'>
                Description: <span>{item?.description}</span>
            </div>
        </div>
    )
}
