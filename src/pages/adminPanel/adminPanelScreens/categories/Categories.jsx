import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import { deleteData, getData } from '../../../../config/apiCalls'
import CategoryModal from './CategoryModal'
import img from '../../../../assets/imgs/img1.png'
import Btn from '../../../../components/btn/Btn';
import toast from 'react-hot-toast';
import useAuthCheck from '../../../../hooks/UseAuthCheck';



export default function Categories() {
    useAuthCheck(true)
    const navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false)
    let [openCategoryModal, setOpenCategoryModal] = useState(false);
    let [category, setCategory] = useState({});
    let [categories, setCategories] = useState([]);
    let [isEdit, setIsEdit] = useState(false);

    function getCategories() {
        setIsLoading(true)

        getData('categories').then((response) => {
            console.log(response.categories)
            setCategories(response?.categories)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])


    const deleteCategory = (id) => {
        setIsLoading(true)
        deleteData(`category/${id}`).then(response => {
            toast.success(response?.message);
            getCategorys();
            setIsLoading(false);
        }).catch(err => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })
    }

    const handleEditCategory = (e) => {
        setCategory(e);
        setIsEdit(true);
        setOpenCategoryModal(true);
    }




    return (
        <div>
            <div className='flex-between'>
                <div className="heading2">All Categories</div>
                <Btn
                    onClick={() => setOpenCategoryModal(true)}
                    label='Add Category'></Btn>
            </div>

            <div className="ap-table">
                <div className="ap-th">
                    <Grid container spacing={1}>
                        <Grid item sm={0.5}>
                            <div className="th-heading">#</div>
                        </Grid>
                        <Grid item sm={1}>
                            <div className="th-heading">Image</div>
                        </Grid>
                        <Grid item sm={3}>
                            <div className="th-heading">Title</div>
                        </Grid>
                        <Grid item sm={6}>
                            <div className="th-heading">Description</div>
                        </Grid>
                        <Grid item sm={1.5}>
                            <div className="th-heading">Actions</div>
                        </Grid>
                    </Grid>
                </div>
                <div className="ap-tb">
                    {categories && categories.length > 0 &&
                        categories.map((e, i) => (
                            <div className='ap-th'>
                                <Grid container spacing={1}>
                                    <Grid item sm={0.5} xs={12} >
                                        <div className="ap-tr">
                                            <div className="th-heading1">#</div>
                                            <div className="tr-data">{i + 1}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Image</div>
                                            <img src={e?.image ?? img} width='90%' alt="img" />
                                        </div>
                                    </Grid>
                                    <Grid item sm={3} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Title</div>
                                            <div className="tr-data">{e?.name}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Description</div>
                                            <div className="tr-data">{e?.description}</div>
                                        </div>
                                    </Grid>

                                    <Grid item sm={1.5} xs={12}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Actions</div>
                                            <div style={{ display: 'flex' }} >
                                                <div
                                                    onClick={() => handleEditCategory(e)}
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
                                                    onClick={() => deleteCategory(e?._id)}
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
            <CategoryModal
                open={openCategoryModal}
                onClose={() => {
                    setOpenCategoryModal(false);
                    setIsEdit(false);
                    setCategory({});
                    getCategories()
                }}
                category={category}
                isEdit={isEdit}

            />
            <Loader isLoading={isLoading} />
        </div>
    )
}

