import React, { useEffect, useState } from 'react'
import './Emails.css'
import { Grid } from '@mui/material'
import InputField from '../../../../components/inputField/InputField'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import toast from 'react-hot-toast'
import { getData, postData } from '../../../../config/apiCalls'
import SelectBox from '../../../../components/selectBox/SelectBox'
import Btn from '../../../../components/btn/Btn'

const types = ['Send Single Email', 'Send Multiple Emails']

export default function Emails() {
    let [type, setType] = useState('Send Single Email')
    const navigate = useNavigate();
    let [dataObj, setDataObj] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [users, setUsers] = useState([])

    const addData = (key, value) => {
        dataObj[key] = value;
        setDataObj({ ...dataObj });
    }


    function sendEmails() {
        setIsLoading(true)

        postData('admin/send-emails', dataObj).then((response) => {
            dataObj.subject = '',
                dataObj.message = '',
                setDataObj({ ...dataObj })
            toast.success(response.message)
            setIsLoading(false)
        }
        ).catch((err) => {
            toast.error('Error in sending Email(s)')
            setIsLoading(false)
        })

    }

    function getUsers() {
        setIsLoading(true)

        getData('users').then((response) => {
            setIsLoading(false)
            const emails = response?.users?.map(user => user.email);
            const sortedEmails = emails.sort();
            setUsers(sortedEmails)

        }
        ).catch((err) => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div className='emails-ap' >
            <Grid container spacing={2}>

                <Grid item sm={7} xs={12}>
                    <SelectBox
                        label='Receiver Email(s)'
                        options={users}
                        onSelect={val => addData('emails', val)}
                        defaultValue={dataObj?.email}
                        multiSelect={true}
                    />
                </Grid>

                <Grid item sm={7} xs={12}>
                    <InputField
                        onChange={(e) => addData('subject', e.target.value)}
                        placeholder='Subject'
                        value={dataObj?.subject}
                    />
                </Grid>
                <Grid item sm={9} xs={12}>
                    <InputField
                        placeholder='Message'
                        onChange={(e) => addData('message', e.target.value)}
                        isTextarea={true}
                        value={dataObj?.message}
                    />
                </Grid>
            </Grid>
            <div className='mt-30' style={{ display: 'flex', justifyContent: 'center' }} >
                <Btn
                    label='Send'
                    onClick={sendEmails}
                />
            </div>

            <Loader isLoading={isLoading} />
        </div>
    )
}
