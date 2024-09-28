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
import map1 from '../../assets/imgs/map1.png'
import videoImg from '../../assets/imgs/videoImg.png'
import Card from '../../components/card/Card'
import Properties from '../../static/json/Properties'
import { useLocation } from 'react-router-dom'
import ApplyModal from './applyModal/ApplyModal'
import VideoBox from '../../components/videoBox/VideoBox'
import { Buyers } from '../buyers/Buyers'
import useAuthCheck from '../../hooks/UseAuthCheck'


const type = 'Assignment'

export default function PropertyDetail() {
    useAuthCheck();
    let [properties, setProperties] = useState([]);
    let [property, setProperty] = useState({});
    let [openModal, setOpenModal] = useState(false);
    const location = useLocation();


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

    console.log(location.state)

    return (
        <div>
            <NavBar active='Off-Market Inventory' />
            {/* sec 1  */}
            <section className="pd-padding">
                <div className="pd-header">
                    <div>
                        <div className="heading1">{property?.title ?? 'Luxury Apartment'}</div>
                        <div className="card-item-lcation">
                            <img src={locationIcon} alt="location-icon" />
                            {property?.country ?? 'Australia'}</div>
                    </div>
                    <div className='pd-header-right' >
                        <Btn
                            label='Schedule a Showing'
                            style={{
                                backgroundColor: 'transparent',
                                color: '#4DAD49'
                            }}
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
                            <Slider2 sliderData={property?.images} />
                            <div >
                                <Slider3 sliderData={property?.images} />
                            </div>
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
                                        <div className="pd-p-label"> Bathrooms</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon2} alt="icon" className='pd-p-icon' />
                                            {property?.propertyInformation?.bathrooms}
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
                                {/* <p className='pd-p-val'>
                                    This heritage home in Lorain OH has been Majorly Renovated. It’s beautiful inside, structurally sound, and set to appreciate.
                                    <br />
                                    Renovations include:
                                    <br />
                                    * Updated kitchen: New tile kitchen backsplash, new kitchen light fixture, new kitchen range hood, new dishwasher
                                    <br />* Updated bathroom: new bathroom accessories, new tile show surround, new bathroom accent tile, new shower tile, new bathroom light fixture,  install new bathroom fan with exterior vent
                                    <br />* Lots of $$$ spent to reinforce foundation per structural engineer
                                    <br />* 3 new windows
                                    <br />* new hot water tank
                                    <br />* new baseboard heater
                                    upstairs
                                    <br />
                                    * repaired attic rafters
                                    <br />* new GFCI outlets, repaired drywall, new lock sets
                                    <br />* all new glass block windows.
                                    Exterior: repaired siding, repaired lattice around front steps, pressure washed exterior, painted foundation, floor and porch paint, exterior paint, landscaped perimeter of house for moisture protection.
                                </p> */}
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
                                <p className='pd-p-val' >{property?.financingOptions}</p>
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
                                    <div className="heading1 pd-price" >${property?.price?.toLocaleString('en-US')}</div>
                                    <div className="pd-p-val"
                                        style={{
                                            color: 'lightgray',
                                            margin: '10px auto',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >{property?.ownerType ?? 'Assignment'}</div>
                                </div>
                                <div className="pd-line"></div>

                                {property?.opportunityType === 'Buy & Hold' && <>
                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label "> Initial Investment</div>
                                        <div className="pd-p-val ">
                                            ${((8 / 100) * property?.price).toFixed(0).toLocaleString('eng-US')}
                                        </div>
                                    </div>
                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label ">Cap Rate </div>
                                        <div className="pd-p-val "> ${((8 / 100) * property?.price).toFixed(0).toLocaleString('eng-US')}</div>
                                    </div>

                                </>}
                                {property?.opportunityType === 'Flip Opportunity' && <>
                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label "> Potential ROI </div>
                                        <div className="pd-p-val "> ${((15 / 100) * property?.price).toFixed(0).toLocaleString('eng-US')}</div>
                                    </div>
                                    <div className="pd-stats-item1">
                                        <div className="pd-p-label "> ARV </div>
                                        <div className="pd-p-val "> ${property?.ARV.toLocaleString('eng-US')}</div>
                                    </div>
                                </>}
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label "> Cash Flow Per Month </div>
                                    <div className="pd-p-val "> ${property?.assignment?.cashFlowPerMonth}</div>
                                </div>



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
                                <img className='mt-20' src={map1} alt='map1' />
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
        </div>
    )
}
