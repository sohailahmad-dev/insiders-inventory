import React, { useEffect, useState } from 'react';
import './SelectBox.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SelectBox = ({ options, icon, label, onSelect, style, labelStyle, containerStyle, iconColor, defaultValue }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
        if (onSelect) {
            onSelect(value);
        }
    };

    useEffect(() => {
        if (defaultValue) {
            handleSelect(defaultValue)
        }
    }, [])

    return (
        <div className="custom-select1-container" style={style}>
            <div className="custom-select1-label" style={containerStyle} onClick={() => setIsOpen(!isOpen)}>
                <span className="custom-select1-text" style={{ color: selectedValue ? 'black' : '#757575' }}>{selectedValue || label}</span>
                <KeyboardArrowDownIcon sx={{ color: iconColor ?? 'gray' }} />
            </div>
            {isOpen && (
                <ul className="custom-select1-options">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="custom-select1-option"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectBox;

