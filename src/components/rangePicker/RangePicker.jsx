import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 1000000;
const MIN = 0;


export default function RangePicker() {
    const [val, setVal] = React.useState(MIN);
    const handleChange = (_, newValue) => {
        setVal(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer', fontSize: "14px",
                        fontFamily: "Lato-SemiBold"
                    }}
                >
                    Price
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        cursor: 'pointer', fontSize: "16px",
                        fontFamily: "Lato-SemiBold", color: 'gray'
                    }}
                >
                    $ {val}
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
