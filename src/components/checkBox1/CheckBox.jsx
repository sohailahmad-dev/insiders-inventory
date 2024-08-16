import { Checkbox, FormControlLabel } from '@mui/material'
import './CheckBox.css'
import React from 'react'

export default function CheckBox({ label, onChange, sx, labelColor, style }) {
    return (
        <div className='check-box' style={style}>
            <FormControlLabel
                control={<Checkbox
                    size='sm'
                    color='success'
                    onChange={onChange}
                    sx={sx}
                />}
                sx={{
                    marginRight: 0
                }}
            />
            <span style={{ color: labelColor ?? '#4D5959', marginRight: 5, cursor: 'default' }}>{label ?? 'label'}
            </span>
        </div>
    )
}
