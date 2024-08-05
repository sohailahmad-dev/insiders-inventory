import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import { Grid } from '@mui/material'
import Snack from '../../components/snack/Snack'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { getData, postData } from '../../config/apiCalls'
import Card from '../../components/card/Card'
import Footer from '../../components/footer/Footer'
import JobCard from '../../components/jobCard/JobCard'
import { isLoggedIn } from '../../utils/utils'




export default function Jobs() {
    let [jobs, setJobs] = useState([]);
    let [cardsToRender, setCardsToRender] = useState([]);
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
                setJobs(response?.data)
                setCardsToRender(response?.data)
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


    const status = isLoggedIn();

    //Handle Apply Now
    const handleApply = (e) => {
        const status = isLoggedIn();
        if (!status) {
            alert("Please Login your account.");
            navigate('/SignIn')
        } else {
            submitApplication(e.job_id)
            console.log(e)
        }
    }

    const submitApplication = (id) => {
        const dataObj = {
            jobSeeker_id: 1,
            job_id: id,
        }
        setIsLoading(true)

        postData(`create_job_application`, dataObj).then((response) => {
            if (response.success) {
                setSnackMsg(response.message ?? response.msg);
                setOpenSnack(true);
                setSeverity('success')
                setIsLoading(false)
            } else {
                console.log(response)
                setSnackMsg(response.message);
                setOpenSnack(true);
                setIsLoading(false)
            }
        })
            .catch((error) => {
                console.log(error)
                setSnackMsg(error.error ?? error.msg ?? "Network Error");
                setOpenSnack(true);
                setIsLoading(false)
            });
    }




    return (
        <div>
            {status !== true && <NavBar />}
            <section>
                <div className="about-sec-5" style={{ paddingBottom: '20px' }}>
                    <div className="about-sec5-circle" data-aos="zoom-in"></div>
                    <div className="about-sec5-body">
                        <div className="heading1" style={{ margin: '40px 0px' }} >All Jobs</div>
                        <Grid container spacing={4}>
                            {cardsToRender && cardsToRender.map((e, i) => {
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
                                            onApply={() => handleApply(e)}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                    <div style={{ height: '30px' }} />

                </div>
            </section >

            {status !== true && <Footer />}
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div >
    )
}


