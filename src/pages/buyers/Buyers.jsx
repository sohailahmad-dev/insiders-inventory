import React, { useEffect, useState } from 'react'
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
import packageIcon from '../../assets/imgs/packageIcon.png'
import opportunityIcon from '../../assets/imgs/opportunityIcon.png'
import { Grid } from '@mui/material'
import RangePicker from '../../components/rangePicker/RangePicker'
import Card from '../../components/card/Card'
import Properties from '../../static/json/Properties'
import InputField from '../../components/inputField/InputField'
import MapComponent from '../../components/mapComponent/MapComponent'
import { useNavigate } from 'react-router-dom'
import useIsMobile from '../../hooks/UseIsMobile'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { getData } from '../../config/apiCalls'



const selectsData = [
    {
        icon: locationIcon,
        label: 'Location',
        options: ['Gujrat', 'Delhi', 'Mumbai']
    },
    {
        icon: homeIcon,
        label: 'Property Type',
        options: ['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential', 'Vacant Land']
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
    {
        icon: packageIcon,
        iconWidth: 15,
        iconHeight: 15,
        label: 'Package',
        options: ['Package - Yes', 'Package - No']
    }
]

export const Buyers = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    let [properties, setProperties] = useState([]);
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
        } else {
            navigate('/Signup')
        }
    }, [])

    function getProperties() {
        setIsLoading(true)

        getData('properties').then((response) => {
            toast.success(response.message)
            console.log(response)
            setProperties(response?.properties)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getProperties()
    }, [])

    return (
        <div>
            <NavBar active='Buyers' />
            {/* sec 1 hero  */}
            <div className="h-hero">
                <div className="h-heading">Insider’s Off-Market  <span> Inventory</span> </div>
                <div className="h-text">Our off-market inventory features unique opportunities tailored to your needs. Sign-Up to explore these hidden gems today.</div>

            </div>
            {/* sec 2  */}
            <section className="buyers-sec2 padding">
                <Grid container spacing={3}>
                    <Grid item sm={5} xs={12}>
                        <MapComponent />

                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <Grid container spacing={2}>
                            {selectsData && selectsData.length > 0 &&
                                selectsData.map(e => (
                                    <Grid item sm={6} xs={6} >
                                        <CustomSelect
                                            iconWidth={e?.iconWidth}
                                            iconHeight={e?.iconHeight}
                                            icon={e?.icon}
                                            options={e?.options}
                                            label={e?.label}
                                        />
                                    </Grid>
                                ))}

                            <Grid item sm={6} xs={12}>
                                <RangePicker
                                />
                            </Grid>
                            {/* price range */}

                        </Grid>
                    </Grid>
                </Grid>


                <div className="buyers-sec2-bottom"    >
                    <p>Showing 1-15 of 480 Properties</p>

                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', marginTop: 20, marginBottom: 20 }}>

                    <div
                        style={{ flex: 3, marginRight: '20%' }}
                    >
                        <InputField
                            placeholder='Search for a property address'
                        />
                    </div>
                    <div
                        style={{ flex: 1 }}
                    >
                        <CustomSelect
                            options={['4956 W Red Oaks (A to Z)', 'Price (Low to High)', 'Price (High to Low)', 'Newest']}
                            label="Sort By"
                        />
                    </div>

                </div>
            </section>
            {/* sec 3  */}
            <section className="buyers-sec-3 padding">
                <Grid container spacing={3}>
                    {properties && properties.length > 0 &&
                        properties.map(item => (
                            <Grid item xl={3} lg={4} md={4} sm={4} xs={12} key={Math.random()} >
                                <Card
                                    key={item?._id}
                                    property={item}
                                    images={item?.images}
                                    title={item?.title}
                                    status={item?.status}
                                    country={item?.country}
                                    propertyType={item?.propertyInformation?.propertyType}
                                    price={item?.price}
                                    ROI={item?.assignment?.portentialRoi}
                                    initialInvestment={item?.assignment?.initialInvestment}
                                    bedrooms={item?.propertyInformation?.bedrooms}
                                    bathrooms={item?.propertyInformation?.bathrooms}
                                    sqft={item?.propertyInformation?.sqft}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </section>
            {/* map  */}
            <section className="padding">
            </section>
            <Loader isLoading={isLoading} />
            <ToastContainer />
            <Footer active='Buyers' />
        </div>
    )
}
