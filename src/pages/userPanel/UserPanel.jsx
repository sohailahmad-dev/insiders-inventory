import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader'
import Snack from '../../components/snack/Snack'
import Footer from '../../components/footer/Footer';
import NavBar from '../../components/navbar/Navbar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Icon } from '@mui/material';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import UserProfile from './userPanelScreens/userProfile/UserProfile';
import UserProperties from './userPanelScreens/userProperties/UserProperties';
import AddProperty from '../addProperty/AddProperty'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import UserOffers from './userPanelScreens/userOffers/UserOffers';
import useAuthCheck from '../../hooks/UseAuthCheck';
import PropertyDetail from '../propertyDetail/PropertyDetail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Favorites from './userPanelScreens/favorites/Favorites';








export default function UserPanel() {
    useAuthCheck()
    const [deviceType, setDeviceType] = useState('');
    let [menu, setMenu] = useState(false);
    let [activeMenu, setActiveMenu] = useState('ap-navLinks ap-activeMenu');
    let [handleContent, setHandleContent] = useState('ap-rightSide ap-contractContent');
    let [activeScreen, setActiveScreen] = useState('My Properties');
    let [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    let [userData, setUserData] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error');
    let [snackMsg, setSnackMsg] = useState('');
    const navigate = useNavigate();

    const btns = [
        {
            label: 'My Profile',
            to: 'UserProfile',
            icon: Person2OutlinedIcon,
        },
        {
            label: 'My Properties',
            to: 'UserProperties',
            icon: MapsHomeWorkOutlinedIcon,
        },
        {
            label: 'Sent Offers',
            to: 'UserOffers',
            icon: LocalOfferIcon,
        },
        {
            label: 'Received Offers',
            to: 'UserOffers',
            icon: LocalOfferIcon,
        },
        {
            label: 'Favorites',
            to: 'Favorites',
            icon: FavoriteIcon,
        },
        {
            label: 'Submit Property',
            to: 'AddProperty',
            icon: HomeOutlinedIcon,
        },
        {
            label: 'Logout',
            to: '',
            icon: LogoutOutlinedIcon,
        },
    ]


    const handleBtnClick = (e) => {
        if (e.label === 'Logout') {
            localStorage.removeItem('user');
            navigate('/');
        } else {
            if (deviceType === 'Mobile') {
                setMenu(!menu)
            }
            setActiveScreen(e.label);
            navigate(e.to, {
                state: {
                    path: e.to,
                    label: e.label
                }
            })
        }
    }

    useEffect(() => {
        menu ? setActiveMenu('ap-navLinks') : setActiveMenu("ap-navLinks ap-activeMenu");
        menu ? setHandleContent('ap-rightSide') : setHandleContent('ap-rightSide ap-contractContent')
    }, [menu])


    useEffect(() => {
        navigate('UserProperties')


        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDeviceType('Mobile');
                setMenu(true)
            } else if (width >= 768 && width < 1024) {
                setDeviceType('Tablet');
            } else {
                setDeviceType('Laptop/Desktop');
            }
        };

        // Initial check on component mount
        handleResize();

        // Add event listener to check on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserData(user)
        }
    }, [])



    const handleLogout = () => {
        setIsLoading(true);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setSnackMsg("Successfully logged Out");
        setOpenSnack(true);
        setSeverity('success')
        setIsLoading(false)
        setTimeout(() => {
            setIsAdminLoggedIn(false);
        }, 2000)
    }

    return (
        <div>
            <NavBar active='Off-Market Inventory' onLogoClick={() => {
                setMenu(!menu)
            }} />
            <div className='ap-main'>
                <div className={activeMenu}>
                    <div>
                        <div className="sideBar-Profile-sec">
                            <div className="ap-profile"
                                style={{
                                    backgroundImage: `url(${userData?.avatar ?? "https://tse1.mm.bing.net/th?id=OIP.FUYG2ULJI1LzxUqxK9pCZQHaHa&pid=Api&P=0&h=220"})`
                                }}
                            ></div>
                            <div className="sideBar-profile-name">{userData?.firstName + userData?.lastName ?? "John Doe"}</div>
                            <div className="sideBar-profile-email">{userData?.email}</div>
                        </div>

                        {
                            btns.map((e, i) => {
                                return (
                                    <div key={e?.label} onClick={() => handleBtnClick(e)} >
                                        <div className='ap-iconBtn'
                                            style={{ background: e.label === activeScreen ? '#4DAD49' : 'transparent' }}
                                        >
                                            <Icon
                                                fontSize='sm'
                                                component={e?.icon} ></Icon>
                                            {e.label}
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>

                </div>
                {/* Main Content of Screeens  */}
                <div className={handleContent} >


                    <Routes>
                        <Route path='UserProfile' element={<UserProfile />}></Route>
                        <Route path='UserProperties' element={<UserProperties />}></Route>
                        <Route path='AddProperty' element={<AddProperty />}></Route>
                        <Route path='UserOffers' element={<UserOffers />}></Route>
                        <Route path='Favorites' element={<Favorites />}></Route>
                        <Route path='PropertyDetail' element={<PropertyDetail />}></Route>
                    </Routes>
                </div>

            </div>
            <Footer inPanel={true} active='Off-Market Inventory' />
            <Loader isLoading={isLoading} />
        </div>
    )
}