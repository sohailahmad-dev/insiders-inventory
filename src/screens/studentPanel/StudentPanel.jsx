import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Snack from '../../components/snack/Snack';
import Loader from '../../components/loader/Loader';
import Jobs from '../jobs/Jobs';
import { getData } from '../../config/apiCalls';
import JobSeekerProfile from '../jobSeekerPanel/jobSeekerPanelScreens/jobSeekerProfile/JobSeekerProfile';
import EmployerJobManagement from '../employerPanel/employerPanelScreens/employerJobManagement/EmployerJobManagement';
import Courses from '../courses/Courses';
import Trainings from '../trainings/Trainings';




export default function StudentPanel() {
    const [deviceType, setDeviceType] = useState('');
    let [menu, setMenu] = useState(false);
    let [activeMenu, setActiveMenu] = useState('ap-navLinks ap-activeMenu');
    let [handleContent, setHandleContent] = useState('ap-rightSide ap-contractContent');
    let [activeScreen, setActiveScreen] = useState('Dashboard');
    let [userData, setUserData] = useState({});
    let [usersData, setUsersData] = useState([]);
    let [dataDetail, setDataDetail] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error');
    let [snackMsg, setSnackMsg] = useState('');
    const navigate = useNavigate();

    const btns = [
        {
            label: 'Courses',
            to: 'Courses',
        },
        {
            label: 'Training Programs',
            to: 'Trainings',
        },
    ]

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data);
            navigate('Courses');
            setActiveScreen('Courses')
        } else {
            navigate('/')
        }
    }, [])

    const getUsers = async () => {
        setIsLoading(true)
        getData(`employers`).then((response) => {
            if (response.success) {
                setIsLoading(false)
                setUsersData(response.data)
            } else {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setIsLoading(false)
            }
        })
            .catch((error) => {
                setSnackMsg(error.message ?? "Network Error");
                setOpenSnack(true);
                setIsLoading(false)
            });
    }

    useEffect(() => {
        getUsers();
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data);
        }
    }, [])


    useEffect(() => {
        let currentUser = usersData.filter((user) => user?.email === userData?.email)
        if (currentUser && currentUser.length > 0) {
            setDataDetail(currentUser[0])
            localStorage.setItem('dataDetails', JSON.stringify(currentUser[0]))

        }
    }, [usersData])


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
        localStorage.removeItem("dataDetails");
        setSnackMsg("Successfully logged Out");
        setOpenSnack(true);
        setSeverity('success')
        setIsLoading(false)
        setTimeout(() => {
            navigate('/')
        }, 500)

    }

    return (
        <div>
            <div className='ap-main'>
                <div className={activeMenu}>
                    <div>
                        <div className="sideBar-Profile-sec">
                            <img src={"https://tse1.mm.bing.net/th?id=OIP.FUYG2ULJI1LzxUqxK9pCZQHaHa&pid=Api&P=0&h=220"} className='ap-profile' />
                            <div className="sideBar-profile-name">{userData?.username ?? "Admin"}</div>
                            <div className="sideBar-profile-email">{userData?.email}</div>
                        </div>
                        {
                            btns.map((e, i) => {
                                return (
                                    <div key={e.label} onClick={() => handleBtnClick(e)} >
                                        {activeScreen === e.label ? <div className='ap-iconBtnActive' >
                                            {/* <img src={e.activeIcon} alt="icon" width={e.iconWidth} height={e.iconHeight} /> */}
                                            {e.label}
                                        </div> : <div className='ap-iconBtn' >
                                            {/* <img src={e.icon} alt="icon" width={e.iconWidth} height={e.iconHeight} /> */}
                                            {e.label}
                                        </div>}
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div>
                        <div onClick={handleLogout} className='ap-iconBtn' style={{ marginTop: '-20px' }} >
                            {/* <img src={info} alt="icon" width='20px' height='20px' /> */}
                            Logout
                        </div>
                    </div>
                </div>
                {/* Main Content of Screeens  */}
                <div className={handleContent} >
                    <div className="ap-header">
                        <div className='ap-header-left' >
                            <div className="ap-menuIcon" onClick={() => {
                                setMenu(!menu)
                            }}>
                                <MenuIcon sx={{ fontSize: '22px' }} />
                            </div>
                            {activeScreen}
                        </div>
                        <div className="ap-header-right">
                            <div className="ap-header-profile"
                                onClick={() => {
                                    setActiveScreen('Profile')
                                    navigate('JobSeekerProfile')
                                }}
                            >
                                <div className="ap-header-profile-left">
                                    <div className='ap-header-profile-left-imgBox' >
                                        <img src={"https://tse1.mm.bing.net/th?id=OIP.FUYG2ULJI1LzxUqxK9pCZQHaHa&pid=Api&P=0&h=220"} alt="avatar" />
                                        <div />
                                    </div>
                                    <div className="ap-header-profile-left-text">
                                        <div className="ap-header-profile-left-text-name">{userData?.username ?? 'Admin'}</div>
                                        <div className="ap-header-profile-left-text-role">{userData?.role ?? 'Role'}</div>
                                    </div>
                                </div>
                                <div className="ap-header-profile-right">
                                    {/* <img src={msg} alt="msgs" /> */}
                                    <div className="ap-header-profile-right-notificationBox">
                                        {/* <img src={bellIcon} alt="notifications" /> */}
                                        <div>2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Routes>
                        <Route path='Courses' element={<Courses />} ></Route>
                        <Route path='Trainings' element={<Trainings />} ></Route>
                        <Route path='JobSeekerProfile' element={<JobSeekerProfile />} ></Route>
                    </Routes>
                </div>

            </div>
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}
