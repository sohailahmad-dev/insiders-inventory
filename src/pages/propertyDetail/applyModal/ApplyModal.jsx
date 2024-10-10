import { Grid, Modal } from "@mui/material";
import './ApplyModal.css';
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Btn from '../../../components/btn/Btn'
import InputField from "../../../components/inputField/InputField";
import SelectBox from "../../../components/selectBox/SelectBox";
import Loader from "../../../components/loader/Loader";
import { postData } from "../../../config/apiCalls";
import toast from "react-hot-toast";

export default function ApplyModal({ open, onClose, property }) {
    const [dataObj, setDataObj] = useState({});
    let [isLoading, setIsLoading] = useState(false);



    const addData = (label, value) => {
        dataObj[label] = value;
        setDataObj({ ...dataObj });
    }

    const handleSubmit = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser._id) {
            dataObj.userId = storedUser._id;
        }
        dataObj.propertyId = property?._id;
        console.log(dataObj)

        setIsLoading(true)
        postData('send-offer', dataObj).then((response) => {
            toast.success(response.message)
            setIsLoading(false)
            onClose()
        }
        ).catch((err) => {
            toast.error(err.message ?? 'Network Error')
            setIsLoading(false)
        })

    }



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
                        <div className="text-center mb-30">
                            <div className="heading2">Submit An Offer</div>
                            <div className="text">Please fill out the form below to make an offer.</div>
                        </div>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        placeholder='First Name'
                                        onChange={e => addData('firstName', e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={e => addData('lastName', e.target.value)}
                                        placeholder='Last Name'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={e => addData('companyName', e.target.value)}
                                        placeholder='Company Name'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={e => addData('email', e.target.value)}
                                        placeholder='Email'
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <InputField
                                        onChange={e => addData('offerAmount', e.target.value)}
                                        placeholder='Offer Amount ( $ )'
                                        inputType={'number'}
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <SelectBox
                                        label='Terms'
                                        options={['Cash', 'Conventional', 'FHA', 'Land Contract', 'Hard Money']}
                                        onSelect={(e) => addData('terms', e)}
                                    />
                                    {dataObj.terms === 'Land Contract' &&
                                        <div className="modal-text">
                                            Land Contract Terms: 20% Down Payment at 10% Interest.
                                        </div>}
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectBox
                                        label='Do you have a home to sell?'
                                        onSelect={(e) => addData('hasHomeToSell', e)}
                                        options={['Yes', 'No']}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Btn
                                            label='Submit'
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                </Grid>

                            </Grid>
                        </div>
                    </div>
                </div>
            </Modal>
            <Loader isLoading={isLoading} />
        </div>
    );
}