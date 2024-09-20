import React from 'react';
import './InputField.css';
import { Icon } from '@mui/material';

export default function InputField({
    icon,
    placeholder,
    isPassword,
    onChange,
    value,
    inputType,
    style,
    label,
    labelStyle,
    isTextarea
}) {
    return (
        <div>
            {label && (
                <div className='inputField-label' style={labelStyle}>
                    {label}
                </div>
            )}
            <div className='inputBox' style={style}>
                <div className='leftBox'>
                    {icon && <Icon fontSize='small' component={icon} />}
                    {!isTextarea ? (
                        <input
                            onChange={onChange}
                            value={value}
                            placeholder={placeholder}
                            type={inputType || (isPassword ? 'password' : 'text')}
                        />
                    ) : (
                        <textarea
                            onChange={onChange}
                            value={value}
                            placeholder={placeholder}
                            rows={3} // Customize rows as needed
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
