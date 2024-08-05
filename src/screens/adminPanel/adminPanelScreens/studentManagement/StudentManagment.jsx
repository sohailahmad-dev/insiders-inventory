import React, { useEffect, useState } from 'react'
import {Grid, Modal } from '@mui/material';
import { deleteData, getData, postData, putData } from '../../../../config/apiCalls';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputField from '../../../../components/inputField/InputField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CancelIcon from '@mui/icons-material/Cancel';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EventIcon from '@mui/icons-material/Event';
import Snack from '../../../../components/snack/Snack';
import Loader from '../../../../components/loader/Loader';
import Btn from '../../../../components/btn/Btn';
import SelectBox from '../../../../components/selectBox/SelectBox';

export default function StudentManagement() {

    let [userData, setUserData] = useState({});
    let [pageNumber, setPageNumber] = useState(1);
    let [totalUsers, setTotalUsers] = useState(0);
    let [limit, setLimit] = useState(0)
    let [usersData, setUsersData] = useState([]);
    let [openCreateUserModal, setOpenCreateUserModal] = useState(false)
    let [openEditUserModal, setOpenEditUserModal] = useState(false)
    const [dataObj, setDataObj] = useState({
        email: "",
        password: "",
        role: "",
        user_age: "",
        user_gender: "",
        username: "",
    });
    let [editUserObj, setEditUserObj] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const getUsers = () => {
        setIsLoading(true)
        getData(`users`).then((response) => {
            if (response.success) {
                setUsersData(response?.data)
                setTotalUsers(response?.data.length)
                setIsLoading(false)
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
    }, [])

    // pagination 

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [usersToRender, setUsersToRender] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentUsers = usersData?.slice(startIndex, endIndex);
        setUsersToRender(currentUsers);

    }, [currentPage, usersData]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(usersData.length / itemsPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
        else {
            setSnackMsg('Your are already at the last page.');
            setOpenSnack(true);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
        else {
            setSnackMsg('Your are already at the first page.');
            setOpenSnack(true);
        }
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data)
        }
    }, [])


    const handleCreateUser = () => {
        setIsLoading(true)
        const { username, password, email, role, user_age, user_gender } = dataObj;
        if (username && password && email && role && user_age && user_gender) {
            // api call 
            postData('create_user', dataObj).then((response) => {
                if (response.success) {
                    setOpenCreateUserModal(false);
                    getUsers();
                    setSnackMsg(response.msg);
                    setOpenSnack(true);
                    setSeverity('success');
                    setIsLoading(false);
                } else {
                    setSnackMsg(response.msg);
                    setOpenSnack(true);
                    setIsLoading(false)
                }
            })
                .catch((error) => {
                    setSnackMsg(error.msg ?? "Network Error");
                    setOpenCreateUserModal(false);
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

    const createUserModal = () => {
        return (
            <Modal open={openCreateUserModal}>
                <div className='ap-userModal-style'  >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setOpenCreateUserModal(false)}
                            className='ap-modal-cancel-icon'><CancelIcon /></div>
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
                            options={['Student', 'Employer', 'Job Seeker', 'Admin']}
                            onSelect={(val) => addData("role", val)}
                        />
                        <Btn
                            label='Create User'
                            onClick={handleCreateUser}
                        />
                    </div>
                </div>
            </Modal >
        )
    }

    const addData1 = (key, val) => {
        editUserObj[key] = val;
        setDataObj({ ...editUserObj });
    }

    const editUser = (item) => {
        setEditUserObj(item)
        setOpenEditUserModal(true)
    }

    const handleEditUser = () => {
        setIsLoading(true)
        const { username, email, password, role, user_id, user_gender, user_age } = editUserObj;
        if (username && email && password && role && user_id && user_gender && user_age) {
            // api call 
            putData(`update_user/${user_id}`, editUserObj).then((response) => {
                if (response.success) {
                    setOpenEditUserModal(false);
                    getUsers();
                    setSnackMsg(response.msg);
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
                    <div className='ap-userModal-content'>
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
                            icon={EventIcon}
                            placeholder="Age"
                            inputType='number'
                            onChange={(e) => addData1("user_age", e.target.value)}
                            value={editUserObj?.user_age}
                        />
                        <InputField
                            icon={LockOpenIcon}
                            placeholder="Password"
                            isPassword={true}
                            onChange={(e) => addData1("password", e.target.value)}
                            value={editUserObj?.password}
                        />
                        <SelectBox
                            label="Select Gender"
                            options={['Male', 'Female']}
                            onSelect={(val) => addData1("user_gender", val)}
                            selected={editUserObj?.user_gender}

                        />
                        <SelectBox
                            label="Select Role"
                            options={['Student', 'Employer', 'Job Seeker', 'Admin']}
                            onSelect={(val) => addData1("role", val)}
                            selected={editUserObj?.role}
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

    const deleteUser = (id) => {
        setIsLoading(true)
        deleteData(`/delete_user/${id}`).then((response) => {
            if (response.success) {
                setSnackMsg(response.msg);
                setOpenSnack(true);
                setSeverity('success');
                getUsers();
                setIsLoading(false);
            } else {
                setSnackMsg(response.msg);
                setOpenSnack(true);
                setIsLoading(false);
            }
        })
            .catch((error) => {
                setSnackMsg(error.msg ?? "Network Error");
                setOpenSnack(true);
                setIsLoading(false);
            });
    }

    return (
        <div className='dashboard-ap'>
            <div className="ap-upperMost">
                <div className="dashboard-pd">
                    <div>
                        <div className="dashboard-pd-heading">
                            <span>Hello, </span>{userData?.username ?? "Admin"}
                        </div>
                        <div className="dashboard-pd-subHeading">Check your activities in this dashboard.</div>
                    </div>
                </div>
                <div>
                    <div onClick={() => setOpenCreateUserModal(true)} className="ap-add-user-btn">Add User</div>
                </div>
            </div>

            <div className="ap-table-data">
                <div className="ap-table-data-header">
                    <div>
                        <div className="ap-table-data-heading">All Users</div>
                        <div className="ap-table-data-subHeading">Total Users : {totalUsers}</div>
                    </div>
                </div>
                <div className="table-data-headings-Box">
                    <Grid container spacing={3}>
                        <Grid item sm={1.25}>
                            <div className="table-data-heading">
                                User ID
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="table-data-heading">
                                Username
                            </div>
                        </Grid>
                        <Grid item sm={2.25}>
                            <div className="table-data-heading">
                                Email
                            </div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="table-data-heading">
                                Password
                            </div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="table-data-heading">
                                Age
                            </div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="table-data-heading">
                                Role
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="table-data-heading">
                                Actions
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="table-data-content-box">
                    {usersToRender && usersToRender.length > 0 &&
                        usersToRender.map((item, index) => {
                            return (
                                <div key={index} className="table-data-content-item">
                                    <Grid container spacing={3}>
                                        <Grid item sm={1.25} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>User ID: </span>
                                                {item?.user_id}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Username: </span>
                                                {item?.username}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2.25} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Email: </span>
                                                {item?.email}
                                            </div>
                                        </Grid>
                                        <Grid item sm={1.5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Password: </span>
                                                {item?.password}
                                            </div>
                                        </Grid>
                                        <Grid item sm={1.5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Age: </span>
                                                {item?.user_age}
                                            </div>
                                        </Grid>
                                        <Grid item sm={1.5} xs={12}>
                                            <div className="table-data-item-text">
                                                <span>Role: </span>
                                                {item?.role}
                                            </div>
                                        </Grid>
                                        <Grid item sm={2} xs={12}>
                                            <div className="table-data-item-btns">
                                                <div onClick={() => editUser(item)} className="ap-edit-btn">
                                                    Edit
                                                </div>
                                                <div onClick={() => deleteUser(item?.user_id)}
                                                    className="ap-delete-btn">
                                                    Delete
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        })
                    }
                    {usersData && usersData.length > 0 &&
                        <div className='ap-pagination-style' >
                            <span onClick={handlePrevPage} ><ArrowBackIcon /></span>
                            <div> Page no.{currentPage} of {Math.ceil(usersData.length / itemsPerPage)}</div>
                            <span onClick={handleNextPage}><ArrowForwardIcon /></span>
                        </div>
                    }
                </div>
            </div>
            {createUserModal()}
            {editUserModal()}
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}