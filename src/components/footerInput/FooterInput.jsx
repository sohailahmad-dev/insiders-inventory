import React, { useState } from 'react'
import './FooterInput.css'

import { Icon } from '@mui/material';

export default function FooterInput({ icon, placeholder, isPassword, onChange, value, inputType, style }) {

    let [type, setType] = useState('text')


    useState(() => {
        if (isPassword) {
            setType('password')
        }
    }, [])

    return (
        <div className='inputBox1' style={style} >
            <div className='leftBox1' >
                {icon && <Icon fontSize='small' component={icon} />}
                <input className='input1' onChange={onChange} value={value} placeholder={placeholder} type={inputType ?? type} />
            </div>
        </div>
    )
}
