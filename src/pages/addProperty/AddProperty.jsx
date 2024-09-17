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
import { postData } from '../../config/apiCalls'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../components/loader/Loader'


const types = ['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential', 'Portfolio Package'];
const opportunityTypes = ['Buy & Hold', 'Flip Opportunity', 'Retail', 'Owner-Occupant', 'Just Remodeled']


const AddProperty = () => {
    const [files, setFiles] = useState([]);
    const [dataObj, setDataObj] = useState({
        title: '',
        price: 0,
        country: '',
        opportunityType: '',
        address: {
            location: '',
            street: '',
            zipCode: '',
            state: '',
            city: ''
        },
        status: 'New',
        assignment: {
            initialInvestment: 0,
            potentialRoi: 0,
            capRate: 0,
            cashFlowPerMonth: 0
        },
        leaseInformation: {
            currentStatus: '',
            leaseStartDate: '',
            leaseEndDate: ''
        },
        propertyInformation: {
            propertyType: '',
            bedrooms: 0,
            bathrooms: 0,
            sqft: '',
            garage: false,
            basement: false
        },
        description: '',
        images: [],
        videoUrl: '',
        mapUrl: '',
        financingOptions: '',
        investmentTerms: '',
        buyingProcess: '',
        propertyManagement: {
            managedByCompany: false,
            companyName: '',
            contactInformation: ''
        },
        lockboxCode: ''
    });
    const isLoggedIn = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false)

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



    const addData = (label, value, child) => {
        if (child) {
            dataObj[label][child] = value
        } else {
            dataObj[label] = value;
        }
        setDataObj({ ...dataObj })
    }

    const addData1 = (index, label, value, child) => {
        setProperties(prevProperties => {
            const newProperties = [...prevProperties];
            const property = { ...newProperties[index] };

            if (child) {
                property[label] = { ...property[label], [child]: value };
            } else {
                property[label] = value;
            }

            newProperties[index] = property;
            return newProperties;
        });
    };

    // for single property 
    const handleUploadPhotos = async (images) => {
        setIsLoading(true)
        if (images) {
            try {
                const formData = new FormData();
                images.forEach((img) => {
                    formData.append('files', img);
                });
                const response = await postData('upload-images', formData); // Replace with actual API route
                toast.success('Images uploaded successfully');
                console.log(response)
                addData('images', response?.images)
            } catch (error) {
                toast.error(error.message || 'Error in uploading Images');
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            toast.error("Select Image(s)")
        }
    };

    // for multiple properties 
    const handleUploadPhotos1 = async (images, index) => {
        setIsLoading(true)
        if (images) {
            try {
                const formData = new FormData();
                images.forEach((img) => {
                    formData.append('files', img);
                });
                const response = await postData('upload-images', formData); // Replace with actual API route
                toast.success('Images uploaded successfully');
                console.log(response)
                addData1(index, 'images', response?.images)
            } catch (error) {
                toast.error(error.message || 'Error in uploading Images');
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            toast.error("Select Image(s)")
        }
    }; 1

    // for single property 
    const handleUploadVideo = async (video) => {
        setIsLoading(true);
        console.log(video[0])
        if (video) {
            try {
                const formData = new FormData();
                formData.append('file', video[0]);
                const response = await postData('upload-video', formData); // Replace with actual API route
                toast.success('Video uploaded successfully');
                console.log(response)
                addData('videoUrl', response?.videoUrl)
            } catch (error) {
                toast.error(error.message || 'Error in uploading Video');
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            toast.error("Select Video")
        }
    }

    //for multiple properties
    const handleUploadVideo1 = async (video, index) => {
        setIsLoading(true);
        console.log(video[0])
        if (video) {
            try {
                const formData = new FormData();
                formData.append('file', video[0]);
                const response = await postData('upload-video', formData); // Replace with actual API route
                toast.success('Video uploaded successfully');
                console.log(response)
                addData1(index, 'videoUrl', response?.videoUrl)
            } catch (error) {
                toast.error(error.message || 'Error in uploading Video');
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            toast.error("Select Video")
        }
    }



    const handleSubmit = async () => {
        console.log(dataObj)
        setIsLoading(true);
        const {
            title,
            price,
            country,
            opportunityType,
            address: { street, zipCode, state, city },
            status,
            leaseInformation: { currentStatus },
            propertyInformation: { propertyType, bedrooms, bathrooms, sqft },
            images,
        } = dataObj;

        // Check if all values are available
        if (
            title &&
            price &&
            country &&
            opportunityType &&
            street &&
            zipCode &&
            state &&
            city &&
            status &&
            currentStatus &&
            propertyType &&
            bedrooms &&
            bathrooms &&
            sqft &&
            images
        ) {
            try {
                const response = await postData('create-single-property', dataObj);
                toast.success('Property added successfully');
                console.log(response);
            } catch (error) {
                toast.error(error.message || 'Error in adding property');
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            toast.error("Required Fields are missing!")
        }
    };

    const handleMultipleSubmit = async () => {
        console.log('multiple', properties);
        setIsLoading(true);

        // Check if all required fields are present for each property
        const allPropertiesValid = properties.every(property => {
            const {
                title,
                price,
                country,
                opportunityType,
                address: { street, zipCode, state, city },
                status,
                leaseInformation: { currentStatus },
                propertyInformation: { bedrooms, bathrooms, sqft },
                images,
            } = property;

            return (
                title &&
                price &&
                country &&
                opportunityType &&
                street &&
                zipCode &&
                state &&
                city &&
                status &&
                currentStatus &&
                bedrooms &&
                bathrooms &&
                sqft &&
                images
            );
        });

        if (true || allPropertiesValid) {
            try {
                // Send the request to the API endpoint for multiple properties
                const response = await postData('create-multiple-properties', { properties });
                toast.success('Properties added successfully');
                console.log(response);
            } catch (error) {
                toast.error(error.message || 'Error in adding properties');
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
            toast.error("Required Fields are missing for some properties!");
            console.log('not valid')
        }
    };







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
                                    onClick={() => addData('propertyInformation', type, 'propertyType')}
                                    className={dataObj.propertyInformation.propertyType === type ? 'add-property-type add-property-type-active' : 'add-property-type'}
                                >
                                    {type}
                                </div>
                            ))}
                    </div>
                    {dataObj?.propertyInformation?.propertyType === 'Portfolio Package' && <Grid container spacing={2}>
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
                    {dataObj?.propertyInformation?.propertyType !== 'Portfolio Package' &&
                        <>
                            <div className="heading3">Opportunity Type</div>
                            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                {opportunityTypes && opportunityTypes.length > 0 &&
                                    opportunityTypes.map(type => (
                                        <div key={type}
                                            onClick={() => addData('opportunityType', type)}
                                            className={dataObj.opportunityType === type ? 'add-property-type add-property-type-active' : 'add-property-type'}
                                        >
                                            {type}
                                        </div>
                                    ))}

                            </div>
                            {true && <>
                                <div className="heading3 mt-20 mb-20">Lockbox Code</div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputField
                                            placeholder='Lockbox Code'
                                            onChange={(e) => addData('lockboxCode', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </>}
                            <div className="heading3">Property Address</div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputField
                                        placeholder='Street Address'
                                        onChange={(e) => addData('address', e.target.value, 'street')}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        placeholder='City'
                                        onChange={(e) => addData('address', e.target.value, 'city')}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('address', e.target.value, 'zipCode')}
                                        placeholder='Zip Code'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('address', e.target.value, 'state')}
                                        placeholder='State'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('country', e.target.value)}
                                        placeholder='Country'
                                    />
                                </Grid>
                            </Grid>
                            <div className="heading3 mt-20">Details about your Listing</div>
                            <Grid container spacing={2}>
                                <Grid item sm={12} xs={12}>
                                    <InputField
                                        placeholder='Enter Property Title (e.g. Prime Residential Apartment)'
                                        onChange={(e) => addData('title', e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Current Status'
                                        options={['Owner-Occupied', 'Tenant-Occupied', 'Vacant', 'Eviction/Squatter', 'new']}
                                        onSelect={(val) => addData('currentStatus', val)}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Leased?'
                                        options={['Yes', 'No']}
                                        onSelect={val => addData('leaseInformation', val, 'currentStatus')}
                                    />
                                </Grid>
                                {dataObj.leaseInformation.currentStatus === 'Yes' && <>
                                    <Grid item sm={6} xs={12}>
                                        <InputField
                                            placeholder='Lease Start Date'
                                            onChange={(e) => addData('leaseInformation', e.target.value, 'leaseStartDate')}
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <InputField
                                            placeholder='Lease End Date'
                                            onChange={(e) => addData('leaseInformation', e.target.value, 'leaseEndDate')}
                                        />
                                    </Grid>
                                </>}
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        placeholder='Price'
                                        inputType='number'
                                        onChange={(e) => addData('price', e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('assignment', e.target.value, 'initialInvestment')}
                                        inputType='number'
                                        placeholder='Initial Investment / Down Payment'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('assignment', e.target.value, 'cashFlowPerMonth')}
                                        inputType='number'
                                        placeholder='Cash Flow Per Month'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('propertyInformation', e.target.value, 'sqft')}
                                        inputType='number'
                                        placeholder='Size (SqFt)'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('propertyInformation', e.target.value, 'bedrooms')}
                                        inputType='number'
                                        placeholder='# of Bedroom'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('propertyInformation', e.target.value, 'bathrooms')}
                                        inputType='number'
                                        placeholder='# of Bathrooms'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Basement'
                                        options={['Yes', 'No']}
                                        onSelect={(e) => addData('propertyInformation', e, 'basement')}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Garage'
                                        options={['Yes', 'No']}
                                        onSelect={(e) => addData('propertyInformation', e, 'garage')}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Property Management Company'
                                        options={['Yes', 'No']}
                                        onSelect={(e) => addData('propertyManagement', e, 'managedByCompany')}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        inputType='number'
                                        placeholder='Cash on Cash Return'
                                    />
                                </Grid>
                                {dataObj.propertyManagement.managedByCompany === 'Yes' &&
                                    <>
                                        <Grid item sm={6} xs={12}>
                                            <InputField
                                                placeholder='Management Company Name'
                                                onChange={(e) => addData('propertyManagement', e.target.value, 'companyName')}
                                            />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <InputField
                                                placeholder='Property Management Company Information'
                                                onChange={(e) => addData('propertyManagement', e.target.value, 'contactInformation')}
                                            />
                                        </Grid>
                                    </>}
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Owner Type'
                                        options={['Assignment / Wholesale', 'Corp / REIT / Fund', 'Private']}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Financing Types'
                                        options={['Cash', 'Conventional', 'FHA', 'Land Contract']}
                                        onSelect={val => addData('financingOptions', val)}
                                    />
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                    <InputField
                                        placeholder='Additional Information / Remarks'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FileUpload
                                        label='Upload Photos'
                                        onFilesChange={handleUploadPhotos}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FileUpload
                                        label='Upload Video'
                                        accept='video/*'
                                        multiple={false}
                                        onFilesChange={handleUploadVideo}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    }

                    {dataObj?.propertyInformation?.propertyType === 'Portfolio Package' && properties.map((property, index) => (
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
                                    <>
                                        <div className="heading3 mb-20">Opportunity Type</div>
                                        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                            {opportunityTypes && opportunityTypes.length > 0 &&
                                                opportunityTypes.map(type => (
                                                    <div key={type}
                                                        onClick={() => addData1(index, 'opportunityType', type)}
                                                        className={properties[index].opportunityType === type ? 'add-property-type add-property-type-active' : 'add-property-type'}
                                                    >
                                                        {type}
                                                    </div>
                                                ))}

                                        </div>
                                        {true && <>
                                            <div className="heading3 mt-20 mb-20">Lockbox Code</div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <InputField
                                                        placeholder='Lockbox Code'
                                                        onChange={(e) => addData1(index, 'lockboxCode', e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </>}
                                        <div className="heading3 mt-20 mb-20">Property Address</div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <InputField
                                                    placeholder='Street Address'
                                                    onChange={(e) => addData1(index, 'address', e.target.value, 'street')}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    placeholder='City'
                                                    onChange={(e) => addData1(index, 'address', e.target.value, 'city')}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'address', e.target.value, 'zipCode')}
                                                    placeholder='Zip Code'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'address', e.target.value, 'state')}
                                                    placeholder='State'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'country', e.target.value)}
                                                    placeholder='Country'
                                                />
                                            </Grid>
                                        </Grid>
                                        <div className="heading3 mt-20 mb-20">Details about your Listing</div>
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} xs={12}>
                                                <InputField
                                                    placeholder='Enter Property Title (e.g. Prime Residential Apartment)'
                                                    onChange={(e) => addData1(index, 'title', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Current Status'
                                                    options={['Owner-Occupied', 'Tenant-Occupied', 'Vacant', 'Eviction/Squatter', 'new']}
                                                    onSelect={(val) => addData1(index, 'currentStatus', val)}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Leased?'
                                                    options={['Yes', 'No']}
                                                    onSelect={val => addData1(index, 'leaseInformation', val, 'currentStatus')}
                                                />
                                            </Grid>
                                            {dataObj.leaseInformation.currentStatus === 'Yes' && <>
                                                <Grid item sm={6} xs={12}>
                                                    <InputField
                                                        placeholder='Lease Start Date'
                                                        onChange={(e) => addData1(index, 'leaseInformation', e.target.value, 'leaseStartDate')}
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <InputField
                                                        placeholder='Lease End Date'
                                                        onChange={(e) => addData1(index, 'leaseInformation', e.target.value, 'leaseEndDate')}
                                                    />
                                                </Grid>
                                            </>}
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    placeholder='Price'
                                                    inputType='number'
                                                    onChange={(e) => addData1(index, 'price', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'assignment', e.target.value, 'initialInvestment')}
                                                    inputType='number'
                                                    placeholder='Initial Investment / Down Payment'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'assignment', e.target.value, 'cashFlowPerMonth')}
                                                    inputType='number'
                                                    placeholder='Cash Flow Per Month'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'propertyInformation', e.target.value, 'sqft')}
                                                    inputType='number'
                                                    placeholder='Size (SqFt)'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'propertyInformation', e.target.value, 'bedrooms')}
                                                    inputType='number'
                                                    placeholder='# of Bedroom'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'propertyInformation', e.target.value, 'bathrooms')}
                                                    inputType='number'
                                                    placeholder='# of Bathrooms'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Basement'
                                                    options={['Yes', 'No']}
                                                    onSelect={(e) => addData1(index, 'propertyInformation', e, 'basement')}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Garage'
                                                    options={['Yes', 'No']}
                                                    onSelect={(e) => addData1(index, 'propertyInformation', e, 'garage')}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Property Management Company'
                                                    options={['Yes', 'No']}
                                                    onSelect={(e) => addData1(index, 'propertyManagement', e, 'managedByCompany')}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    inputType='number'
                                                    placeholder='Cash on Cash Return'
                                                />
                                            </Grid>
                                            {dataObj.propertyManagement.managedByCompany === 'Yes' &&
                                                <>
                                                    <Grid item sm={6} xs={12}>
                                                        <InputField
                                                            placeholder='Management Company Name'
                                                            onChange={(e) => addData1(index, 'propertyManagement', e.target.value, 'companyName')}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={6} xs={12}>
                                                        <InputField
                                                            placeholder='Property Management Company Information'
                                                            onChange={(e) => addData1(index, 'propertyManagement', e.target.value, 'contactInformation')}
                                                        />
                                                    </Grid>
                                                </>}
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Owner Type'
                                                    options={['Assignment / Wholesale', 'Corp / REIT / Fund', 'Private']}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Financing Types'
                                                    options={['Cash', 'Conventional', 'FHA', 'Land Contract']}
                                                    onSelect={val => addData1(index, 'financingOptions', val)}
                                                />
                                            </Grid>
                                            <Grid item sm={12} xs={12}>
                                                <InputField
                                                    placeholder='Additional Information / Remarks'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FileUpload
                                                    index={index}
                                                    label='Upload Photos'
                                                    onFilesChange={handleUploadPhotos1}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FileUpload
                                                    label='Upload Video'
                                                    accept='video/*'
                                                    index={index}
                                                    multiple={false}
                                                    onFilesChange={handleUploadVideo1}
                                                />
                                            </Grid>
                                        </Grid>
                                    </>
                                </div>
                            )}
                        </div>
                    ))}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Btn
                                    label='Submit'
                                    onClick={dataObj?.propertyInformation?.propertyType === 'Portfolio Package' ? handleMultipleSubmit : handleSubmit}
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
            <Loader isLoading={isLoading} />
            <ToastContainer />

        </div>
    )
}

export default AddProperty;
