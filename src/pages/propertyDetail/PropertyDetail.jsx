import React, { useEffect, useState } from 'react'
import './PropertyDetail.css'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ExpandableBox from '../../components/expandableBox/ExpandableBox'
import locationIcon from '../../assets/imgs/location.png';
import Btn from '../../components/btn/Btn';
import { Grid } from '@mui/material';
import Slider2 from '../../components/slider2/Slider2';
import Slider3 from '../../components/slider3/Slider3';
import pdIcon1 from '../../assets/imgs/pdIcon1.png'
import pdIcon2 from '../../assets/imgs/pdIcon2.png'
import pdIcon3 from '../../assets/imgs/pdIcon3.png'
import pdIcon4 from '../../assets/imgs/pdIcon4.png'
import pdIcon5 from '../../assets/imgs/pdIcon5.png'
import noImg from '../../assets/imgs/noImg.png'
import map1 from '../../assets/imgs/map1.png'
import videoImg from '../../assets/imgs/videoImg.png'
import Card from '../../components/card/Card'
import Properties from '../../static/json/Properties'
import { useLocation } from 'react-router-dom'
import ApplyModal from './applyModal/ApplyModal'
import VideoBox from '../../components/videoBox/VideoBox'
import { Buyers } from '../buyers/Buyers'
import useAuthCheck from '../../hooks/UseAuthCheck'
import MapComponent from '../../components/mapComponent/MapComponent'
import Loader from '../../components/loader/Loader'
import { postData } from '../../config/apiCalls'


const type = 'Assignment'

