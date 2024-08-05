import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import { Grid } from '@mui/material'
import Snack from '../../components/snack/Snack'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { getData, postData } from '../../config/apiCalls'
import Card from '../../components/card/Card'
import Footer from '../../components/footer/Footer'
import { isLoggedIn } from '../../utils/utils'




export default function Courses() {
    let [courses, setCourses] = useState([]);
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
        } else {
            submitApplication(e.course_id)
        }
    }

    const submitApplication = (id) => {
        const dataObj = {
            std_id: 1,
            course_id: id,
        }
        setIsLoading(true)

        postData(`create_application/course/${id}/1`, dataObj).then((response) => {
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


    const status = isLoggedIn();




    return (
        <div>
            {status !== true && <NavBar />}

            <section>
                <div className="about-sec-5" style={{ paddingBottom: '20px' }}>
                    <div className="about-sec5-circle" data-aos="zoom-in"></div>


                    <div className="about-sec5-body">
                        <div className="heading1" style={{ margin: '40px 0px' }} >All  Courses</div>

                        <Grid container spacing={4}>
                            {courses && courses.map((e, i) => {
                                return (
                                    <Grid item key={i} md={4} sm={6} xs={12}>
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
                    <div style={{ height: '30px' }} />

                </div>
            </section >

            {status !== true && <Footer />}

            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div >
    )
}


