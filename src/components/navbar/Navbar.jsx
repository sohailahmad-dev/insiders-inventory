import { useNavigate } from "react-router-dom";
import './Navbar.css';
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Btn from "../btn/Btn";
import useIsMobile from "../../hooks/UseIsMobile";






export default function NavBar({ active, onLogoClick }) {
    let [menu, setMenu] = useState('true');
    let [activeMenu, setActiveMenu] = useState('navLinks');
    let [activeLink, setActiveLink] = useState('Home');
    let [userData, setUserData] = useState({});
    let isMobile = useIsMobile();
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        setUserData({})
        togglePopup();
    };

    const goToUserPanel = () => {
        if (userData.role === 'Admin') {
            navigate('/AdminPanel/Properties')
        } else {
            navigate('/UserPanel/UserProperties')
        }
        togglePopup()
    };

    const navigate = useNavigate();

    useEffect(() => {
        menu ? setActiveMenu('navLinks') : setActiveMenu("navLinks active")
    }, [menu])

    useEffect(() => {
        if (active) {
            setActiveLink(active)
        }

        const usr = JSON.parse(localStorage.getItem('user'));
        if (usr) {
            setUserData(usr)
        }
    }, [])

    const goToHome = () => {
        navigate('/')
    }

    const links = [
        {
            label: 'Home',
            to: '/',
        },
        {
            label: 'All Off-Market Inventory',
            to: '/Properties'
        },
        {
            label: 'Buy & Hold',
            to: '/Properties/Buy & Hold'
        },
        {
            label: 'Flip Opportunities',
            to: '/Properties/Flip Opportunities'
        },
        {
            label: 'Retail',
            to: '/Properties/Retail'
        },
        {
            label: 'Owner-Occupant',
            to: '/Properties/Owner-Occupant'
        },
        {
            label: 'Current Renovation',
            to: '/Properties/Current Renovation'
        },
        {
            label: 'Submit an Off-Market Property',
            to: '/AddProperty'
        },
    ]



    return (
        <div >
            <div className="nb-email">
                <div onClick={() => setMenu('false')} >
                    Signup to our VIP Buyers List to see new listings before everyone else
                </div>
                <span onClick={() => navigate('/EmailSignup')} > Signup</span>
            </div>
            <div className="navBar">
                <div className="logo-nb"
                    onClick={onLogoClick ?? goToHome}
                >
                    Insider's <span>Inventory</span>
                </div>

                <div className={activeMenu}>
                    <div className="icon">
                        {menu ? null :
                            <CloseIcon
                                sx={{ color: 'white' }}
                                onClick={() => setMenu(!menu)} />}
                    </div>
                    {isMobile && (userData?.firstName ?
                        <div className="sideBar-Profile-sec" style={{ width: '100%', position: 'relative', cursor: 'pointer' }}>

                            <div className="nb-profile"
                                onClick={togglePopup}
                                alt="Profile"
                                style={{
                                    backgroundImage: `url(${userData?.avatar ?? "https://tse1.mm.bing.net/th?id=OIP.FUYG2ULJI1LzxUqxK9pCZQHaHa&pid=Api&P=0&h=220"})`
                                }}
                            ></div>
                            <div className="nb-profile-name">
                                {userData?.firstName + " " + userData?.lastName ?? "John Doe"}
                            </div>

                            {showPopup && (
                                <div className="profile-popup" style={popupStyle}>
                                    <div className="popup-option" onClick={goToUserPanel}>
                                        Go to Dashboard
                                    </div>
                                    <div className="popup-option" onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                        :
                        <Btn
                            label="Insider Login/Sign-up" onClick={() => navigate('/LoginSignup')} />)}
                    {links.map(e => (
                        <div
                            key={e?.label}
                            className={activeLink == e?.label ? "link-nb" : "link-nb1"}
                            onClick={() => {
                                navigate(e?.to)
                            }
                            }
                        >{e?.label}</div>
                    ))}
                </div>
                {!isMobile && (userData?.firstName ?
                    <div className="sideBar-Profile-sec" style={{ position: 'relative', textAlign: 'center', minWidth: 80, cursor: 'pointer' }}>
                        <div className="nb-profile"
                            onClick={togglePopup}
                            alt="Profile"
                            style={{
                                backgroundImage: `url(${userData?.avatar ?? "https://tse1.mm.bing.net/th?id=OIP.FUYG2ULJI1LzxUqxK9pCZQHaHa&pid=Api&P=0&h=220"})`
                            }}
                        ></div>

                        <div className="nb-profile-name">
                            {userData?.firstName + " " + userData?.lastName ?? "John Doe"}
                        </div>

                        {showPopup && (
                            <div className="nb-profile-popup" >
                                <div className="nb-popup-option" onClick={goToUserPanel}>
                                    Go to Dashboard
                                </div>
                                <div className="nb-popup-option" onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                    :
                    <Btn
                        label="Insider Login/Sign-up" onClick={() => navigate('/LoginSignup')} />)}

                <div className="icon">
                    {menu ? <MenuIcon
                        sx={{ color: 'white' }}
                        onClick={() => setMenu(!menu)} /> :
                        <CloseIcon
                            sx={{ color: 'white' }}
                            onClick={() => setMenu(!menu)} />}
                </div>

            </div>
        </div>
    )
}

