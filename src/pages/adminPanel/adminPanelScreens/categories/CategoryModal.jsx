import { Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import InputField from "../../../../components/inputField/InputField";
import CheckBox from "../../../../components/checkBox1/CheckBox";
import SelectBox from "../../../../components/selectBox/SelectBox";
import Btn from "../../../../components/btn/Btn";
import { postData, putData } from "../../../../config/apiCalls";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";
import FileUpload from "../../../../components/fileInput/FileUpload";


export default function CategoryModal({ open, onClose, category, isEdit }) {
    const [dataObj, setDataObj] = useState({});
    let [isLoading, setIsLoading] = useState(false)


    const addData = (label, value) => {
        dataObj[label] = value;
        setDataObj({ ...dataObj });
    }

    const handleUploadPhoto = async (images) => {
        setIsLoading(true)
        if (images) {
            try {
                const formData = new FormData();
                formData.append('files', images[0]);
                const response = await postData('upload-images', formData); // Replace with actual API route
                toast.success('Image uploaded successfully');
                addData('image', response?.images[0])
            } catch (error) {
                toast.error(error.message || 'Error in uploading Image');
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            toast.error("Select Image")
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);

        postData(`categories`, dataObj).then(response => {
            setIsLoading(false);
            console.log(response)
            toast.success(response?.message);
            onClose()
        }).catch(err => {
            setIsLoading(false);
            toast.error(err?.message || 'Network Error')
        })
    }

    const handleUpdate = () => {
        setIsLoading(true);

        putData(`categories/${dataObj?._id}`, dataObj).then(response => {
            setIsLoading(false);
            toast.success(response?.message);
            onClose()
        }).catch(err => {
            setIsLoading(false);
            toast.error(err?.message || 'Network Error')
        })
    }

    useEffect(() => {
        setDataObj(category)
    }, [category])

    const innerDivClick = (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the outer div
    };


    return (
        <div>
            <Modal open={open}>
                <div className="modal-style" onClick={onClose}>
                    <div className="modal-content" onClick={innerDivClick}>
                        <div
                            className="modal-close"
                            onClick={onClose}>
                            <CloseIcon sx={{ fontSize: 29, color: 'green', cursor: 'pointer' }} />
                        </div>

                        <div className='sign-right1'>
                            <InputField
                                label='Tiltle'
                                placeholder='Enter Tilte'
                                value={dataObj?.name}
                                onChange={(e) => addData('name', e.target.value)}
                            />
                            <InputField
                                label='Description'
                                placeholder='Enter Description'
                                value={dataObj?.description}
                                onChange={(e) => addData('description', e.target.value)}
                            />
                            <FileUpload
                                label='Upload Photo'
                                multiple={false}
                                onFilesChange={handleUploadPhoto}
                                hideNames={true}
                            />
                            <div className="category-img">
                                <img src={dataObj.image} alt="img" />
                            </div>
                            <div className='text-center'>
                                <Btn
                                    label={isEdit ? 'Update' : 'Add'}
                                    onClick={isEdit ? handleUpdate : handleSubmit}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
            <Loader isLoading={isLoading} />
        </div>

    );
}