import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import Slider from '../../components/slider/Slider'
import './Home.css'
import { Grid } from '@mui/material'
import Btn from '../../components/btn/Btn'
import Snack from '../../components/snack/Snack'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../config/apiCalls'
import JobCard from '../../components/jobCard/JobCard'
import Card from '../../components/card/Card'
import { isLoggedIn } from '../../utils/utils'




export default function Home() {
    let [courses, setCourses] = useState([]);
    let [programs, setPrograms] = useState([]);
    let [jobs, setJobs] = useState([]);
    let [jobsToRender, setJobsToRender] = useState([]);
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
                setJobsToRender(response?.data)
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

    // courses

    const getCourses = () => {
        setIsLoading(true)
        getData(`courses`).then((response) => {
            if (response.success) {
                setCourses(response?.data)
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

    const handleDetail = (course) => {
        navigate('/CardDetails', {
            state: course
        })
    }

    useEffect(() => {
        getCourses();
    }, [])

    //Handle Enroll Now
    const handleApply = (e) => {
        const status = isLoggedIn();
        if (!status) {
            alert("Please Login your account.");
            navigate('/SignIn')
        }
    }


    // trainigns 
    const getPrograms = () => {
        setIsLoading(true)
        getData(`programs`).then((response) => {
            if (response.success) {
                setPrograms(response?.data);
                setIsLoading(false);
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

    return (
        <div>
            <NavBar />
            <Slider />
            <section>
                <div className="about-sec-5" style={{ paddingBottom: '20px' }}>
                    <div className="about-sec5-circle" data-aos="zoom-in"></div>
                    <Grid container>
                        <Grid item sm={8}>
                            <div className="about-sec5-header" >
                                <div className="heading1" data-aos="fade-up">Featured Courses</div>
                                <div className="about-text about-sec4-text" data-aos="fade-up">Discover our featured maritime courses designed to equip you with the skills needed for a successful career at sea. From navigation to marine engineering, we've got you covered.</div>
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            {/* <img src={partners1} className='about-sec5-header-img' /> */}
                        </Grid>
                    </Grid>
                    <div className="about-sec5-body">
                        <Grid container spacing={4}>
                            {courses && courses.map((e, i) => {
                                return (
                                    <Grid item key={i} md={4} sm={6} xs={12} data-aos='zoom-in'>
                                        <Card
                                            name={e?.course_name}
                                            description={e?.description}
                                            duration={e?.duaration}
                                            onApply={() => handleApply(e)}
                                            onDetail={() => handleDetail(e)}
                                            img={e?.image_url}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                    <div data-aos="fade-up">
                        <Btn label="SHOW ALL COURSES" onClick={() => navigate('/Courses')} style={{ margin: '50px auto' }} />
                    </div>
                </div>
            </section >
            <section>
                <div className="about-sec-5" style={{ paddingBottom: '20px' }}>
                    <div className="about-sec5-circle" style={{ left: '-550px' }} data-aos="zoom-in"></div>
                    <Grid container>
                        <Grid item sm={4}>
                        </Grid>
                        <Grid item sm={8}>
                            <div className="about-sec5-header">
                                <div className="heading1" data-aos="fade-up">Featured Trainings</div>
                                <div className="about-text about-sec4-text" data-aos="fade-up">Explore our spotlighted maritime trainings tailored to empower you with essential skills for a successful career at sea. From navigation techniques to advanced marine engineering, we've curated a comprehensive selection to ensure your proficiency in every aspect of maritime expertise.
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                    <div className="about-sec5-body">
                        <Grid container spacing={4}>
                            {programs && programs.map((e, i) => {
                                return (
                                    <Grid item key={i} md={4} sm={6} xs={12} data-aos='zoom-in'>
                                        <Card
                                            name={e?.program_name}
                                            description={e?.description}
                                            duration={e?.duaration}
                                            onDetail={() => handleDetail(e)}
                                            onApply={() => handleApply(e)}
                                            img={e?.img_url}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                    <div data-aos="fade-up">
                        <Btn label="SHOW ALL TRAININGS" onClick={() => navigate('/Trainings')} style={{ margin: '50px auto' }} />
                    </div>
                </div>
            </section >
            <section>
                <div className="about-sec-5" style={{ paddingBottom: '20px' }}>
                    <div className="about-sec5-circle" data-aos="zoom-in"></div>
                    <div className="about-sec5-body">
                        <div className="heading1" style={{ margin: '40px 0px' }} >All Jobs</div>
                        <Grid container spacing={4}>
                            {jobsToRender && jobsToRender.map((e, i) => {
                                return (
                                    <Grid item key={i} xs={12} data-aos="zoom-in">
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
                    <div data-aos="fade-up">
                        <Btn label="SHOW ALL JOBSS" onClick={() => navigate('/Jobs')} style={{ margin: '50px auto' }} />
                    </div>
                </div>
            </section >
            <div style={{ height: '30px' }} />
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div >
    )
}


