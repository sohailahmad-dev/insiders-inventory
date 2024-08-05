import React, { useState } from 'react'
import './SignUp.css'
import InputField from '../../components/inputField/InputField'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import SelectBox from '../../components/selectBox/SelectBox';
import Btn from '../../components/btn/Btn';
import { useNavigate } from 'react-router-dom';
import Snack from '../../components/snack/Snack';
import Loader from '../../components/loader/Loader';
import { postData } from '../../config/apiCalls';


export default function SignUp() {
    const navigate = useNavigate();
    const [dataObj, setDataObj] = useState({
        email: "",
        password: "",
        role: "",
        user_age: "",
        user_gender: "",
        username: "",
    });

    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }




    const createAccount = () => {
        setIsLoading(true)
        const { username, password, email, role, user_age, user_gender } = dataObj;

        if (role && username && password && email && user_age && user_gender) {
            // api call 
            postData('create_user', dataObj).then((response) => {
                console.log(response)
                if (response.success) {
                    setSnackMsg(response.msg);
                    setOpenSnack(true);
                    setSeverity('success')
                    setIsLoading(false)
                    setTimeout(() => {
                        navigate('/SignIn')
                    }, 2000)
                } else {
                    setSnackMsg(response.msg);
                    setOpenSnack(true);
                    setIsLoading(false)
                }
            })
                .catch((error) => {
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

    const addData = (key, val) => {
        dataObj[key] = val;
        setDataObj({ ...dataObj });
    }



    return (
        <div>
            <div className="signUpRight" data-aos="fade-left">
                <div className="heading1" style={{ marginBottom: '30px' }}>SIGN UP</div>
                <InputField
                    icon={AccountCircleIcon}
                    placeholder="Full Name"
                    onChange={(e) => addData("username", e.target.value)}
                />
                <InputField
                    icon={EmailIcon}
                    placeholder="Email"
                    onChange={(e) => addData("email", e.target.value)}
                />
                <InputField
                    icon={EventIcon}
                    placeholder="Age"
                    inputType='number'
                    onChange={(e) => addData("user_age", e.target.value)}
                />
                <InputField
                    icon={LockOpenIcon}
                    placeholder="Password"
                    isPassword={true}
                    onChange={(e) => addData("password", e.target.value)}
                />
                <SelectBox
                    label="Select Gender"
                    options={['Male', 'Female']}
                    onSelect={(val) => addData("user_gender", val)}
                />
                <SelectBox
                    label="Select Role"
                    options={['Student', 'Employer', 'Job Seeker']}
                    onSelect={(val) => addData("role", val)}
                />
                <Btn
                    label='Submit'
                    onClick={createAccount}
                />
                <div className="text1 accountSignIn">
                    Already have an account?
                    <span onClick={() => navigate('/SignIn')} > Sign In</span>
                </div>
            </div>
            <div className="signUpLeft" data-aos="fade-right" onClick={() => navigate('/')} >
                <div className="heading2" style={{ color: 'white' }}>Hello, Friend!</div>
                <div className="text1">Embark on a new adventure! Sign up and join our vibrant community. Together, let's build memories and share joy. </div>
            </div>
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>


    )
}
