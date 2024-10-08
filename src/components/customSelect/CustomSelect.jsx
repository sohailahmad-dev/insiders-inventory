import React, { useState } from 'react';
import './CustomSelect.css'; // Add your custom CSS here
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CustomSelect = ({ options, icon, label, onSelect, style, iconWidth, iconHeight, labelStyle }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <>
            <div className='inputField-label' style={labelStyle}>
                {label}
            </div>
            <div className="custom-select-container" style={style}>
                <div className="custom-select-label" onClick={() => setIsOpen(!isOpen)}>
                    {icon && <img src={icon} alt='icon' className='custom-select-icon' style={{ width: iconWidth, height: iconHeight }} />}
                    <span className="custom-select-text" style={{ color: selectedValue ? 'black' : '#757575' }} >{selectedValue || label}</span>
                    <KeyboardArrowDownIcon />
                </div>
                {isOpen && (
                    <ul className="custom-select-options">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="custom-select-option"
                                onClick={() => handleSelect(option)}
                            >
                                {option === '' ? 'Clear Selection' : option}

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default CustomSelect;
