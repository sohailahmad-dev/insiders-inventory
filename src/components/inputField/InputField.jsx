import React, { useState } from 'react'
import './InputField.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Icon } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export default function InputField({ icon, placeholder, isPassword, onChange, value, inputType, style, label, labelStyle }) {



    return (
        <div>
            <div className='inputField-label' style={labelStyle} >
                {label}
            </div>
            <div className='inputBox' style={style} >
                <div className='leftBox' >
                    {icon && <Icon fontSize='small' component={icon} />}
                    <input onChange={onChange} value={value} placeholder={placeholder} type={inputType} />
                </div>
            </div>
        </div>
    )
}
