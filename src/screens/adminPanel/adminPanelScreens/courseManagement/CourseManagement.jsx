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


const CourseManagement = () => {
  let [isAdding, setIsAdding] = useState(false);
  let [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    getCourses();
  }, [])

  // course creation handling 
  const [courseData, setCourseData] = useState({
    course_name: '',
    description: '',
    duration: '',
    instructor: ''
  });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('course_name', courseData.course_name);
    formData.append('description', courseData.description);
    formData.append('duration', courseData.duration);
    formData.append('instructor', courseData.instructor);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}course`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsLoading(false);
      setSeverity('success')
      setSnackMsg('Course Added Successfully.');
      setOpenSnack(true);
      getCourses();
      // Optionally, reset form fields here
      setCourseData({
        course_name: '',
        description: '',
        duration: '',
        instructor: ''
      });
      setFiles([]);
      setIsAdding(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setSnackMsg('Error creating course. Please try again.')
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
                  label="Course Name"
                  variant='outlined'
                  type="text"
                  name="course_name"
                  fullWidth
                  value={courseData.course_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  label="Instructor Name"
                  variant='outlined'
                  fullWidth
                  type="text" name="instructor" value={courseData.instructor} onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Description"
                  variant='outlined'
                  fullWidth
                  multiline
                  name="description" value={courseData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  label="Course Duration"
                  variant='outlined'
                  fullWidth
                  type="text" name="duration" value={courseData.duration} onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  // label="Course Duration"
                  variant='outlined'
                  fullWidth
                  type="file" name="files" multiple onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <div className='text-center'>
                  <Btn
                    label='Save Course'
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
    setCourseData({
      course_name: e?.course_name,
      description: e?.description,
      duration: e?.duration,
      instructor: e?.instructor,
      course_id: e?.course_id,
    });
    setFiles([...e.image_url]);
    setIsEditing(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('course_name', courseData.course_name);
    formData.append('description', courseData.description);
    formData.append('duration', courseData.duration);
    formData.append('instructor', courseData.instructor);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.put(`${API_BASE_URL}course/${courseData?.course_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsLoading(false);
      setSeverity('success')
      setSnackMsg('Course Saved Successfully.');
      setOpenSnack(true);
      getCourses();
      // Optionally, reset form fields here
      setIsEditing(false)
      setCourseData({
        course_name: '',
        description: '',
        duration: '',
        instructor: ''
      });
      setFiles([]);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setSnackMsg('Error in editing course. Please try again.')
      setOpenSnack(true);
    }
  };

  const handleDelete = (id) => {
    setIsLoading(true)
    deleteData(`/course/${id}`).then((response) => {
      if (response.success) {
        setSnackMsg(response.message);
        setOpenSnack(true);
        setSeverity('success');
        getCourses();
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

  const handleDetail = (course) => {
    navigate('/adminPanel/CardDetails', {
      state: course
    })
  }

  return (
    <>
      {/* course creation form  */}
      <div className="ap-upperMost">
        <div className="dashboard-pd" />
        <div>
          <div
            onClick={() => setIsAdding(!isAdding)}
            className="ap-add-user-btn">Add Course</div>
        </div>
      </div>
      {isAdding && <div>
        <div className="heading2 text-center mb-20">Course Details</div>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Grid container spacing={5} >
          <Grid item sm={6} xs={12}>
            <TextField
              label="Course Name"
              variant='outlined'
              type="text"
              name="course_name"
              fullWidth
              value={courseData.course_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              label="Instructor Name"
              variant='outlined'
              fullWidth
              type="text" name="instructor" value={courseData.instructor} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Course Description"
              variant='outlined'
              fullWidth
              multiline
              name="description" value={courseData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              label="Course Duration"
              variant='outlined'
              fullWidth
              type="text" name="duration" value={courseData.duration} onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              // label="Course Duration"
              variant='outlined'
              fullWidth
              type="file" name="files" multiple onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div className='text-center'>
              <Btn
                label='Create Course'
                onClick={handleSubmit}
              />
            </div>
          </Grid>
        </Grid>
      </div>}
      <div className="heading2 mb-40" >All Courses</div>
      <div style={{ margin: '20px 0px' }}>
        <Grid container spacing={5}>
          {courses && courses.length > 0 &&
            courses.map((e, i) => {
              return (
                <Grid item key={i} md={4} sm={6} xs={12}>
                  <Card
                    name={e?.course_name}
                    description={e?.description}
                    duration={e?.duaration}
                    showControls={true}
                    onEdit={() => handleEdit(e)}
                    onDelete={() => handleDelete(e?.course_id)}
                    onDetail={() => handleDetail(e)}
                    img={e?.image_url}
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

export default CourseManagement;
