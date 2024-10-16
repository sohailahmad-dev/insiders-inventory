import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import { deleteData, getData } from '../../../../config/apiCalls'
import UserModal from './UserModal'
import toast from 'react-hot-toast';
import useAuthCheck from '../../../../hooks/UseAuthCheck';


export default function Users() {
    useAuthCheck(true)
    const navigate = useNavigate();
    let [users, setUsers] = useState([]);
    let [isLoading, setIsLoading] = useState(false)
    let [openUserModal, setOpenUserModal] = useState(false);
    let [user, setUser] = useState({});

    function getUsers() {
        setIsLoading(true)

        getData('users').then((response) => {
            setUsers(response?.users)
            setIsLoading(false)
        }
        ).catch((err) => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    const deleteUser = (id) => {
        setIsLoading(true)
        deleteData(`user/${id}`).then(response => {
            toast.success(response?.message);
            getUsers();
            setIsLoading(false);
        }).catch(err => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    const handleEditUser = (user) => {
        setUser(user);
        setOpenUserModal(true);
    }



    return (
        <div>
            <div className="heading2 mb-20">All Users</div>

            <div className="ap-table">
                <div className="ap-th">
                    <Grid container spacing={1}>
                        <Grid item sm={0.5}>
                            <div className="th-heading">#</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">First Name</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Last Name</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Email</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Password</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Category</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Phone Number</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Actions</div>
                        </Grid>
                    </Grid>
                </div>
                <div className="ap-tb">
                    {users && users.length > 0 &&
                        users.map((e, i) => (
                            <div className='ap-th'>
                                <Grid container spacing={1}>
                                    <Grid item sm={0.5} xs={12} >
                                        <div className="ap-tr">
                                            <div className="th-heading1">#</div>
                                            <div className="tr-data">{i + 1}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">First Name</div>
                                            <div className="tr-data">{e?.firstName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Last Name</div>
                                            <div className="tr-data">{e?.lastName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Email</div>
                                            <div className="tr-data">{e?.email}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Password</div>
                                            <div className="tr-data" >{e?.password}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Category</div>
                                            <div className="tr-data" >{e?.role}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Phone Number</div>
                                            <div className="tr-data">{e?.phoneNumber}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Actions</div>
                                            <div style={{ display: 'flex' }}>
                                                <div
                                                    onClick={() => handleEditUser(e)}
                                                >
                                                    <EditIcon
                                                        sx={{
                                                            cursor: 'pointer',
                                                            color: '#32CD32',
                                                            marginRight: 1

                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    onClick={() => deleteUser(e?._id)}
                                                >
                                                    <DeleteIcon
                                                        sx={{
                                                            cursor: 'pointer',
                                                            color: 'red',
                                                            marginRight: 1

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                </div>
            </div>
            <UserModal
                open={openUserModal}
                onClose={() => {
                    getUsers()
                    setOpenUserModal(false)
                }}
                user={user}

            />
            <Loader isLoading={isLoading} />
        </div>
    )
}
