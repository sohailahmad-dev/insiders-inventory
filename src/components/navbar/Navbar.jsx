import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/img/logo.png'
import Btn from "../btn/Btn";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useIsMobile from "../../hooks/UseIsMobile";






export default function NavBar({ active }) {
    let [menu, setMenu] = useState('true');
    let [activeMenu, setActiveMenu] = useState('navLinks');
    let [activeLink, setActiveLink] = useState('Home');
    let isMobile = useIsMobile();

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


    return (
        <>
            <div className="navBar">
                <div className="logo-nb"
                    onClick={goToHome}
                >
                    Insider's <span>Inventory</span>
                </div>

                <div className={activeMenu}>

                    <div
                        className={activeLink == 'Home' ? "link-nb" : "link-nb1"}
                        onClick={() => {
                            navigate('/')
                        }
                        }
                    >Home</div>

                    <div
                        className={activeLink === 'Buyers' ? "link-nb" : "link-nb1"}
                        onClick={() => {
                            navigate('/Buyers')
                        }
                        }
                    >Buyers</div>

                    <div
                        className={activeLink === 'Sellers' ? "link-nb" : "link-nb1"}
                        onClick={() => {
                            navigate('/')
                        }
                        }
                    >Sellers</div>

                    <div
                        className={activeLink === 'Buy & Hold' ? "link-nb" : "link-nb1"}
                        onClick={() => {
                            navigate('/')
                        }
                        }
                    >Buy & Hold</div>

                    <div
                        className={activeLink === 'Retail' ? "link-nb" : "link-nb1"}
                        onClick={() => {
                            navigate('/')
                        }
                        }
                    >Retail</div>

                    <div
                        className={activeLink === 'Flip Opportunities' ? "link-nb" : "link-nb1"}
                        onClick={() => {
                            navigate('/')
                        }
                        }
                    >Flip Opportunities</div>

                    <div
                        className={activeLink === 'Off-Market Inventory' ? "link-nb" : "link-nb1"}
                        onClick={() => {
                            navigate('/AddProperty')
                        }
                        }
                    >Off-Market Inventory</div>
                    {isMobile && <Btn
                        label="Login/Signup" onClick={() => navigate('/Login')} />}


                </div>
                {!isMobile && <Btn
                    label="Login/Signup" onClick={() => navigate('/Login')} />}

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