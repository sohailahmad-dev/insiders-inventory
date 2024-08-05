import React, { useEffect, useState } from 'react'
import { getData } from '../../../../config/apiCalls';
import { useNavigate } from 'react-router-dom';
import Snack from '../../../../components/snack/Snack';
import Loader from '../../../../components/loader/Loader';

export default function JobApplication() {
    let [applications, setApplications] = useState([]);
    let [userData, setUserData] = useState({});
    const navigate = useNavigate();

    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error');
    let [snackMsg, setSnackMsg] = useState('');
    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }

    const getApplications = async () => {
        setIsLoading(true)
        getData(`job_applications`).then((response) => {
            if (response.success) {
                setIsLoading(false);
                const filtered = response.data.filter(e=>e.jobSeeker_id == userData.jobSeeker_id)
                setApplications([...filtered])
                console.log(filtered, userData)

                // setApplications(response.data)
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
        const storedUserData = localStorage.getItem("dataDetails");
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data);
            console.log(data)
        } else {
            navigate('/')
        }
        getApplications();

    }, [])


    return (
        <>
        <div>JobApplication</div>
        {(applications && applications.length > 0) ? 
        applications.map(e=>(
            <div>{e?.status}1</div>
        )):<div>No Applications Found</div>
        }
        <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
        <Loader isLoading={isLoading} />
        </>

    )
}
