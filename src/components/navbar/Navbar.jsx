import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Btn from "../btn/Btn";
import useIsMobile from "../../hooks/UseIsMobile";
import { useAuth } from "../../hooks/UseAuth";






export default function NavBar({ active, onLogoClick }) {
    let [menu, setMenu] = useState('true');
    let [activeMenu, setActiveMenu] = useState('navLinks');
    let [activeLink, setActiveLink] = useState('Home');
    let isMobile = useIsMobile();
    let isLoggedIn = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        menu ? setActiveMenu('navLinks') : setActiveMenu("navLinks active")
    }, [menu])

    useEffect(() => {
        if (active) {
            setActiveLink(active)
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
            to: '/Properties'
        },
        {
            label: 'Flip Opportunities',
            to: '/Properties'
        },
        {
            label: 'Retail',
            to: '/Properties'
        },
        {
            label: 'Owner-Occupant',
            to: '/Properties'
        },
        {
            label: 'Current Renovation',
            to: '/Properties'
        },
        {
            label: 'Submit an Off-Market Inventory',
            to: '/AddProperty'
        },
    ]



    return (
        <>
            <div className="nb-email">
                Signup to our VIP Buyers List to see new listings before everyone else
                <span onClick={() => navigate('/EmailSignup')} > Signup</span>
            </div>
            <div className="navBar">
                <div className="logo-nb"
                    onClick={onLogoClick ?? goToHome}
                >
                    Insider's <span>Inventory</span>
                </div>

                <div className={activeMenu}>

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



                    {/* {(isMobile && !isLoggedIn) ? <Btn
                        label="Login/Signup" onClick={() => navigate('/Login')} /> : <div></div>} */}
                    {isMobile && <Btn
                        label="Member Login/Sign-up" onClick={() => navigate('/Login')} />}


                </div>
                {!isMobile && <Btn
                    label="Member Login/Sign-up" onClick={() => navigate('/Login')} />}

                <div className="icon">
                    {menu ? <MenuIcon
                        sx={{ color: 'white' }}
                        onClick={() => setMenu(!menu)} /> :
                        <CloseIcon
                            sx={{ color: 'white' }}
                            onClick={() => setMenu(!menu)} />}
                </div>

            </div>
        </>
    )
} 