import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import lodash from 'lodash'
import { TableGrid } from '@/components';
import orderInfoApi from '@/api/order/orderInfo'
import { useForm, Controller } from 'react-hook-form'

const DoctorOrderPage = () => {
    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([{
        id: 1,
        outTradeNo: 1,
        hosname: 1,
        depname: 2,
        title: 1,
        authStatusString: 1,
        patientName: 1,
        number: 1,
        amount: 1,
        orderStatusString: 1,
    },
    {
        id: 22,
        outTradeNo: 22,
        hosname: 22,
        depname: 22,
        title: 22,
        authStatusString: 22,
        patientName: 22,
        number: 22,
        amount: 22,
        orderStatusString: 22,
    }])
    const [statusList, setStatusList] = useState([])
    const [listCache, setListCache] = useState([])
    const [orderStatusName, setOrderStatusName] = useState('');
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
        defaultValues: { keyword: '' },
    })
    const [createTimeBegin, setCreateTimeBegin] = useState([dayjs(), dayjs()])
    const [keyword, setKeyword] = useState(null)
    const navigate = useNavigate()
    const [reserveDate, setReserveDate] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);
    useEffect(() => {
        getData()
        getStatusList()
    }, []);
    const getData = (data) => {
        orderInfoApi.getPageList(1, 40, { orderStatus: 1 }).then(
            response => {
                setList(response.data.records)
            }
        )
    }
    const getStatusList = () => {
        orderInfoApi.getStatusList().then(response => {
            setStatusList(response.data.filter(item => item.status != -1 && item.status != 2))
        })
    }
    const resetHandle = () => {
        reset()
        // getData()
        setListCache(listCache)
    }
    const goDetail = (id) => {
        navigate(`/doctorOrder/detail?id=${id}`)
    }
    const handleChange = (reserveDate) => {
        setReserveDate(reserveDate)
    }
    const handleOrderChange = (e) => {
        setOrderStatus(e.target.value)
    }
    const onFormSubmit = (data) => {
        getData(data)
    }

    const columns = [
        { field: 'outTradeNo', headerName: '订单交易号', width: 180 },
        { field: 'hosname', headerName: '医院名称', width: 130 },
        { field: 'depname', headerName: '科室名称', width: 130 },
        { field: 'title', headerName: '医生职称', width: 80 },
        { field: 'patientName', headerName: '患者', width: 130 },
        { field: 'reserveDate', headerName: '就诊时间', width: 130 },
        // { field: 'doctorOrder', headerName: '医嘱', width: 200 },
        // { field: 'createTime', headerName: '创建时间', width: 200 },
        {
            field: 'actions', headerName: '操作', width: 260,
            renderCell: ({ row }) => {
                return <Stack direction={'row'} spacing={0.4}>
                    <Button onClick={() => goDetail(row.id)} variant="contained" >{'编辑医嘱'}</Button>
                </Stack>
            }
        },
    ]
    return <Box
        sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    // sx={{ bgcolor: 'white', width: '100%', height: '100%', p: 2, borderRadius: 2 }}
    >
        {/* <Typography sx={{ height: 30, fontWeight: 'bold' }}>医院列表</Typography> */}
        <Box component="form" className="form-page" onSubmit={handleSubmit(onFormSubmit)}>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2 }} >
                <TextField
                    type="text"
                    name="hosname"
                    sx={{ width: 240 }}
                    {...register('hosname')}
                    label={'医院名称'}
                />
                <TextField
                    type="text"
                    name="outTradeNo"
                    sx={{ width: 240 }}
                    {...register('outTradeNo')}
                    label={'订单号'}
                />
                <TextField
                    type="text"
                    name="patientName"
                    sx={{ width: 240 }}
                    {...register('patientName')}
                    label={'患者名称'}
                />

                <Button type='submit' color="primary" variant='contained'>查询</Button>
                <Button onClick={resetHandle} color="primary">清空</Button>
            </Stack>
        </Box>

        <TableGrid rows={list} columns={columns} />
    </Box>
}


export default DoctorOrderPage