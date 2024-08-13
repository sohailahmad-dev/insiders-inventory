import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ExpandableBox({ label = 'Label', children }) {
    let [isOpen, setIsOpen] = useState(false)
    return (
        <div className='pd-box'>
            <div className="pd-p-header">
                <div className="pd-heading">{label}</div>
                <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
            </div>
            {isOpen && <div className="pd-line"></div>}
            {isOpen && children}
        </div>

    )
}
