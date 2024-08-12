import { Checkbox, FormControlLabel } from '@mui/material'
import './CheckBox.css'
import React from 'react'

export default function CheckBox({ label, onChange }) {
    return (
        <div className='check-box'>
            <FormControlLabel
                control={<Checkbox
                    size='sm'
                    color='success'
                    onChange={onChange}
                />}
                sx={{
                    marginRight: 0
                }}
            />
            <span style={{ color: '#4D5959', marginRight: 5 }}>{label ?? 'label'}
            </span>
        </div>
    )
}
