import React from 'react'
import './Btn.css'
import CallMadeIcon from '@mui/icons-material/CallMade';

export default function Btn({ label, onClick, className, style, type }) {
    return (
        <button onClick={onClick} className={className ?? 'button'} style={style} type={type} >{label} <CallMadeIcon sx={{ fontFamily: 'Lato-Bold' }} fontSize='sm' /> </button>
    )
}