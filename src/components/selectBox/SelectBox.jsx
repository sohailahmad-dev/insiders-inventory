import React, { useEffect, useState } from 'react';
import './SelectBox.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SelectBox = ({
    options,
    icon,
    label,
    onSelect,
    style,
    labelStyle,
    containerStyle,
    iconColor,
    defaultValue,
    multiSelect = false // Multi-select toggle
}) => {
    const [selectedValue, setSelectedValue] = useState(multiSelect ? [] : ''); // Array for multi-select, string for single
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        if (multiSelect) {
            // For multi-select, toggle the selected value
            if (selectedValue.includes(value)) {
                setSelectedValue(selectedValue.filter(item => item !== value));
            } else {
                setSelectedValue([...selectedValue, value]);
            }
        } else {
            // For single-select, set the value and close the dropdown
            setSelectedValue(value);
            setIsOpen(false); // Close the dropdown for single-select
        }

        // Call the parent onSelect function with the updated selection
        if (onSelect) {
            onSelect(multiSelect ? [...selectedValue, value] : value); // Send array or single value based on multiSelect
        }
    };

    useEffect(() => {
        if (defaultValue) {
            handleSelect(defaultValue);
        }
    }, []); // Set initial value based on defaultValue

    return (
        <>
            <div className='inputField-label' style={labelStyle}>
                {label}
            </div>
            <div className="custom-select1-container" style={style}>
                <div className="custom-select1-label" style={containerStyle} onClick={() => setIsOpen(!isOpen)}>
                    <span className="custom-select1-text" style={{ color: selectedValue.length > 0 ? 'black' : '#757575' }}>
                        {multiSelect
                            ? (selectedValue.length > 0 ? selectedValue.join(', ') : label) // Display comma-separated values for multi-select
                            : (selectedValue || label) // Display single value for single-select
                        }
                    </span>
                    <KeyboardArrowDownIcon sx={{ color: iconColor ?? 'gray' }} />
                </div>
                {isOpen && (
                    <ul className="custom-select1-options">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={`custom-select1-option ${multiSelect && selectedValue.includes(option) ? 'selected' : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {/* Display checkboxes for multi-select */}
                                {multiSelect && (
                                    <input
                                        type="checkbox"
                                        checked={selectedValue.includes(option)} // Check if the option is selected
                                        onChange={() => handleSelect(option)} // Toggle selection on checkbox change
                                    />
                                )}
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default SelectBox;
