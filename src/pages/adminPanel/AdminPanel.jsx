import React, { useEffect, useState } from 'react';
import './AdminPanel.css'
import MenuIcon from '@mui/icons-material/Menu';
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
import UserProfile from '../userPanel/userPanelScreens/userProfile/UserProfile';
import AddProperty from '../addProperty/AddProperty';
import UserProperties from '../userPanel/userPanelScreens/userProperties/UserProperties';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Users from './adminPanelScreens/users/Users';
import Categories from './adminPanelScreens/categories/Categories';
import CategoryIcon from '@mui/icons-material/Category';
import Properties from './adminPanelScreens/properties/Properties';
import useAuthCheck from '../../hooks/UseAuthCheck';
import VipBuyers from './adminPanelScreens/vipBuyer/VipBuyers';
import EmailIcon from '@mui/icons-material/Email';
import Emails from './adminPanelScreens/emails/Emails';





export default function AdminPanel() {
    useAuthCheck(true)
    const [deviceType, setDeviceType] = useState('');
    let [menu, setMenu] = useState(false);
    let [activeMenu, setActiveMenu] = useState('ap-navLinks ap-activeMenu');
    let [handleContent, setHandleContent] = useState('ap-rightSide ap-contractContent');
    let [activeScreen, setActiveScreen] = useState('Properties');
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
            label: 'Send Email(s)',
            to: 'Emails',
            icon: EmailIcon
        },
        {
            label: 'Users',
            to: 'Users',
            icon: GroupOutlinedIcon,
        },
        {
            label: 'VIP Buyers',
            to: 'VipBuyers',
            icon: GroupOutlinedIcon,
        },
        {
            label: 'Properties',
            to: 'Properties',
            icon: MapsHomeWorkOutlinedIcon,
        },
        {
            label: 'Submit Property',
            to: 'AddProperty',
            icon: HomeOutlinedIcon,
        },
        {
            label: 'Categories',
            to: 'Categories',
            icon: CategoryIcon
        },
        {
            label: 'Logout',
            to: '',
            icon: LogoutOutlinedIcon,
        },
    ]

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }



    const handleBtnClick = (e) => {
        if (e.label === 'Logout') {
            localStorage.removeItem('user');
            navigate('/')
        } else {
            if (deviceType === 'Mobile') {
                setMenu(!menu)
            }
            setActiveScreen(e.label);
            navigate(e.to, { state: e.to })

        }
    }

    useEffect(() => {
        menu ? setActiveMenu('ap-navLinks') : setActiveMenu("ap-navLinks ap-activeMenu");
        menu ? setHandleContent('ap-rightSide') : setHandleContent('ap-rightSide ap-contractContent')
    }, [menu])


    useEffect(() => {
        navigate('Properties')


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
        }
    }, [])

    return (
        <div>
            <NavBar onLogoClick={() => {
                setMenu(!menu)
            }} />
            <div className='ap-main'>
                <div className={activeMenu}>
                    <div>
                        <div className="sideBar-Profile-sec">
                            <img src={"https://tse1.mm.bing.net/th?id=OIP.FUYG2ULJI1LzxUqxK9pCZQHaHa&pid=Api&P=0&h=220"} className='ap-profile' />
                            <div className="sideBar-profile-name">{userData?.username ?? "John Doe"}</div>
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
                        <Route path='Properties' element={<Properties />}></Route>
                        <Route path='AddProperty' element={<AddProperty />}></Route>
                        <Route path='Users' element={<Users />}></Route>
                        <Route path='VipBuyers' element={<VipBuyers />}></Route>
                        <Route path='Emails' element={<Emails />}></Route>
                        <Route path='Categories' element={<Categories />}></Route>
                    </Routes>
                </div>

            </div>
            <Footer inPanel={true} />
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}