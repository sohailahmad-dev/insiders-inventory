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
import { Icon } from '@mui/material';









export default function AdminPanel() {
    const [deviceType, setDeviceType] = useState('');
    let [menu, setMenu] = useState(false);
    let [activeMenu, setActiveMenu] = useState('ap-navLinks ap-activeMenu');
    let [handleContent, setHandleContent] = useState('ap-rightSide ap-contractContent');
    let [activeScreen, setActiveScreen] = useState('Home');
    let [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    let [userData, setUserData] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error');
    let [snackMsg, setSnackMsg] = useState('');
    const navigate = useNavigate();

    const btns = [
        {
            label: 'Home',
            to: '',
            icon: HomeOutlinedIcon,
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

    // useEffect(() => {
    //     const storedUserData = localStorage.getItem("user");
    //     if (storedUserData) {
    //         const data = JSON.parse(storedUserData);
    //         setUserData(data);
    //         if (data?.role.toLowerCase() === 'admin') {
    //             setIsAdminLoggedIn(true);
    //             setActiveScreen('User Management')
    //             navigate('UserManagement')
    //         } else {
    //             navigate('/');
    //         }
    //     } else {
    //         navigate('/')
    //     }
    // }, [isAdminLoggedIn])


    const handleBtnClick = (e) => {
        setActiveScreen(e.label);
        navigate(e.to)
        if (deviceType === 'Mobile') {
            setMenu(!menu)
        }
    }

    useEffect(() => {
        menu ? setActiveMenu('ap-navLinks') : setActiveMenu("ap-navLinks ap-activeMenu");
        menu ? setHandleContent('ap-rightSide') : setHandleContent('ap-rightSide ap-contractContent')
    }, [menu])


    useEffect(() => {
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
            <NavBar />
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
                                                sx='sm'
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
                        {/* <Route path='UserManagement' element={<UserManagement />}></Route> */}

                    </Routes>
                </div>

            </div>
            <Footer inPanel={true} />
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}