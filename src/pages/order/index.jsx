import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import { useState, useEffect, useRef } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TableGrid } from '@/components';
import hospApi from '../../api/hosp/hosp'
const OrderPage = () => {
    const refDateRange = useRef()
    const [hosp, setHosp] = useState('')
    const [reverseDate, setReverseDate] = useState()
    const [hosname, setHosname] = useState(null)
    const [list, setList] = useState([
        {
            id: 1, phone: 'phone', name: 'name', statusString: 'statusString',
            authStatusString: 'authStatusString', createTime: 1
        },
    ])
    const [createTimeBegin, setCreateTimeBegin] = useState([null, null])
    const [keyword, setKeyword] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        // if (user.userStateIndex) {
        //     setShowHospIndex(user.userStateIndex)
        //     dispatch(SET_UserStateIndex({ userStateIndex: 0 }))
        // }
        getData()
    }, []);
    const getData = () => {
        hospApi.getPageList(1, 40, { keyword, createTimeBegin }).then(response => {
            //每页数据集合
            setList(response.data.content)
        })
    }
    const reset = () => {
        setHosname(null)
        setCreateTimeBegin(['', ''])
        setReverseDate(null)
        getData()
    }
    const goDetail = (id) => {
        navigate('/order/detail', { state: { id } })
    }
    const reserveDateChange = (reverseTime) => {
        setReverseDate(reverseTime)
    }

    const columns = [
        { field: 'outTradeNo', headerName: '订单交易号', width: 80 },
        { field: 'hosname', headerName: '医院名称', width: 80 },
        { field: 'depname', headerName: '科室名称', width: 80 },
        { field: 'title', headerName: '医生职称', width: 80 },
        { field: 'reserveDate', headerName: '安排时间', width: 80, renderCell: (row) => (<Typography>{row?.reserveDate}</Typography>) },
        { field: 'patientName', headerName: '就诊人', width: 80 },
        { field: 'number', headerName: '预约号序', width: 80 },
        { field: 'amount', headerName: '服务费', width: 80 },
        { field: 'orderStatusString', headerName: '订单状态', width: 80 },
        { field: 'createTime', headerName: '创建时间', width: 80 },
        {
            field: 'actions', headerName: '操作', width: 80,
            renderCell: ({ row }) => {
                return <Stack direction={'row'} spacing={0.4}>
                    <Button onClick={() => goDetail(row.id)} variant="contained" >详情</Button>
                </Stack>
            }
        },
    ]
    return <Box component="form"> <Box
        sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    // sx={{ bgcolor: 'white', width: '100%', height: '100%', p: 2, borderRadius: 2 }}
    >
        {/* <Typography sx={{ height: 30, fontWeight: 'bold' }}>医院列表</Typography> */}
        <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2 }} >
            <TextField
                type="text"
                name="keyword"
                sx={{ width: 140, mt:1 }}
                defaultValue={hosname}
                label={'医院名称'}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                        ref={refDateRange}
                        // defaultValue={[dayjs(), dayjs()]}
                        value={createTimeBegin}
                        onChange={(newValue) => setCreateTimeBegin(newValue)}
                        localeText={{ start: '开始时间', end: '截止时间' }} />
                </DemoContainer>
            </LocalizationProvider> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="就诊日期"
                        sx={{ width: 140 }}
                        value={reverseDate}
                        onChange={reserveDateChange} />
                </DemoContainer>
            </LocalizationProvider>
            <Button onClick={getData} color="primary" variant='contained'>查询</Button>
            <Button type='reset' color="primary">清空</Button>
        </Stack>
        <TableGrid rows={list} columns={columns} />
    </Box>
    </Box>
}

export default OrderPage