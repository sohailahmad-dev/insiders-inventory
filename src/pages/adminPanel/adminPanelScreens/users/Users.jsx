import React from 'react'
import SelectBox from '../../../../components/selectBox/SelectBox'
import { Grid } from '@mui/material'
import InputField from '../../../../components/inputField/InputField'
import Btn from '../../../../components/btn/Btn'
import img3 from '../../../../assets/local/img3.png';
import img4 from '../../../../assets/local/img4.png';
import img5 from '../../../../assets/local/img5.png';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'


const data = [
    {
        id: 1,
        img: img3,
        status: 'Vacant',
        type: 'Commercial',
        price: '112000',
    },
    {
        id: 2,
        img: img4,
        status: 'Tenant-Occupied',
        type: 'Condo',
        price: '202000',
    },
    {
        id: 3,
        img: img5,
        status: 'Owner-Occupied',
        type: 'Single-Family',
        price: '450000',
    },
    {
        id: 5,
        img: img3,
        status: 'Vacant',
        type: 'Commercial',
        price: '112000',
    },

]

const users = [
    {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        category: 'invester',
        phonenumber: '111222333',
    },
    {
        id: 2,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        category: 'invester',
        phonenumber: '111222333',
    },
    {
        id: 3,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        category: 'invester',
        phonenumber: '111222333',
    },
    {
        id: 4,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        category: 'invester',
        phonenumber: '111222333',
    },
]

export default function Users() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="heading2 mb-20">All Users</div>

            <div className="ap-table">
                <div className="ap-th">
                    <Grid container spacing={1}>
                        <Grid item sm={0.5}>
                            <div className="th-heading">#</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">First Name</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Last Name</div>
                        </Grid>
                        <Grid item sm={2}>
                            <div className="th-heading">Email</div>
                        </Grid>
                        <Grid item sm={2}>
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
                    {users.map(e => (
                        <div className='ap-th'>
                            <Grid container spacing={1}>
                                <Grid item sm={0.5} xs={12} >
                                    <div className="ap-tr">
                                        <div className="th-heading1">#</div>
                                        <div className="tr-data">{e?.id}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">First Name</div>
                                        <div className="tr-data">{e?.firstname}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Last Name</div>
                                        <div className="tr-data">{e?.lastname}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Email</div>
                                        <div className="tr-data">{e?.email}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Category</div>
                                        <div className="tr-data" >${e?.category}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Phone Number</div>
                                        <div className="tr-data">{e?.phonenumber}</div>
                                    </div>
                                </Grid>
                                <Grid item sm={1.5} xs={12}>
                                    <div className="ap-tr">
                                        <div className="th-heading1">Actions</div>
                                        <div >
                                            <EditIcon
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: '#32CD32',
                                                    marginRight: 1

                                                }}
                                            />
                                            <DeleteIcon
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: 'red',
                                                    marginRight: 1

                                                }}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
