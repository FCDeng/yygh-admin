import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, FormControlLabel } from '@mui/material';
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { TableGrid, message } from '@/components';
import hospitalSetApi from '@/api/hosp/hospitalSet'
import { useForm, Controller, } from 'react-hook-form'
import { rest } from 'lodash';

const HospitalSetAddPage = () => {
    const [search, setSearch] = useSearchParams()
    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [multipleSelection, setMultipleSelection] = useState([])
    const [hospitalSet, setHospitalSet] = useState({})
    const id = search.get('id')
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { hosname: '', hoscode: '', apiUrl: '', contactsName: '', contactsPhone: '' },
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (id) getData()
    }, []);
    const getData = () => {
        hospitalSetApi.getHospSet(id).then(response => {
            // setDefaultValues(response.data)
            reset(response.data)
            setHospitalSet(response.data)
        })
    }
    const onFormSubmit = (data) => {
        if (id) {
            hospitalSetApi.updateHospSet(data).then(response => {
                message.success('修改成功!')
                navigate('/hospital/set')
            })
        } else {
            hospitalSetApi.saveHospSet(data).then(response => {
                message.success('添加成功!')
                navigate('/hospital/set')
            })
        }
    }
    const resetHandle = () => {
        reset()
        getData()
    }


    return <Box
        sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    // sx={{ bgcolor: 'white', width: '100%', height: '100%', p: 2, borderRadius: 2 }}
    >
        {/* <Typography sx={{ height: 30, fontWeight: 'bold' }}>医院列表</Typography> */}
        <Box component="form" className="form-page" onSubmit={handleSubmit(onFormSubmit)}>
            <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }} >
                <FormControlLabel label="医院名称: " sx={{ m: 0 }} labelPlacement='start' control={<TextField
                    type="text"
                    required
                    sx={{ width: 340 }}
                    {...register('hosname', { required: true })}
                />}></FormControlLabel>
                <FormControlLabel label="医院编号: " labelPlacement='start' control={<TextField
                    type="text"
                    required
                    name="hoscode"
                    sx={{ width: 340 }}
                    {...register('hoscode', { required: true })}
                />}></FormControlLabel>
                <FormControlLabel label="api基础路径: " labelPlacement='start' control={<TextField
                    type="text"
                    required
                    name="apiUrl"
                    sx={{ width: 340 }}
                    {...register('apiUrl', { required: true })}
                />}></FormControlLabel>

                <FormControlLabel label="联系人姓名: " labelPlacement='start' control={<TextField
                    type="text"
                    required
                    name="contactsName"
                    sx={{ width: 340 }}
                    {...register('contactsName', { required: true })}
                />}></FormControlLabel>
                <FormControlLabel label="联系人手机: " labelPlacement='start' control={<TextField
                    type="text"
                    required
                    name="contactsPhone"
                    sx={{ width: 340 }}
                    {...register('contactsPhone', { required: true })}
                />}></FormControlLabel>
            </Stack>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center' }} >
                <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button>
                <Button type='submit' color="primary" variant='contained'>保存</Button>
            </Stack>
        </Box>
    </Box>
}

export default HospitalSetAddPage