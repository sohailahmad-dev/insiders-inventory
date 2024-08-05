import { Grid, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData, putData } from '../../../../config/apiCalls';
import Btn from '../../../../components/btn/Btn';
import InputField from '../../../../components/inputField/InputField';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Snack from '../../../../components/snack/Snack';
import Loader from '../../../../components/loader/Loader';


export default function JobSeekerProfile() {
    let [userData, setUserData] = useState({});
    let [usersData, setUsersData] = useState([]);
    let [dataDetail, setDataDetail] = useState({});
    let [openEditUserModal, setOpenEditUserModal] = useState(false);
    let [editUserObj, setEditUserObj] = useState({});



    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error');
    let [snackMsg, setSnackMsg] = useState('');
    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }

    const getUsers = async () => {
        setIsLoading(true)
        getData(`jobseekers`).then((response) => {
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
            console.log(currentUser[0])
            localStorage.setItem('dataDetails', JSON.stringify(currentUser[0]))

        }
    }, [usersData])

    const addData1 = (key, val) => {
        editUserObj[key] = val;
        setEditUserObj({ ...editUserObj });
    }

    const editUser = () => {
        setEditUserObj(dataDetail)
        setOpenEditUserModal(true)
    }

    const handleEditUser = () => {
        setIsLoading(true)
        const { username, email, password, first_name, last_name, contact_number, admin_id } = editUserObj;
        if (username && email && password && first_name && last_name && contact_number) {
            // api call 
            putData(`/update_admin/${admin_id}`, editUserObj).then((response) => {
                if (response.success) {
                    setOpenEditUserModal(false);
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                    getUsers()
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


    const editUserModal = () => {
        return (
            <Modal open={openEditUserModal}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content' style={{ paddingTop: '250px' }}>
                        <div
                            onClick={() => setOpenEditUserModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
                        <InputField
                            icon={AccountCircleIcon}
                            placeholder="Full Name"
                            onChange={(e) => addData1("username", e.target.value)}
                            value={editUserObj?.username}
                        />
                        <InputField
                            icon={EmailIcon}
                            placeholder="Email"
                            onChange={(e) => addData1("email", e.target.value)}
                            value={editUserObj?.email}
                        />
                        <InputField
                            icon={AccountCircleIcon}
                            placeholder="First Name"
                            onChange={(e) => addData1("first_name", e.target.value)}
                            value={editUserObj?.first_name}
                        />
                        <InputField
                            icon={AccountCircleIcon}
                            placeholder="Last Name"
                            onChange={(e) => addData1("last_name", e.target.value)}
                            value={editUserObj?.last_name}
                        />
                        <InputField
                            icon={EventIcon}
                            placeholder="Contact Number"
                            onChange={(e) => addData1("contact_number", e.target.value)}
                            value={editUserObj?.contact_number}
                        />
                        <InputField
                            icon={LockOpenIcon}
                            placeholder="Password"
                            isPassword={true}
                            onChange={(e) => addData1("password", e.target.value)}
                            value={editUserObj?.password}
                        />
                        <Btn
                            label='Save Changes'
                            onClick={handleEditUser}
                        />
                    </div>
                </div>
            </Modal >
        )
    }

    return (
        <div className='ap-table-data' >
            <div className="profile-heading">Profile Details</div>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <div className="profile-item">
                        <span>Job Seekrer ID: </span>
                        {dataDetail?.jobSeeker_id}
                    </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <div className="profile-item">
                        <span>User ID: </span>
                        {dataDetail?.user_id}
                    </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <div className="profile-item">
                        <span>Username: </span>
                        {dataDetail?.username}
                    </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <div className="profile-item">
                        <span>Email: </span>
                        {dataDetail?.email}
                    </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <div className="profile-item">
                        <span>Password: </span>
                        {dataDetail?.password}
                    </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <div className="profile-item">
                        <span>Education: </span>
                        {dataDetail?.education}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="profile-item">
                        <span>Skills: </span>
                        {dataDetail?.skills}
                    </div>
                </Grid>
                <Grid item xs={12} >
                    <div style={{ textAlign: 'center' }}>
                        <Btn
                            label='Edit Profile'
                            className="ap-edit-btn"
                            onClick={editUser} />
                    </div>
                </Grid>
            </Grid>
            {editUserModal()}
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
} 
