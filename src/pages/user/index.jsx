import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { TableGrid } from '@/components';
import hospApi from '../../api/hosp/hosp'
const UserPage = () => {
    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([
        {
            id: 1, phone: 'phone', name: 'name', statusString: 'statusString',
            authStatusString: 'authStatusString', createTime: 1
        },
    ])
    const [createTimeBegin, setCreateTimeBegin] = useState([dayjs(), dayjs()])
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
        setHosp('')
        setCreateTimeBegin([dayjs(), dayjs()])
        getData()
    }
    const goDetail = (id) => {
        navigate('/user/detail', { state: { id } })
    }

    const columns = [
        { field: 'phone', headerName: '手机号', width: 130 },
        // { field: 'nickName', headerName: '昵称', width: 130 },
        { field: 'name', headerName: '姓名', width: 130 },
        { field: 'statusString', headerName: '状态', width: 130, renderCell: (row) => (<Typography>{row?.param?.statusString}</Typography>) },
        { field: 'authStatusString', headerName: '认证状态', width: 130, renderCell: (row) => (<Typography>{row?.param?.authStatusString}</Typography>) },
        { field: 'createTime', headerName: '创建时间', width: 130 },
        {
            field: 'actions', headerName: '操作', width: 160,
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
        <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2 }} >
            <TextField
                type="text"
                name="keyword"
                sx={{ width: 140 }}
                defaultValue={hosp}
                label={'姓名/手机'}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                        defaultValue={[dayjs(), dayjs()]}
                        onChange={(newValue) => setCreateTimeBegin(newValue)}
                        localeText={{ start: '开始时间', end: '截止时间' }} />
                </DemoContainer>
            </LocalizationProvider>
            <Button onClick={getData} color="primary" variant='contained'>查询</Button>
            <Button onClick={reset} color="primary">清空</Button>
        </Stack>
        <TableGrid rows={list} columns={columns} />
    </Box>
}

export default UserPage