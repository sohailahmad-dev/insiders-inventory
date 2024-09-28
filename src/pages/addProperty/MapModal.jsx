import { Modal } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import toast from "react-hot-toast";
import SearchPlaceMap from "../../components/searchPlaceMap/SearchPlaceMap";
import Loader from "../../components/loader/Loader";


export default function MapModal({ open, onClose, user }) {
    const [dataObj, setDataObj] = useState({});
    let [isLoading, setIsLoading] = useState(false)



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

                        <SearchPlaceMap />
                    </div>
                </div>
            </Modal>
            <Loader isLoading={isLoading} />
        </div>

    );
}