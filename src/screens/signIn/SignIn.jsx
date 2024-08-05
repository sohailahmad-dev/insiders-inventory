import React, { useState } from 'react'
import './SignIn.css'
import InputField from '../../components/inputField/InputField'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import SelectBox from '../../components/selectBox/SelectBox';
import Btn from '../../components/btn/Btn';
import { useNavigate } from 'react-router-dom';
import Snack from '../../components/snack/Snack';
import Loader from '../../components/loader/Loader';
import { postData } from '../../config/apiCalls';


export default function SignIn() {
    const navigate = useNavigate();
    const [dataObj, setDataObj] = useState({});

    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }

    const addData = (key, val) => {
        dataObj[key] = val;
        setDataObj({ ...dataObj });
    }

    const loginAccount = () => {
        setIsLoading(true)
        const { password, email } = dataObj;

        if (password && email) {
            // api call 
            postData('login', dataObj).then((response) => {
                if (response) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    setSnackMsg(response.msg);
                    setOpenSnack(true);
                    setSeverity('success')
                    setIsLoading(false)
                    const role = response.user.role.toLowerCase();
                    console.log(response)
                    setTimeout(() => {
                        if (role === 'admin') {
                            navigate('/adminPanel')
                        } else if (role == 'jobseeker' || role == 'job seeker') {
                            navigate('/JobSeekerPanel')
                        } else if (role == 'employer' || role == 'Employer') {
                            navigate('/EmployerPanel')
                        } else if (role == 'student' || role == 'Student') {
                            navigate('/StudentPanel')
                        }
                    }, 2000)
                } else {
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setIsLoading(false)
                }
            })
                .catch((error) => {
                    console.log(error)
                    setSnackMsg(error.msg ?? "Network Error");
                    setOpenSnack(true);
                    setIsLoading(false)
                });
        } else {
            setSnackMsg('Required Fields are missing!')
            setOpenSnack(true)
            setIsLoading(false)

        }

    }
    return (
        <div>
            <div className="signInLeft" data-aos="fade-right">
                <div className="heading1" style={{ marginBottom: '30px' }}>SIGN IN</div>
                <InputField
                    icon={EmailIcon}
                    placeholder="Email"
                    onChange={(e) => addData("email", e.target.value)}
                />
                <InputField
                    icon={LockOpenIcon}
                    placeholder="Password"
                    isPassword={true}
                    onChange={(e) => addData("password", e.target.value)}
                />
                {/* <SelectBox
                    label="Select Role"
                    options={['Student', 'Employer', 'Admin', 'Job Seeker']}
                    onSelect={(e) => addData("role", e)}
                /> */}
                <Btn
                    label='Login'
                    onClick={loginAccount} />
                <div className="text1 accountSignIn">
                    Don't have an account?
                    <span onClick={() => navigate('/SignUp')} > Sign Up</span>
                </div>
            </div>
            <div className="signInRight" data-aos="fade-left" onClick={() => navigate('/')} >
                <div className="heading2" style={{ color: 'white' }}>Welcome Back</div>
                <div className="text1">Welcome! Your journey begins here. Sign in with a smile, and let's create beautiful moments together.</div>
            </div>
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}