export default function PropertyDetail() {
    useAuthCheck();
    let [properties, setProperties] = useState([]);
    let [property, setProperty] = useState({});
    let [openModal, setOpenModal] = useState(false);
    let [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const handleSchedule = () => {
        setIsLoading(true)

        postData('schedule', { propertyId: property?._id }).then((response) => {
            toast.success(response.message)
            setIsLoading(false)
        }
        ).catch((err) => {
            setIsLoading(false)
        })
    }

    const closeModal = () => {
        setOpenModal(false)
    }


    useEffect(() => {
        setProperties(Properties.slice(0, 6))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        setProperty(location?.state)
    }, [location])


    return (
        <div>
            <NavBar active='Off-Market Inventory' />
            {/* sec 1  */}
            <section className="pd-padding">
                <div className="pd-header">
                    <div>
                        <div className="heading1">{property?.propertyInformation?.propertyType ?? 'Condo'}</div>
                        <div className="card-item-lcation">
                            <img src={locationIcon} alt="location-icon" />
                            {property?.address?.street + ', ' + property?.address?.city + ', '}
                            {property?.country}</div>
                    </div>
                    <div className='pd-header-right' >
                        <Btn
                            label='Schedule a Showing'
                            style={{
                                backgroundColor: 'transparent',
                                color: '#4DAD49'
                            }}
                            onClick={handleSchedule}
                        />
                        <Btn
                            label='Submit An Offer'
                            onClick={() => setOpenModal(true)}
                        />

                    </div>
                </div>
            </section>
            {/* sec 2 */}
            <div className="pd-padding">
                <Grid container spacing={5}>
                    <Grid item sm={7.5} xs={12}>
                        <div className='pd-sec2-left'>
                            {(property?.images && property?.images.length > 1) ? <>
                                <Slider2 sliderData={property?.images} />
                                <div >
                                    <Slider3 sliderData={property?.images} />
                                </div>
                            </> :
                                <>
                                    <img src={(property?.images && property?.images?.length > 0) ? property?.images[0] : noImg} alt='no img' width='100%' style={{ borderRadius: 20, maxHeight: 450 }} />
                                </>
                            }

                            {/* property stats  */}
                            <div className="pd-box mt-30">
                                <div className="pd-p-header">
                                    <div className="pd-heading">Property Information</div>
                                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                        <div className="pd-p-label">Property ID:</div>

                                        <span className='pd-p-val'>{property?._id}</span>
                                    </div>

                                </div>
                                <div className="pd-line"></div>
                                <div className="pd-stats">
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Property Type</div>
                                        <div className="pd-p-val">{property?.propertyInformation?.propertyType}</div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Bedrooms</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon1} alt="icon" className='pd-p-icon' />
                                            {property?.propertyInformation?.bedrooms}</div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Full Bathrooms</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon2} alt="icon" className='pd-p-icon' />
                                            {property?.propertyInformation?.bathrooms?.full ?? 0}
                                        </div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Half Bathrooms</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon2} alt="icon" className='pd-p-icon' />
                                            {property?.propertyInformation?.bathrooms?.half ?? 0}
                                        </div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label"> SqFt</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon3} alt="icon" className='pd-p-icon' />
                                            {property?.propertyInformation?.sqft}
                                        </div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label"> Garage</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon4} alt="icon" className='pd-p-icon' />
                                            {property?.propertyInformation?.garage}
                                        </div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Basement </div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon5} alt="icon" className='pd-p-icon' />
                                            {property?.propertyInformation?.basement}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="heading2 pd-m">All About This Property</div>
                            <ExpandableBox
                                label='Description'
                            >
                                {property?.description}
                            </ExpandableBox>
                            {/* address  */}
                            <ExpandableBox
                                label='Address'
                            >
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Location</div>
                                    <div className="pd-p-val">
                                        {property?.address?.street}
                                    </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Zip/Postal Code </div>
                                    <div className="pd-p-val">{property?.address?.zipCode} </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label">State </div>
                                    <div className="pd-p-val"> {property?.address?.state}</div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label">City </div>
                                    <div className="pd-p-val">{property?.address?.city} </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Country</div>
                                    <div className="pd-p-val"> {property?.country}</div>
                                </div>
                            </ExpandableBox>
                            <ExpandableBox label='Financing Options'>

                                <ul>
                                    {property?.financingOptions && property?.financingOptions?.length > 0 &&
                                        property?.financingOptions.map(val => (
                                            <li key={val} style={{ marginLeft: '10px' }}>
                                                <p className='pd-p-val' >{val}</p>

                                            </li>
                                        ))
                                    }
                                </ul>
                            </ExpandableBox>
                            <ExpandableBox label='Buying Process' >
                                <p className='pd-p-val' >{property?.buyingProcess}</p>
                            </ExpandableBox>

                        </div>

                    </Grid>
                    <Grid item sm={4.5} xs={12}>
                        <div className="pd-sec2-right">
                            <div className="pd-box pd-price-box" style={{ background: 'white' }} >
                                <div className='pd-type-box1'>
                                    <div className="heading1 pd-price" >{property?.price ? `$${property?.price?.toLocaleString('en-US')}` : 'TBD'}</div>
                                    <div className="pd-p-val"
                                        style={{
                                            color: 'gray',
                                            margin: '10px auto',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >{property?.ownerType ?? 'Assignment / Wholesale'}</div>
                                </div>
                                <div className="pd-line"></div>


                                <div className="pd-stats-item1">
                                    <div className="pd-p-label "> Initial Investment</div>
                                    <div className="pd-p-val ">
                                        {property?.price ? `$${((8 / 100) * property?.price).toLocaleString('eng-US')}` : '8%'}
                                    </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label ">Cap Rate </div>
                                    <div className="pd-p-val "> 8-10%</div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label "> Potential ROI </div>
                                    <div className="pd-p-val ">   {property?.price ? `$${((15 / 100) * property?.price).toLocaleString('eng-US')}` : '15%'}</div>
                                </div>

                                {property?.opportunityType === 'Flip Opportunity' && <>

                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label "> ARV </div>
                                        <div className="pd-p-val "> ${property?.ARV.toLocaleString('eng-US')}</div>
                                    </div>
                                </>}
                                {/* <div className="pd-stats-item1">
                                    <div className="pd-p-label "> Cash Flow Per Month </div>
                                    <div className="pd-p-val "> ${property?.assignment?.cashFlowPerMonth.toLocaleString('en-US')}</div>
                                </div> */}

                            </div>



                            {/* lower  */}
                            <div className="pd-box mt-40">
                                <div className="heading3 text-center">Lease Information</div>
                                <div className="pd-line"></div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Current Lease </div>
                                    <div className="pd-p-val">{property?.leaseInformation?.currentStatus} </div>
                                </div>
                                {property?.leaseInformation?.currentStatus === 'Yes' && <>
                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label">Lease Amount  </div>
                                        <div className="pd-p-val"> ${property?.leaseInformation?.leaseAmount ?? 0}</div>
                                    </div>
                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label">Lease Start Date  </div>
                                        <div className="pd-p-val"> {property?.leaseInformation?.leaseStartDate}</div>
                                    </div>
                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label"> Lease End Date </div>
                                        <div className="pd-p-val"> {property?.leaseInformation?.leaseEndDate}</div>
                                    </div>
                                </>}
                            </div>
                            {/* video  */}
                            <div className='text-center pd-video-sec'>
                                <VideoBox videoURL={property?.videoUrl} />
                                <div></div>
                                {property?.mapCoordinates && property?.mapCoordinates?.lat && property?.mapCoordinates?.lng &&
                                    <>
                                        <div className="heading3 text-center mt-40 mb-20">Map</div>
                                        <MapComponent
                                            height='200px'
                                            coords={[{
                                                marker: property?.mapCoordinates,
                                                status: property?.status
                                            }]} />
                                    </>
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            {/* sec3 */}
            <div>
                <section className="pd-sec3 padding">
                    <div className="heading2 mb-20">Similar Listings</div>

                </section>
                <Buyers
                    hide={true}
                />
            </div>
            <ApplyModal
                open={openModal}
                onClose={closeModal}
                property={property}
            />
            <Footer active='Off-Market Inventory' />
            <Loader isLoading={isLoading} />
        </div>
    )
}
