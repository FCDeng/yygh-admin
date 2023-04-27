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
import { TableGrid } from '@/components';
import orderInfoApi from '@/api/order/orderInfo'
import { useForm, Controller } from 'react-hook-form'

const OrderPage = () => {
    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([])
    const [statusList, setStatusList] = useState([])
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
        let orderComment = ''
        if (data?.orderStatus) {
            orderComment = statusList.find(item => item.comment == data?.orderStatus).status
        }
        orderInfoApi.getPageList(1, 40, { orderStatus: orderComment }).then(
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
        // setCreateTimeBegin([dayjs(), dayjs()])
        setOrderStatusName('')
        reset()
        getData()
    }
    const goDetail = (id) => {
        navigate(`/order/detail?id=${id}`)
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
        { field: 'authStatusString', headerName: '安排时间', width: 130, renderCell: ({ row }) => (<Typography>{row?.reserveDate}</Typography>) },
        { field: 'patientName', headerName: '患者', width: 130 },
        { field: 'number', headerName: '预约号序', width: 80 },
        { field: 'amount', headerName: '服务费', width: 80 },
        { field: 'orderStatusString', headerName: '安排时间', width: 130, renderCell: ({ row }) => (<Typography>{row?.param?.orderStatusString}</Typography>) },
        { field: 'createTime', headerName: '创建时间', width: 200 },
        {
            field: 'actions', headerName: '操作', width: 260,
            renderCell: ({ row }) => {
                return <Stack direction={'row'} spacing={0.4}>
                    <Button onClick={() => goDetail(row.id)} variant="contained" >详情</Button>
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
                {/* <TextField
                    type="text"
                    name="hosname"
                    sx={{ width: 240 }}
                    {...register('hosname')}
                    label={'医院名称'}
                /> */}
                {/* <TextField
                    type="text"
                    name="outTradeNo"
                    sx={{ width: 240 }}
                    {...register('outTradeNo')}
                    label={'订单号'}
                /> */}
                {/* <TextField
                    type="text"
                    name="patientName"
                    sx={{ width: 240 }}
                    {...register('patientName')}
                    label={'患者名称'}
                /> */}
                {/* </Stack>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2 }} > */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="出生日期"
                            name={'reserveDate'}
                            // value={reserveDate}
                            {...register("reserveDate")}
                        // onChange={handleChange} 
                        />
                    </DemoContainer>
                </LocalizationProvider> */}
                <FormControl sx={{ width: 300 }} >
                    <InputLabel id="orderStatus">订单状态：</InputLabel>
                    <Select
                        labelId="orderStatus"
                        id="orderStatus"
                        // value={orderStatusName}
                        label="订单状态："
                        onChange={handleOrderChange}
                        name='orderStatus'
                        {...register("orderStatus")}
                    >
                        {statusList.map(item => (<MenuItem key={item.comment} value={item.comment}>{item.comment}</MenuItem>))}
                    </Select>
                </FormControl>
                <Button type='submit' color="primary" variant='contained'>查询</Button>
                <Button onClick={resetHandle} color="primary">清空</Button>
            </Stack>
        </Box>

        <TableGrid rows={list} columns={columns} />
    </Box>
}

export default OrderPage