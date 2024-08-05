import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, deleteData, getData, postData, putData } from '../../../../config/apiCalls';
import Snack from '../../../../components/snack/Snack';
import Loader from '../../../../components/loader/Loader';
import { Grid, Modal, TextField } from '@mui/material';
import Btn from '../../../../components/btn/Btn';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import JobCard from '../../../../components/jobCard/JobCard';


const EmployerJobManagement = () => {
    let [isAdding, setIsAdding] = useState(false);
    let [isEditing, setIsEditing] = useState(false);
    let [jobs, setJobs] = useState([]);
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

    const getjobs = () => {
        setIsLoading(true)
        getData(`jobs`).then((response) => {
            if (response.success) {
                console.log(response?.data)
                const filtered = response.data.filter(e => e.employer_id == '1')
                setJobs([...filtered])
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
        getjobs();
    }, [])

    // program creation handling 
    const [jobData, setJobData] = useState({
        job_title: '',
        job_description: '',
        requirements: '',
        salary: '',
        location: '',
        PostingDate: '',
        ExpiryDate: '',
        employer_id: '1',
        location: '',
    });
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = () => {
        setIsLoading(true)
        const { job_title, job_description, requirements, salary, location, PostingDate, ExpiryDate, employer_id } = jobData;

        console.log(jobData)

        if (job_title && job_description && requirements && salary && location && PostingDate && ExpiryDate && employer_id) {
            // api call 
            postData('create_job', jobData).then((response) => {
                console.log(response)
                if (response.success) {
                    setIsLoading(false);
                    setSeverity('success')
                    setSnackMsg('Job Added Successfully.');
                    setOpenSnack(true);
                    getjobs();

                    // Optionally, reset form fields here
                    setJobData({
                        job_title: '',
                        job_description: '',
                        requirements: '',
                        salary: '',
                        location: '',
                        PostingDate: '',
                        ExpiryDate: '',
                        employer_id: '1',
                        location
                    });
                    setFiles([]);
                    setIsAdding(false);

                } else {
                    setSnackMsg(response.msg ?? 'Error in Adding Job');
                    setOpenSnack(true);
                    setIsLoading(false)
                }
            })
                .catch((error) => {
                    console.log(error)
                    setSnackMsg(error.error ?? "Network Error");
                    setOpenSnack(true);
                    setIsLoading(false)
                });
        } else {
            setSnackMsg('Required Fields are missing!')
            setOpenSnack(true)
            setIsLoading(false)

        }
    }


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
                                    label="Job Title"
                                    variant='outlined'
                                    type="text"
                                    name="job_title"
                                    fullWidth
                                    value={jobData?.job_title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Salary"
                                    variant='outlined'
                                    fullWidth
                                    type="text" name="salary" value={jobData?.salary} onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Job Descritpion"
                                    variant='outlined'
                                    fullWidth
                                    multiline
                                    name="job_description" value={jobData?.job_description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Requirements"
                                    variant='outlined'
                                    fullWidth
                                    type="text" name="requirements" value={jobData?.requirements} onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Location"
                                    variant='outlined'
                                    fullWidth
                                    type="text" name="location" value={jobData?.location} onChange={handleChange}
                                />
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Posting Date"
                                    variant='outlined'
                                    fullWidth
                                    type="text" name="PostingDate" value={jobData?.PostingDate} onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Expiry Date"
                                    variant='outlined'
                                    fullWidth
                                    type="text" name="ExpiryDate" value={jobData?.ExpiryDate} onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <div className='text-center'>
                                    <Btn
                                        label='Update Job'
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
        setJobData({ ...e });
        setIsEditing(true);
    }

    const handleEditSubmit = () => {
        setIsLoading(true)
        const { job_title, job_description, requirements, salary, location, PostingDate, ExpiryDate, employer_id } = jobData;

        console.log(jobData)

        if (job_title && job_description && requirements && salary && location && PostingDate && ExpiryDate && employer_id) {
            // api call 
            putData(`update_job/${jobData?.job_id}`, jobData).then((response) => {
                console.log(response)
                if (response.success) {
                    setIsLoading(false);
                    setSeverity('success')
                    setSnackMsg('Job Updated Successfully.');
                    setOpenSnack(true);
                    getjobs();
                    setIsEditing(false)
                    // Optionally, reset form fields here
                    setJobData({
                        job_title: '',
                        job_description: '',
                        requirements: '',
                        salary: '',
                        location: '',
                        PostingDate: '',
                        ExpiryDate: '',
                        employer_id: '1',
                        location
                    });
                } else {
                    setSnackMsg(response.msg ?? 'Error in Updating Job');
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


    const handleDelete = (id) => {
        setIsLoading(true)
        deleteData(`/delete_job/${id}`).then((response) => {
            if (response.success) {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setSeverity('success');
                getjobs();
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
                        className="ap-add-user-btn">Add Job</div>
                </div>
            </div>
            {isAdding && <div>
                <div className="heading2 text-center mb-20">Job Details</div>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Grid container spacing={5} >
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Job Title"
                            variant='outlined'
                            type="text"
                            name="job_title"
                            fullWidth
                            value={jobData?.job_title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Salary"
                            variant='outlined'
                            fullWidth
                            type="text" name="salary" value={jobData?.salary} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Job Descritpion"
                            variant='outlined'
                            fullWidth
                            multiline
                            name="job_description" value={jobData?.job_description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Requirements"
                            variant='outlined'
                            fullWidth
                            type="text" name="requirements" value={jobData?.requirements} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Location"
                            variant='outlined'
                            fullWidth
                            type="text" name="location" value={jobData?.location} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Posting Date"
                            variant='outlined'
                            fullWidth
                            type="text" name="PostingDate" value={jobData?.PostingDate} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            label="Expiry Date"
                            variant='outlined'
                            fullWidth
                            type="text" name="ExpiryDate" value={jobData?.ExpiryDate} onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <div className='text-center'>
                            <Btn
                                label='Post Job'
                                onClick={handleSubmit}

                            />
                        </div>
                    </Grid>
                </Grid>
            </div>}
            <div className="heading2 mb-40" >Jobs</div>
            <div style={{ margin: '20px 0px' }}>
                <Grid container spacing={5}>
                    {jobs && jobs.length > 0 &&
                        jobs.map((e, i) => {
                            return (
                                <Grid item key={i} xs={12}>
                                    <JobCard
                                        name={e?.job_title}
                                        job_description={e?.job_job_description}
                                        requirements={e?.requirements}
                                        location={e?.location}
                                        salary={e?.salary}
                                        postingDate={e?.PostingDate}
                                        expiryDate={e?.ExpiryDate}
                                        showControls={true}
                                        onEdit={() => handleEdit(e)}
                                        onDelete={() => handleDelete(e?.job_id)}
                                        onDetail={() => handleDetail(e)}
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

export default EmployerJobManagement;
