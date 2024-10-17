import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


export default function RangePicker({ MIN = 1, MAX = 3000000, label = 'Price', onSelect }) {
    const [val, setVal] = React.useState([MIN, MAX]);
    const handleChange = (_, newValue) => {
        setVal(newValue);
        if (onSelect) {
            onSelect(newValue)
        }
    };

    return (
        <Box sx={{ width: '90%', margin: '0px 10px', }}>
            <Typography
                variant="body2"
                sx={{
                    cursor: 'pointer', fontSize: "14px",
                    fontFamily: "Lato-SemiBold"
                }}
            >
                {label}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div />
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer', fontSize: "16px",
                        fontFamily: "Lato-SemiBold", color: 'gray'
                    }}
                >
                    {val[0]?.toLocaleString('eng-US') + ' , ' + val[1]?.toLocaleString('eng-US')}
                </Typography>
            </Box>
            <Slider
                step={10}
                value={val}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                color={'success'}
                onChange={handleChange}
            />
        </Box>
    );
}
