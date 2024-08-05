import React, { useState } from 'react'
import './InputField.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Icon } from '@mui/material';

export default function InputField({ icon, placeholder, isPassword, onChange, value, inputType, style }) {

    let [type, setType] = useState('text')

    const handleType = () => {
        type === 'text' ? setType('password') : setType('text')
    }

    useState(() => {
        if (isPassword) {
            setType('password')
        }
    }, [])

    return (
        <div className='inputBox' style={style} >
            <div className='leftBox' >
                {icon && <Icon fontSize='small' component={icon} />}
                <input onChange={onChange} value={value} placeholder={placeholder} type={inputType ?? type} />
            </div>
            {isPassword &&
                <div onClick={handleType} style={{ cursor: 'pointer' }} >
                    {type === 'password' ? <VisibilityIcon fontSize='small' /> :
                        <VisibilityOffIcon fontSize='small' />}
                </div>}
        </div>
    )
}
