import React, { useEffect, useState } from 'react'
import './AddProperty.css'
import NavBar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Grid } from '@mui/material'
import InputField from '../../components/inputField/InputField'
import SelectBox from '../../components/selectBox/SelectBox'
import FileUpload from '../../components/fileInput/FileUpload'
import Btn from '../../components/btn/Btn'
import add from '../../assets/imgs/add.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/UseAuth'
import Login from '../login/Login'
import { getData, postData, putData } from '../../config/apiCalls'
import Loader from '../../components/loader/Loader'
import toast from 'react-hot-toast'
import useAuthCheck from '../../hooks/UseAuthCheck'
import VideoBox from '../../components/videoBox/VideoBox'
import MapModal from './MapModal'
import SearchPlaceMap from '../../components/searchPlaceMap/SearchPlaceMap'
import useScrollToTop from '../../hooks/UseScrollToTop'
import countries from '../../static/json/Countries'
import CheckBox from '../../components/checkBox1/CheckBox'



const opportunityTypes = ['Buy & Hold', 'Flip Opportunity', 'Retail', 'Owner-Occupant', 'Newly Renovated']


const AddProperty = () => {
    useScrollToTop();

    let [types, setTypes] = useState(['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential', 'Portfolio Package'])
    const [files, setFiles] = useState([]);
    const [dataObj, setDataObj] = useState({
        title: '',
        price: '',
        tbd: false,
        country: '',
        opportunityType: [],
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
            leaseEndDate: '',
            leaseAmount: 0,
        },
        propertyInformation: {
            propertyType: '',
            bedrooms: 0,
            bathrooms: {
                full: 0,
                half: 0,
            },
            sqft: '',
            garage: false,
            basement: false
        },
        description: '',
        images: [],
        videoUrl: '',
        mapCoordinates: {
            lat: '',
            lng: '',
        },
        financingOptions: [],
        investmentTerms: '',
        buyingProcess: '',
        propertyManagement: {
            managedByCompany: false,
            companyName: '',
            contactInformation: ''
        },
        lockboxCode: '',
        user: ''
    });
    const isLoggedIn = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    let [user, setUser] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [openModal, setOpenModal] = useState(false)

    const [properties, setProperties] = useState([{
        title: '',
        price: '',
        tbd: false,
        country: '',
        opportunityType: [],
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
            leaseEndDate: '',
            leaseAmount: 0,
        },
        propertyInformation: {
            propertyType: '',
            bedrooms: 0,
            bathrooms: {
                full: 0,
                half: 0,
            },
            sqft: '',
            garage: false,
            basement: false
        },
        description: '',
        images: [],
        videoUrl: '',
        mapCoordinates: {
            lat: '',
            lng: '',
        },
        financingOptions: [],
        investmentTerms: '',
        buyingProcess: '',
        propertyManagement: {
            managedByCompany: false,
            companyName: '',
            contactInformation: ''
        },
        lockboxCode: ''
    }]);
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



    const addData = (label, value, child, grandChild) => {
        if (label === 'opportunityType') {
            if (dataObj[label].includes(value)) {
                dataObj[label] = dataObj[label].filter(item => item !== value);
            } else {
                dataObj[label].push(value);
            }
        } else if (grandChild) {
            dataObj[label][child][grandChild] = value;
            console.log('inn grandchild')
        } else if (child) {
            dataObj[label][child] = value;
        }
        else {
            dataObj[label] = value;
        }
        setDataObj({ ...dataObj });
    };

    const addData1 = (index, label, value, child, grandChild) => {
        setProperties(prevProperties => {
            const newProperties = [...prevProperties];
            const property = { ...newProperties[index] };

            if (label === 'opportunityType') {
                // Ensure that property[label] is an array, even if it's undefined or null
                property[label] = Array.isArray(property[label]) ? [...property[label]] : [];

                // Toggle value: remove if it exists, otherwise add it
                if (property[label].includes(value)) {
                    property[label] = property[label].filter(item => item !== value);
                } else {
                    property[label].push(value);
                }
            } else if (grandChild) {
                dataObj[label][child][grandChild] = value;
            }
            else if (child) {
                // Handle nested child properties
                property[label] = { ...property[label], [child]: value };
            } else {
                // Handle simple property update
                property[label] = value;
            }

            // Update the new property in the properties array
            newProperties[index] = property;

            // Return the updated properties array to update the state
            return newProperties;
        });
    };


    // for single property 
    const handleUploadPhotos = async (images) => {
        setIsLoading(true)
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
    };

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
        setIsLoading(true);
        const {
            opportunityType
        } = dataObj;

        // Check if all values are available
        if (
            opportunityType
        ) {
            try {
                console.log(dataObj)
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

    const handleSubmitUserProperty = async () => {
        setIsLoading(true);
        const {
            opportunityType,
            user
        } = dataObj;

        // Check if all values are available
        if (
            opportunityType &&
            user
        ) {
            try {
                const response = await postData('admin/create/user/properties', dataObj);
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

        // Add 'New' status to each property
        const updatedProperties = properties.map(property => ({
            ...property,
            status: 'New',
            propertyInformation: {
                ...property.propertyInformation,
                propertyType: 'Portfolio Package'
            }
        }));

        // Check if all required fields are present for each updated property
        const allPropertiesValid = updatedProperties.every(property => {
            const {
                opportunityType
            } = property;

            return (
                opportunityType
            );
        });

        if (allPropertiesValid) {
            try {
                // Send the request to the API endpoint for multiple properties
                const response = await postData('create-multiple-properties', { properties: updatedProperties });
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
        }
    };

    const updateProperty = async () => {
        setIsLoading(true);
        const {
            opportunityType
        } = dataObj;

        // Check if all values are available
        if (
            opportunityType
        ) {
            try {
                const response = await putData(`property/${dataObj?._id}`, dataObj);
                toast.success(response?.message ?? 'Property updated');
            } catch (error) {
                toast.error(error.message || 'Error in updating property');
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            toast.error("Required Fields are missing!")
        }
    };


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser)
        }
        if (location?.state?.isEdit) {
            setTypes(['Condo', 'Commercial', 'Multi-family Residential', 'Single-Family Residential'])
            setDataObj(location?.state?.property)
            console.log(location?.state)
        }

        if (location?.state?.submitUserProperty) {

        }
    }, [])

    let [users, setUsers] = useState([])
    let [userEmails, setUserEmails] = useState([])



    function getUsers() {
        setIsLoading(true)

        getData('users').then((response) => {
            setIsLoading(false)
            setUsers(response?.users)
            const emails = response?.users?.map(user => user.email);
            const sortedEmails = emails.sort();
            setUserEmails(sortedEmails)

        }
        ).catch((err) => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/LoginSignup', { state: 'Submit Property' });
            return;
        }
    }, [])

    return (
        <div>
            {location?.state?.path !== 'AddProperty' && <NavBar active='Submit an Off-Market Property' />}
            {/* sec 1 hero  */}
            {location?.state?.path !== 'AddProperty' && <div className="h-hero">
                <div className="h-heading">  Sell and Buy <span>  Property</span></div>
                <div className="h-text">Unlock Exclusive Opportunities at Insider's Inventory, specializing in Buy & Hold, Owner-Occupied Retail, and Lucrative Flip Ventures. Discover your path to profitable real estate investments today</div>
            </div>}
            {/* sec 2  */}
            {isLoggedIn ?
                <section className="add-property-sec-2 padding">
                    {location?.state?.isEdit || <>

                        {location?.state?.submitUserProperty &&
                            <Grid container spacing={2}>
                                <Grid item sm={7} xs={12}>
                                    <SelectBox
                                        label='Select User'
                                        options={userEmails}
                                        onSelect={val => {
                                            let usr = users.filter(e => e.email === val)
                                            addData('user', usr[0]?._id)
                                        }}
                                        defaultValue={dataObj?.email}
                                    />
                                </Grid>
                            </Grid>
                        }
                        <div className="heading2 mb-30 mt-30">Add a Property</div>
                        <div className="heading3">Property Type</div>
                        <div className="add-property-types">
                            {types && types.length > 0 &&
                                types.map(type => (
                                    <div key={type}
                                        onClick={() => addData('propertyInformation', type, 'propertyType')}
                                        className={dataObj?.propertyInformation.propertyType === type ? 'add-property-type add-property-type-active' : 'add-property-type'}
                                    >
                                        {type}
                                    </div>
                                ))}
                        </div>
                    </>}

                    {dataObj?.propertyInformation?.propertyType === 'Portfolio Package' && <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <InputField
                                placeholder='No. of Units'
                                inputType='number'
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
                                            className={dataObj?.opportunityType?.includes(type) ? 'add-property-type add-property-type-active' : 'add-property-type'}
                                        >
                                            {type}
                                        </div>
                                    ))}

                            </div>
                            {user?.role === 'Admin' && <>
                                <div className="heading3">Lockbox Code</div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputField
                                            placeholder='Lockbox Code'
                                            onChange={(e) => addData('lockboxCode', e.target.value)}
                                            value={dataObj?.lockboxCode}
                                        />
                                    </Grid>
                                </Grid>
                            </>}
                            <>
                                <div className="heading3">Price</div>
                                <Grid container spacing={2}>
                                    {dataObj?.tbd || <Grid item sm={6} xs={12}>
                                        <InputField
                                            placeholder='Price'
                                            inputType='number'
                                            onChange={(e) => addData('price', e.target.value)}
                                            value={dataObj?.price}
                                        />
                                    </Grid>}
                                    <Grid item sm={6} xs={12}>
                                        <div className='addProperty-tbd'>
                                            <CheckBox
                                                label='TBD (To Be Determined)'
                                                onChange={(e) => addData('tbd', e.target.checked)}
                                            />
                                        </div>
                                    </Grid>

                                </Grid>
                            </>
                            <div className="heading3">Property Address</div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputField
                                        placeholder='Street Address'
                                        onChange={(e) => addData('address', e.target.value, 'street')}
                                        value={dataObj?.address?.street}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        placeholder='City'
                                        onChange={(e) => addData('address', e.target.value, 'city')}
                                        value={dataObj?.address?.city}
                                    />
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('address', e.target.value, 'state')}
                                        placeholder='State'
                                        value={dataObj?.address?.state}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('address', e.target.value, 'zipCode')}
                                        placeholder='Zip Code'
                                        value={dataObj?.address?.zipCode}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Country'
                                        options={countries}
                                        onSelect={(e) => addData('country', e)}
                                        defaultValue={dataObj?.country}
                                    />
                                </Grid>
                                <>
                                    <Grid item sm={8} xs={12}>
                                        <div className="inputField-label">Select Location on Map </div>
                                        <SearchPlaceMap
                                            center={dataObj?.mapCoordinates}
                                            onSelect={coord => {
                                                dataObj.mapCoordinates = coord;
                                                setDataObj({ ...dataObj })
                                            }}
                                        />
                                    </Grid>
                                </>
                            </Grid>
                            <div className="heading3 mt-20">Details about your Listing</div>
                            <Grid container spacing={2}>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Current Status'
                                        options={['Owner-Occupied', 'Tenant-Occupied', 'Vacant', 'Eviction/Squatter']}
                                        onSelect={(val) => addData('currentStatus', val)}
                                        defaultValue={dataObj?.currentStatus}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Leased?'
                                        options={['Yes', 'No']}
                                        onSelect={val => addData('leaseInformation', val, 'currentStatus')}
                                        defaultValue={dataObj?.leaseInformation?.currentStatus}
                                    />
                                </Grid>
                                {dataObj?.leaseInformation?.currentStatus === 'Yes' && <>
                                    <Grid item sm={6} xs={12}>
                                        <InputField
                                            placeholder='Lease Amount'
                                            inputType='number'
                                            onChange={(e) => addData('leaseInformation', e.target.value, 'leaseAmount')}
                                            value={dataObj?.leaseInformation?.leaseAmount}
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <InputField
                                            placeholder='Lease Start Date'
                                            onChange={(e) => addData('leaseInformation', e.target.value, 'leaseStartDate')}
                                            inputType='date'
                                            value={dataObj?.leaseInformation?.leaseStartDate}
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <InputField
                                            placeholder='Lease End Date'
                                            inputType='date'
                                            onChange={(e) => addData('leaseInformation', e.target.value, 'leaseEndDate')}
                                            value={dataObj?.leaseInformation?.leaseEndDate}
                                        />
                                    </Grid>
                                </>}
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('propertyInformation', e.target.value, 'sqft')}
                                        inputType='number'
                                        placeholder='Size (SqFt)'
                                        value={dataObj?.assignment?.sqft}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('propertyInformation', e.target.value, 'bedrooms')}
                                        inputType='number'
                                        placeholder='# of Bedrooms'
                                        value={dataObj?.propertyInformation?.bedrooms}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('propertyInformation', e.target.value, 'bathrooms', 'full')}
                                        inputType='number'
                                        placeholder='# of Full Bathrooms'
                                        value={dataObj?.propertyInformation?.bathrooms?.full}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={(e) => addData('propertyInformation', e.target.value, 'bathrooms', 'half')}
                                        inputType='number'
                                        placeholder='# of Half Bathrooms'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Basement?'
                                        options={['Yes', 'No']}
                                        onSelect={(e) => addData('propertyInformation', e, 'basement')}
                                        defaultValue={dataObj?.propertyInformation?.basement}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Garage?'
                                        options={['Yes', 'No']}
                                        onSelect={(e) => addData('propertyInformation', e, 'garage')}
                                        defaultValue={dataObj?.propertyInformation?.garage}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Is there a Property Management Company?'
                                        options={['Yes', 'No']}
                                        onSelect={(e) => addData('propertyManagement', e, 'managedByCompany')}
                                        defaultValue={dataObj?.propertyManagement?.managedByCompany}
                                    />
                                </Grid>


                                {dataObj?.propertyManagement?.managedByCompany === 'Yes' &&
                                    <>
                                        <Grid item sm={6} xs={12}>
                                            <InputField
                                                placeholder='Management Company Name'
                                                onChange={(e) => addData('propertyManagement', e.target.value, 'companyName')}
                                                value={dataObj?.propertyManagement?.companyName}
                                            />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <InputField
                                                placeholder='Property Management Company Information'
                                                onChange={(e) => addData('propertyManagement', e.target.value, 'contactInformation')}
                                                value={dataObj?.propertyManagement?.contactInformation}
                                            />
                                        </Grid>
                                    </>}
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Owner Type'
                                        options={['Assignment / Wholesale', 'Corp / REIT / Fund', 'Private']}
                                        onSelect={e => addData("ownerType", e)}
                                        defaultValue={dataObj?.ownerType}

                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        multiSelect={true}
                                        label='Financing Types'
                                        options={['Cash', 'Conventional', 'FHA', 'Land Contract']}
                                        onSelect={val => addData('financingOptions', val)}
                                        defaultValue={dataObj?.financingOptions}

                                    />
                                </Grid>
                                {dataObj?.opportunityType?.includes('Flip Opportunity') && <Grid item sm={6} xs={12}>
                                    <InputField
                                        placeholder='ARV'
                                        onChange={(e) => addData('ARV', e.target.value)}
                                        value={dataObj?.ARV}
                                    />
                                </Grid>}
                                <Grid item sm={12} xs={12}>
                                    <InputField
                                        placeholder='Description/Remarks'
                                        onChange={(e) => addData('description', e.target.value)}
                                        isTextarea={true}
                                        value={dataObj?.description}
                                    />
                                </Grid>
                                {/* <Grid item sm={12} xs={12}>
                                    <InputField
                                        placeholder='Financing Options'
                                        onChange={(e) => addData('financingOptions', e.target.value)}
                                        isTextarea={true}
                                    />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <FileUpload
                                        label='Upload Photo Files'
                                        onFilesChange={handleUploadPhotos}
                                    />
                                </Grid>
                                {dataObj?.images?.length > 0 ?
                                    dataObj?.images?.map((e, i) => (
                                        <div className="category-img">
                                            <img src={e} alt="img" />
                                        </div>
                                    )) :
                                    <div className='pd-p-val mt-10' style={{ marginLeft: 20 }} >No Image(s) Uploaded</div>
                                }
                                <Grid item xs={12}>
                                    <FileUpload
                                        label='Upload Video File'
                                        accept='video/*'
                                        multiple={false}
                                        onFilesChange={handleUploadVideo}
                                    />
                                </Grid>
                                {dataObj?.videoUrl ?
                                    <div className='text-center pd-video-sec'>
                                        <VideoBox videoURL={dataObj?.videoUrl} />
                                    </div> : <div className='pd-p-val mt-10' style={{ marginLeft: 20 }} >No Video Uploaded</div>
                                }
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
                                <div >
                                    <>
                                        <div className="heading3 mb-20">Opportunity Type</div>
                                        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                            {opportunityTypes && opportunityTypes.length > 0 &&
                                                opportunityTypes.map(type => (
                                                    <div key={type}
                                                        onClick={() => addData1(index, 'opportunityType', type)}
                                                        className={properties[index]?.opportunityType?.includes(type) ? 'add-property-type add-property-type-active' : 'add-property-type'}
                                                    >
                                                        {type}
                                                    </div>
                                                ))}

                                        </div>
                                        {user?.role === 'Admin' && <>
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
                                        <>
                                            <div className="heading3 mt-20">Price</div>
                                            <Grid container spacing={2}>

                                                {properties[index]?.tbd || <Grid item sm={6} xs={12}>

                                                    <InputField
                                                        placeholder='Price'
                                                        inputType='number'
                                                        onChange={(e) => addData1(index, 'price', e.target.value)}
                                                    />

                                                </Grid>}
                                                <Grid item sm={6} xs={12}>
                                                    <div className='addProperty-tbd'>
                                                        <CheckBox
                                                            label='TBD (To Be Determined)'
                                                            onChange={(e) => addData1(index, 'tbd', e.target.checked)}
                                                        />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </>
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
                                                    onChange={(e) => addData1(index, 'address', e.target.value, 'state')}
                                                    placeholder='State'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'address', e.target.value, 'zipCode')}
                                                    placeholder='Zip Code'
                                                />
                                            </Grid>

                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Country'
                                                    options={countries}
                                                    onSelect={(e) => addData1(index, 'country', e)}
                                                />
                                            </Grid>
                                            <>
                                                <Grid item sm={8} xs={12}>
                                                    <div className="inputField-label">Select Location on Map </div>
                                                    <SearchPlaceMap
                                                        onSelect={coord => {
                                                            const updatedProperties = [...properties];

                                                            updatedProperties[index] = {
                                                                ...updatedProperties[index],
                                                                mapCoordinates: coord
                                                            };

                                                            setProperties(updatedProperties);
                                                        }}

                                                    />
                                                </Grid>
                                            </>
                                        </Grid>
                                        <div className="heading3 mt-20 mb-20">Details about your Listing</div>
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Current Status'
                                                    options={['Owner-Occupied', 'Tenant-Occupied', 'Vacant', 'Eviction/Squatter']}
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
                                            {properties[index]?.leaseInformation?.currentStatus === 'Yes' && <>
                                                <Grid item sm={6} xs={12}>
                                                    <InputField
                                                        placeholder='Lease Amount'
                                                        inputType='number'
                                                        onChange={(e) => addData1(index, 'leaseInformation', e.target.value, 'leaseAmount')}
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <InputField
                                                        placeholder='Lease Start Date'
                                                        inputType='date'
                                                        onChange={(e) => addData1(index, 'leaseInformation', e.target.value, 'leaseStartDate')}
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <InputField
                                                        inputType='date'
                                                        placeholder='Lease End Date'
                                                        onChange={(e) => addData1(index, 'leaseInformation', e.target.value, 'leaseEndDate')}
                                                    />
                                                </Grid>
                                            </>}
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
                                                    placeholder='# of Bedrooms'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'propertyInformation', e.target.value, 'bathrooms', 'full')}
                                                    inputType='number'
                                                    placeholder='# of Full Bathrooms'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <InputField
                                                    onChange={(e) => addData1(index, 'propertyInformation', e.target.value, 'bathrooms', 'half')}
                                                    inputType='number'
                                                    placeholder='# of Half Bathrooms'
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Basement?'
                                                    options={['Yes', 'No']}
                                                    onSelect={(e) => addData1(index, 'propertyInformation', e, 'basement')}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Garage?'
                                                    options={['Yes', 'No']}
                                                    onSelect={(e) => addData1(index, 'propertyInformation', e, 'garage')}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    label='Is there a Property Management Company?'
                                                    options={['Yes', 'No']}
                                                    onSelect={(e) => addData1(index, 'propertyManagement', e, 'managedByCompany')}
                                                />
                                            </Grid>

                                            {properties[index]?.propertyManagement?.managedByCompany === 'Yes' &&
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
                                                    onSelect={e => addData1(index, "ownerType", e)}
                                                    options={['Assignment / Wholesale', 'Corp / REIT / Fund', 'Private']}
                                                />
                                            </Grid>
                                            <Grid item sm={6} xs={12}>
                                                <SelectBox
                                                    multiSelect={true}
                                                    label='Financing Types'
                                                    options={['Cash', 'Conventional', 'FHA', 'Land Contract']}
                                                    onSelect={val => addData1(index, 'financingOptions', val)}
                                                />
                                            </Grid>
                                            {properties[index].opportunityType?.includes('Flip Opportunity') && <Grid item sm={6} xs={12}>
                                                <InputField
                                                    placeholder='ARV'
                                                    onChange={(e) => addData1(index, 'ARV', e.target.value)}
                                                />
                                            </Grid>}
                                            <Grid item sm={12} xs={12}>
                                                <InputField
                                                    placeholder='Description/Remarks'
                                                    onChange={(e) => addData1(index, 'description', e.target.value)}
                                                    isTextarea={true}
                                                />
                                            </Grid>
                                            {/* <Grid item sm={12} xs={12}>
                                                <InputField
                                                    placeholder='Financing Options'
                                                    onChange={(e) => addData1(index, 'financingOptions', e.target.value)}
                                                    isTextarea={true}
                                                />
                                            </Grid> */}
                                            <Grid item xs={12}>
                                                <FileUpload
                                                    index={index}
                                                    label='Upload Photo Files'
                                                    onFilesChange={handleUploadPhotos1}
                                                />
                                                {/* {properties[index]?.images?.length > 0 ?
                                                    properties[index]?.images?.map((e, i) => (
                                                        <div className="category-img">
                                                            <img src={e} alt="img" />
                                                        </div>
                                                    )) :
                                                    <div className='pd-p-val mt-10' style={{ marginLeft: 20 }} >No Image(s) Uploaded</div>
                                                } */}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FileUpload
                                                    label='Upload Video File'
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
                                {location?.state?.isEdit ? <Btn
                                    label='Update'
                                    onClick={updateProperty}
                                /> : location?.state?.submitUserProperty ?
                                    <Btn
                                        label='Submit User'
                                        onClick={handleSubmitUserProperty}
                                    />
                                    : <Btn
                                        label='Submit'
                                        onClick={dataObj?.propertyInformation?.propertyType === 'Portfolio Package' ? handleMultipleSubmit : handleSubmit}
                                    />
                                }
                            </div>
                        </Grid>
                    </Grid>
                </section>
                :
                <div>
                    <Login hide={true} />
                </div>
            }
            {location?.state?.path !== 'AddProperty' && <Footer hideEmail={true} active='Off-Market Inventory' />}
            <MapModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false)
                }}
            />
            <Loader isLoading={isLoading} />

        </div>
    )
}

export default AddProperty;
