import { Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import InputField from "../../../../components/inputField/InputField";
import CheckBox from "../../../../components/checkBox1/CheckBox";
import SelectBox from "../../../../components/selectBox/SelectBox";
import Btn from "../../../../components/btn/Btn";
import { putData } from "../../../../config/apiCalls";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";


export default function VipBuyersModal({ open, onClose, user }) {
    const [dataObj, setDataObj] = useState({});
    let [isLoading, setIsLoading] = useState(false)


    const addData = (label, value) => {
        dataObj[label] = value;
        setDataObj({ ...dataObj });
    }

    const handleSubmit = () => {
        setIsLoading(true);

        putData(`newsletter/${dataObj?._id}`, dataObj).then(response => {
            setIsLoading(false);
            console.log(response)
            toast.success(response?.message);
            onClose()
        }).catch(err => {
            setIsLoading(false);
            toast.error(err?.message || 'Network Error')
        })
    }

    useEffect(() => {
        setDataObj(user)
    }, [user])

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

                        <div >
                            <InputField
                                label='First Name'
                                placeholder='John'
                                value={dataObj?.firstName}
                                onChange={(e) => addData('firstName', e.target.value)}

                            />
                            <InputField
                                label='Last Name'
                                placeholder='Doe'
                                value={dataObj?.lastName}
                                onChange={(e) => addData('lastName', e.target.value)}
                            />

                            <InputField
                                label='Email'
                                value={dataObj?.email}
                                placeholder='Enter your email'
                                onChange={(e) => addData('email', e.target.value)}
                            />
                            <InputField
                                label='Phone Number'
                                value={dataObj?.phone}
                                placeholder='Enter your phone number '
                                onChange={(e) => addData('phone', e.target.value)}
                            />

                            <div className='text-center'>
                                <Btn
                                    label='Update'
                                    onClick={handleSubmit}
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