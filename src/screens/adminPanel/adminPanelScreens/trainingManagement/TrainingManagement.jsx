import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, deleteData, getData } from '../../../../config/apiCalls';
import Snack from '../../../../components/snack/Snack';
import Loader from '../../../../components/loader/Loader';
import { Grid, Modal, TextField } from '@mui/material';
import Card from '../../../../components/card/Card';
import Btn from '../../../../components/btn/Btn';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';


const TrainingManagement = () => {
    let [isAdding, setIsAdding] = useState(false);
    let [isEditing, setIsEditing] = useState(false);
    let [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }

    const getPrograms = () => {
        setIsLoading(true)
        getData(`programs`).then((response) => {
            if (response.success) {
                setPrograms(response?.data)
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
        getPrograms();
    }, [])

    // program creation handling 
    const [programData, setProgramData] = useState({
        program_name: '',
        description: '',
        duration: '',
        trainer: ''
    });
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProgramData({
            ...programData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('program_name', programData.program_name);
        formData.append('description', programData.description);
        formData.append('duration', programData.duration);
        formData.append('trainer', programData.trainer);
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await axios.post(`${API_BASE_URL}program`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsLoading(false);
            setSeverity('success')
            setSnackMsg('program Added Successfully.');
            setOpenSnack(true);
            getPrograms();
            // Optionally, reset form fields here
            setProgramData({
                program_name: '',
                description: '',
                duration: '',
                trainer: ''
            });
            setFiles([]);
            setIsAdding(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setSnackMsg('Error creating program. Please try again.')
            setOpenSnack(true);
        }
    };

    const editModal = () => {
        return (
            <Modal open={isEditing}>
                <div className='ap-userModal-style' >
                    <div className='ap-userModal-content'>
                        <div
                            onClick={() => setIsEditing(false)}
                            className='ap-modal-cancel-icon'
                        ><CancelIcon /></div>
                        <Grid container spacing={5} >
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Program Name"
                                    variant='outlined'
                                    type="text"
                                    name="program_name"
                                    fullWidth
                                    value={programData.program_name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Trainer Name"
                                    variant='outlined'
                                    fullWidth
                                    type="text" name="trainer" value={programData.trainer} onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Program Description"
                                    variant='outlined'
                                    fullWidth
                                    multiline
                                    name="description" value={programData.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Program Duration"
                                    variant='outlined'
                                    fullWidth
                                    type="text" name="duration" value={programData.duration} onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    // label="program Duration"
                                    variant='outlined'
                                    fullWidth
                                    type="file" name="files" multiple onChange={handleFileChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className='text-center'>
                                    <Btn
                                        label='Save Program'
                                        onClick={handleEditSubmit}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Modal>

        )
    }

    const handleEdit = (e) => {
        setProgramData({
            program_name: e?.program_name,
            description: e?.description,
            duration: e?.duration,
            trainer: e?.trainer,
            program_id: e?.program_id,
        });
        // setFiles([...e?.image_url]);
        setIsEditing(true);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('program_name', programData.program_name);
        formData.append('description', programData.description);
        formData.append('duration', programData.duration);
        formData.append('trainer', programData.trainer);
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await axios.put(`${API_BASE_URL}program/${programData?.program_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsLoading(false);
            setSeverity('success')
            setSnackMsg('program Saved Successfully.');
            setOpenSnack(true);
            getPrograms();
            // Optionally, reset form fields here
            setIsEditing(false)
            setProgramData({
                program_name: '',
                description: '',
                duration: '',
                trainer: ''
            });
            setFiles([]);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setSnackMsg('Error in editing program. Please try again.')
            setOpenSnack(true);
        }
    };

    const handleDelete = (id) => {
        setIsLoading(true)
        deleteData(`/program/${id}`).then((response) => {
            if (response.success) {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setSeverity('success');
                getPrograms();
                setIsLoading(false);
            } else {
                setSnackMsg(response.error);
                setOpenSnack(true);
                setIsLoading(false);
            }
        })
            .catch((error) => {
                setSnackMsg(error.error ?? error.msg ?? "Network Error");
                setOpenSnack(true);
                setIsLoading(false);
            });
    }

    const handleDetail = (program) => {
        navigate('/adminPanel/CardDetails', {
            state: program
        })
    }

    return (
        <>
            {/* program creation form  */}
            <div className="ap-upperMost">
                <div className="dashboard-pd" />
                <div>
                    <div
                        onClick={() => setIsAdding(!isAdding)}
                        className="ap-add-user-btn">Add Training</div>
                </div>
            </div>
            {isAdding && <div>
                <div className="heading2 text-center mb-20">Training Details</div>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Grid container spacing={5} >
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Program Name"
                            variant='outlined'
                            type="text"
                            name="program_name"
                            fullWidth
                            value={programData.program_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Trainer Name"
                            variant='outlined'
                            fullWidth
                            type="text" name="trainer" value={programData.trainer} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Program Description"
                            variant='outlined'
                            fullWidth
                            multiline
                            name="description" value={programData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Program Duration"
                            variant='outlined'
                            fullWidth
                            type="text" name="duration" value={programData.duration} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            // label="program Duration"
                            variant='outlined'
                            fullWidth
                            type="file" name="files" multiple onChange={handleFileChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='text-center'>
                            <Btn
                                label='Create Program'
                                onClick={handleSubmit}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>}
            <div className="heading2 mb-40" >All Trainings</div>
            <div style={{ margin: '20px 0px' }}>
                <Grid container spacing={5}>
                    {programs && programs.length > 0 &&
                        programs.map((e, i) => {
                            console.log(e?.img_url)
                            return (
                                <Grid item key={i} md={4} sm={6} xs={12}>
                                    <Card
                                        name={e?.program_name}
                                        description={e?.description}
                                        duration={e?.duaration}
                                        showControls={true}
                                        onEdit={() => handleEdit(e)}
                                        onDelete={() => handleDelete(e?.program_id)}
                                        onDetail={() => handleDetail(e)}
                                         img={e?.img_url}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>

            {editModal()}
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </>
    );
};

export default TrainingManagement;
