import React, { useState } from 'react';
import './CustomSelect.css'; // Add your custom CSS here
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CustomSelect = ({ options, icon, label, onSelect, style }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
        onSelect(value);
    };

    return (
        <div className="custom-select-container" style={style}>
            <div className="custom-select-label" onClick={() => setIsOpen(!isOpen)}>
                {icon && <img src={icon} alt='icon' className='custom-select-icon' />}
                <span className="custom-select-text">{selectedValue || label}</span>
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
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
