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




export default function PropertyDetail() {
    let [properties, setProperties] = useState([]);
    let [openModal, setOpenModal] = useState(false);
    const location = useLocation();

    const closeModal = () => {
        setOpenModal(false)
    }


    useEffect(() => {
        setProperties(Properties.slice(0, 6))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <div>
            <NavBar active='Off-Market Inventory' />
            {/* sec 1  */}
            <section className="pd-padding">
                <div className="pd-header">
                    <div>
                        <div className="heading1">Luxury Apartment</div>
                        <div className="card-item-lcation">
                            <img src={locationIcon} alt="location-icon" />
                            Australia</div>
                    </div>
                    <div className='pd-header-right' >
                        <Btn
                            label='Submit An Offer'
                            onClick={() => setOpenModal(true)}
                        />
                        <Btn
                            label='Book A Call'
                        />
                    </div>
                </div>
            </section>
            {/* sec 2 */}
            <div className="pd-padding">
                <Grid container spacing={5}>
                    <Grid item sm={7.5} xs={12}>
                        <div className='pd-sec2-left'>
                            <Slider2 />
                            <div >
                                <Slider3 />
                            </div>
                            {/* property stats  */}
                            <div className="pd-box mt-30">
                                <div className="pd-p-header">
                                    <div className="pd-heading">Overview</div>
                                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                        <div className="pd-p-label">Property ID:</div>

                                        <span className='pd-p-val'>Z456</span>
                                    </div>

                                </div>
                                <div className="pd-line"></div>
                                <div className="pd-stats">
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Property Type</div>
                                        <div className="pd-p-val">Apartment</div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Bedrooms</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon1} alt="icon" className='pd-p-icon' />
                                            3</div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label"> Bathrooms</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon2} alt="icon" className='pd-p-icon' />
                                            2
                                        </div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label"> SqFt</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon3} alt="icon" className='pd-p-icon' />
                                            2560
                                        </div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label"> Garage</div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon4} alt="icon" className='pd-p-icon' />
                                            Yes
                                        </div>
                                    </div>
                                    <div className="pd-stats-item">
                                        <div className="pd-p-label">Basement </div>
                                        <div className="pd-p-val">
                                            <img src={pdIcon5} alt="icon" className='pd-p-icon' />
                                            No
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="heading2 pd-m">All About This Property</div>
                            <ExpandableBox
                                label='Description'
                            >
                                <p className='pd-p-val'>
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
                                </p>
                            </ExpandableBox>
                            {/* address  */}
                            <ExpandableBox
                                label='Address'
                            >
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Location</div>
                                    <div className="pd-p-val">
                                        194 Mercer Street
                                    </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Zip/Postal Code </div>
                                    <div className="pd-p-val">OH 11002 </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label">State </div>
                                    <div className="pd-p-val"> New York</div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label">City </div>
                                    <div className="pd-p-val">New York </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Country</div>
                                    <div className="pd-p-val"> United States</div>
                                </div>
                            </ExpandableBox>
                            <ExpandableBox label='Financing Options'>
                                <p className='pd-p-val' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, sapiente ratione. Dicta fugit nemo eos, labore tempora architecto reiciendis ipsum provident accusamus, quia eius totam doloremque quisquam cupiditate eaque sunt!</p>
                            </ExpandableBox>
                            <ExpandableBox label='Investment Terms' >
                                <p className='pd-p-val' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, sapiente ratione. Dicta fugit nemo eos, labore tempora architecto reiciendis ipsum provident accusamus, quia eius totam doloremque quisquam cupiditate eaque sunt!</p>
                            </ExpandableBox>
                            <ExpandableBox label='Buying Process' >
                                <p className='pd-p-val' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, sapiente ratione. Dicta fugit nemo eos, labore tempora architecto reiciendis ipsum provident accusamus, quia eius totam doloremque quisquam cupiditate eaque sunt!</p>
                            </ExpandableBox>

                        </div>

                    </Grid>
                    <Grid item sm={4.5} xs={12}>
                        <div className="pd-sec2-right">
                            <div className="pd-box pd-price-box">
                                <div className="pd-heading">Purchase Price</div>
                                <div className="heading1 pd-price">$112,000</div>
                                <div className="pd-line"></div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Initial Investment</div>
                                    <div className="pd-p-val">
                                        $22400
                                    </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Potential ROI </div>
                                    <div className="pd-p-val"> 15% </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label">Cap Rate </div>
                                    <div className="pd-p-val"> 9%</div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Cash Flow Per Month </div>
                                    <div className="pd-p-val"> $220</div>
                                </div>

                            </div>
                            {/* lower  */}
                            <div className="pd-box mt-40">
                                <div className="heading3 text-center">Property Information</div>
                                <div className="pd-line"></div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Current Status </div>
                                    <div className="pd-p-val">Occupied </div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label">Lease Start Date  </div>
                                    <div className="pd-p-val"> 06/01/2024</div>
                                </div>
                                <div className="pd-stats-item1">
                                    <div className="pd-p-label"> Lease End Date </div>
                                    <div className="pd-p-val"> 05/31/2025</div>
                                </div>
                            </div>
                            {/* video  */}
                            <div className='text-center pd-video-sec'>
                                <div className="heading3 text-center mt-40 mb-20">Video</div>
                                <img src={videoImg} alt="img" />
                                <img className='mt-20' src={map1} alt='map1' />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            {/* sec3 */}
            <section className="pd-sec3 pd-padding">
                <div className="heading2 mb-20">Similar Listings</div>
                <Grid container spacing={3}>
                    {properties && properties.length > 0 &&
                        properties.map(item => (
                            <Grid item xl={3} lg={4} md={4} sm={4} xs={12} key={Math.random()} >
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
            <ApplyModal
                open={openModal}
                onClose={closeModal}
            />
            <Footer active='Off-Market Inventory' />
        </div>
    )
}
