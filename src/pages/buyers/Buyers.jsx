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
import Loader from '../../components/loader/Loader'
import { getData } from '../../config/apiCalls'
import toast from 'react-hot-toast'
import useAuthCheck from '../../hooks/UseAuthCheck'
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Btn from '../../components/btn/Btn'
import SearchPlaceMap from '../../components/searchPlaceMap/SearchPlaceMap'


const selectsData = [
    {
        icon: homeIcon,
        label: 'Property Type',
        options: ['', 'Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential', 'Vacant Land'],
        filterName: 'propertyType'
    },
    {
        icon: opportunityIcon,
        label: 'Opportunity Type',
        options: ['', 'Buy & Hold', 'Flip Opportunity', 'Owner-Occupant', 'Retail', 'Current Renovation'],
        filterName: 'opportunityType'
    },
    {
        icon: garageIcon,
        label: 'Garage',
        options: ['', 'Yes', 'No'],
        filterName: 'garage'
    },
    {
        icon: basementIcon,
        label: 'Basement',
        options: ['', 'Yes', 'No'],
        filterName: 'basement'
    },
    {
        icon: bedroomIcon,
        label: 'Bedrooms',
        options: ['', 2, 3, 4, 5, 6, 7, 8],
        filterName: 'bedrooms'
    },
    {
        icon: bathroomIcon,
        label: 'Bathrooms',
        options: ['', 2, 3, 4, 5, 6, 7, 8],
        filterName: 'bathrooms'
    },

]

//                      
//     icon: packageIcon,
//     iconWidth: 15,
//     iconHeight: 15,
//     label: 'Package',
//     options: ['', 'Yes', 'No'],
//     filterName: 'package'
// }

