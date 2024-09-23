import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


export default function RangePicker({ MIN = 0, MAX = 1000000, label = 'Price' }) {
    const [val, setVal] = React.useState([MIN, MAX]);
    const handleChange = (_, newValue) => {
        setVal(newValue);
    };

    return (
        <Box sx={{ width: '90%', margin: '0px 10px', }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer', fontSize: "14px",
                        fontFamily: "Lato-SemiBold"
                    }}
                >
                    {label}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer', fontSize: "16px",
                        fontFamily: "Lato-SemiBold", color: 'gray'
                    }}
                >
                    {val[0] + ' , ' + val[1]}
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
