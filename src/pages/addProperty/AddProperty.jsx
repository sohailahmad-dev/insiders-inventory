import React, { useEffect, useState } from 'react'
import './AddProperty.css'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
import InputField from '../../components/inputField/InputField'
import SelectBox from '../../components/selectBox/SelectBox'
import FileUpload from '../../components/fileInput/FileUpload'
import Btn from '../../components/btn/Btn'
import CheckBox from '../../components/checkBox1/CheckBox'
import add from '../../assets/imgs/add.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/UseAuth'
import signImg from '../../assets/imgs/signImg.png'
import Login from '../login/Login'
import AddPropertyForm from './AddPropertyForm'


const types = ['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential', 'Portfolio Package'];

const AddProperty = () => {

    let [dataObj, setDataObj] = useState({});
    const isLoggedIn = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const [properties, setProperties] = useState([{}]);
    const [formVisibility, setFormVisibility] = useState([true]);

    const addProperty = () => {
        setProperties([...properties, {}]);
        setFormVisibility([...formVisibility, true]);
    };

    const toggleFormVisibility = (index) => {
        const updatedVisibility = formVisibility.map((visible, i) =>
            i === index ? !visible : visible
        );
        setFormVisibility(updatedVisibility);
    };



    const addData = (label, value) => {
        dataObj[label] = value;
        setDataObj({ ...dataObj });
    }





    return (
        <div>
            {location.state !== 'AddProperty' && <NavBar active='Off-Market Inventory' />}
            {/* sec 1 hero  */}
            {location.state !== 'AddProperty' && <div className="h-hero">
                <div className="h-heading"> <span> Sell and Buy </span> Property</div>
                <div className="h-text">Unlock Exclusive Opportunities at Insider's Inventory, specializing in Buy & Hold, Owner-Occupied Retail, and Lucrative Flip Ventures. Discover your path to profitable real estate investments today</div>
            </div>}
            {/* sec 2  */}
            {isLoggedIn ?
                <section className="add-property-sec-2 padding">
                    <div className="heading2 mb-30">Add a Property</div>

                    <div className="heading3">Property Type</div>
                    <div className="add-property-types">
                        {types && types.length > 0 &&
                            types.map(type => (
                                <div key={type}
                                    onClick={() => addData('property_type', type)}
                                    className={dataObj.property_type === type ? 'add-property-type add-property-type-active' : 'add-property-type'}
                                >
                                    {type}
                                </div>
                            ))}
                    </div>
                    {dataObj.property_type === 'Portfolio Package' && <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <SelectBox
                                label='No. of Units'
                                options={[1, 2, 3, 4, 5]}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <InputField
                                placeholder='Target Area'
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <InputField
                                placeholder='ROI'
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <InputField
                                placeholder='Price'
                            />
                        </Grid>
                    </Grid>}
                    {dataObj.property_type !== 'Portfolio Package' &&
                        <AddPropertyForm />
                    }

                    {dataObj.property_type === 'Portfolio Package' && properties.map((property, index) => (
                        <div key={index} style={{ width: '100%' }}>
                            <div className='add-property-box'>
                                <div className="add-property-box-inner">
                                    <div className='heading3'>Add a Property</div>
                                    <div onClick={() => toggleFormVisibility(index)}>
                                        {formVisibility[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </div>
                                </div>
                                <img src={add} alt="add-btn" onClick={addProperty} />
                            </div>
                            {formVisibility[index] && (
                                <div style={{ textAlign: 'center', }} >
                                    <AddPropertyForm />
                                </div>
                            )}
                        </div>
                    ))}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Btn
                                    label='Submit'
                                />
                            </div>
                        </Grid>
                    </Grid>
                </section>
                :
                <div>
                    <Login hide={true} />
                </div>
            }


            {location.state !== 'AddProperty' && <Footer hideEmail={true} active='Off-Market Inventory' />}
        </div>
    )
}

export default AddProperty;