export const Buyers = ({ hide }) => {
    useAuthCheck()
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    let [properties, setProperties] = useState([]);
    let [favorites, setFavorites] = useState([]);
    let [isLoading, setIsLoading] = useState(false);

    let [filteredProperties, setFilteredProperties] = useState([])

    // Pagination 
    const propertiesPerPage = 16;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const currentProperties = filteredProperties.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Filters 

    const [filters, setFilters] = useState({
        location: '',
        propertyType: '',
        opportunityType: '',
        garage: '',
        basement: '',
        bedrooms: null,
        bathrooms: null,
        sqft: null,
        price: { min: 0, max: 1000000 },  // Example price range
    });

    const clearFilters = () => {
        setFilters({
            location: '',
            propertyType: '',
            opportunityType: '',
            garage: '',
            basement: '',
            bedrooms: null,
            bathrooms: null,
            sqft: null,
            price: { min: 0, max: 1000000 },  // Example price range
        })
    }
    // Function to handle filter updates
    const updateFilter = (filterName, value) => {
        setFilters({
            ...filters,
            [filterName]: value,
        });
    };

    // Function to filter properties
    const applyFilters = () => {
        const filtered = properties.filter((property) => {
            const {
                location,
                propertyType,
                opportunityType,
                garage,
                basement,
                bedrooms,
                bathrooms,
                sqft,
                price,
            } = filters;

            // Check each filter criterion independently
            const matchesLocation = location ? property.address.location.toLowerCase().includes(location.toLowerCase()) : true;
            const matchesPropertyType = propertyType ? property.propertyInformation.propertyType === propertyType : true;
            const matchesOpportunityType = opportunityType ? property.opportunityType.includes(opportunityType) : true;
            const matchesGarage = garage ? property.propertyInformation.garage === garage : true;
            const matchesBasement = basement ? property.propertyInformation.basement === basement : true;
            const matchesBedrooms = bedrooms !== null ? property.propertyInformation.bedrooms === bedrooms : true;
            const matchesBathrooms = bathrooms !== null ? property.propertyInformation.bathrooms === bathrooms : true;
            const matchesSqft = sqft ? property.propertyInformation.sqft >= sqft : true;
            const matchesPrice = property.price >= price.min && property.price <= price.max;

            // A property must match all active filters
            return (
                // matchesLocation &&
                // matchesPropertyType &&
                // matchesOpportunityType &&
                // matchesGarage &&
                // matchesBasement &&
                // matchesBedrooms &&
                // matchesBathrooms &&
                // matchesSqft &&
                // matchesPrice
                matchesPropertyType &&
                matchesOpportunityType &&
                matchesGarage &&
                matchesBasement &&
                matchesBathrooms &&
                matchesBedrooms

            );
        });

        setFilteredProperties(filtered);
    };



    useEffect(() => {
        // Apply the filters every time the `filters` state changes
        applyFilters();
    }, [filters]);

    const isFavorite = (propertyId) => {
        let isFavorite = favorites.some(favorite => favorite._id?.toString() === propertyId?.toString());
        return isFavorite;
    };


    function getProperties() {
        setIsLoading(true)

        getData('properties').then((response) => {
            setProperties(response?.properties)
            setFilteredProperties(response?.properties)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    function getFavorites() {
        setIsLoading(true)

        getData('favorites').then((response) => {
            setFavorites(response?.properties)
            setIsLoading(false)
        }
        ).catch((err) => {
            setIsLoading(false)
        })
    }

    const updateFavorites = () => {
        getFavorites();
        getProperties();
    }

    const resetFilters = () => {
        setFilteredProperties([...properties])
    }


    useEffect(() => {
        getProperties()
        getFavorites()
    }, [])



    return (
        <div>
            {hide || <NavBar active='Buyers' />}
            {/* sec 1 hero  */}
            {hide || <div className="h-hero">
                <div className="h-heading">Insider’s  <span> Off-Market Inventory</span> </div>
                <div className="h-text">Our off-market inventory features unique opportunities tailored to your needs. Sign-Up to explore these hidden gems today.</div>

            </div>}
            {/* sec 2  */}
            {hide || <section className="buyers-sec2 padding">
                <Grid container spacing={3}>
                    <Grid item sm={5} xs={12}>
                        <MapComponent />
                    </Grid>
                    <Grid item sm={7} xs={12}>

                        <Grid container spacing={2}>

                            {selectsData && selectsData.length > 0 &&
                                selectsData.map((e, i) => (
                                    <Grid item sm={6} xs={12} key={i}>
                                        <CustomSelect
                                            iconWidth={e?.iconWidth}
                                            iconHeight={e?.iconHeight}
                                            icon={e?.icon}
                                            options={e?.options}
                                            label={e?.label}
                                            onSelect={(val) => updateFilter(e?.filterName, val)}
                                        />
                                    </Grid>
                                ))}

                            <Grid item sm={6} xs={12}>
                                <RangePicker

                                    label='Sqft'
                                    MIN={1}
                                    MAX={200}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <RangePicker
                                />
                            </Grid>
                            {/* price range */}
                            {/* <div
                                onClick={clearFilters}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    width: '100%'
                                }}
                            >
                                <Btn
                                    label='Clear Filters'
                                />
                            </div> */}


                        </Grid>
                    </Grid>
                </Grid>


                <div className="buyers-sec2-bottom"    >
                    <p>Showing {startIndex + 1}-{endIndex > filteredProperties?.length ? filteredProperties?.length : endIndex} of {filteredProperties?.length} Properties</p>

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
            </section>}
            {/* sec 3  */}
            <section className="buyers-sec-3 padding">
                <Grid container spacing={3}>
                    {currentProperties && currentProperties.length > 0 ?
                        currentProperties.map(item => (
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
                                    isFavourite={isFavorite(item?._id)}
                                    onFavorite={updateFavorites}
                                />
                            </Grid>
                        )) : (<div style={{ textAlign: 'center', width: '100%' }}>
                            <div className='heading2 mt-50 mb-50 all-inventorty-text'
                                onClick={resetFilters}
                            >Check Out All Inventory Instead</div >
                        </div>)
                    }
                </Grid>
            </section>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <IconButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    sx={{ color: 'green' }}
                >
                    <ArrowBackIos />
                </IconButton>

                <IconButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    sx={{ color: 'green' }}
                >
                    <ArrowForwardIos />
                </IconButton>
            </div>
            <Loader isLoading={isLoading} />
            {hide || <Footer active='Buyers' />}
        </div>
    )
}
