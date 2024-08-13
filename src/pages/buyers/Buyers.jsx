import React from 'react'
import './Buyers.css'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import CustomSelect from '../../components/customSelect/CustomSelect'
import locationIcon from '../../assets/imgs/locationIcon.png'
import sizeIcon from '../../assets/imgs/sizeIcon.png'
import bathroomIcon from '../../assets/imgs/bathroomIcon.png'
import bedroomIcon from '../../assets/imgs/bedroomIcon.png'
import basementIcon from '../../assets/imgs/basementIcon.png'
import garageIcon from '../../assets/imgs/garageIcon.png'
import homeIcon from '../../assets/imgs/homeIcon.png'
import opportunityIcon from '../../assets/imgs/opportunityIcon.png'
import { Grid } from '@mui/material'
import RangePicker from '../../components/rangePicker/RangePicker'
import Card from '../../components/card/Card'
import Properties from '../../static/json/Properties'



const selectsData = [
    {
        icon: locationIcon,
        label: 'Location',
        options: ['Gujrat', 'Delhi', 'Mumbai']
    },
    {
        icon: homeIcon,
        label: 'Property Type',
        options: ['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential']
    },
    {
        icon: opportunityIcon,
        label: 'Opportunity Type',
        options: ['Buy & Hold', 'Flip Opportunity', 'Retail Owner-Occupant', 'All']
    },
    {
        icon: garageIcon,
        label: 'Garage',
        options: ['Yes', 'No']
    },
    {
        icon: basementIcon,
        label: 'Basement',
        options: ['Yes', 'No']
    },
    {
        icon: bedroomIcon,
        label: 'Bedrooms',
        options: ['2', '3', '4', '5']
    },
    {
        icon: bathroomIcon,
        label: 'Bathrooms',
        options: ['2', '3', '4']
    },
    {
        icon: sizeIcon,
        label: 'Size (SqFt)',
        options: ['80', '120', '200', '400']
    },
]

export const Buyers = () => {
    return (
        <div>
            <NavBar active='Buyers' />
            {/* sec 1 hero  */}
            <div className="h-hero">
                <div className="h-heading"> <span> Off-Market</span> Inventory</div>
                <div className="h-text">Our off-market inventory features unique opportunities tailored to your needs. Contact us to explore these hidden gems today.</div>

            </div>
            {/* sec 2  */}
            <section className="buyers-sec2 padding">
                <Grid container spacing={2}>
                    {selectsData && selectsData.length > 0 &&
                        selectsData.map(e => (
                            <Grid item md={2.4} sm={3} xs={6} >
                                <CustomSelect
                                    icon={e?.icon}
                                    options={e?.options}
                                    label={e?.label}
                                />
                            </Grid>
                        ))}
                    {/* price range */}
                    <Grid item md={4.8} sm={6} xs={12}>
                        <RangePicker
                        />
                    </Grid>
                </Grid>

                <div className="buyers-sec2-bottom">
                    <p>Showing 1-15 of 480 Properties</p>
                    <CustomSelect
                        style={{ width: 200 }}
                        options={['4956 W Red Oaks (A to Z)', 'Price (Low to High)', 'Price (High to Low)']}
                        label="Sort By"
                    />
                </div>
            </section>
            {/* sec 3  */}
            <section className="buyers-sec-3 padding">
                <Grid container spacing={3}>
                    {Properties && Properties.length > 0 &&
                        Properties.map(item => (
                            <Grid item lg={3} md={4} sm={4} xs={12} key={Math.random()} >
                                <Card
                                    key={item?.status}
                                    status={item?.status}
                                    img={item?.img}
                                    currentStatus={item?.currentStatus}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </section>

            <Footer active='Buyers' />
        </div>
    )
}
