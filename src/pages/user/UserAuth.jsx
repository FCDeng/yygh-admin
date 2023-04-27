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
import { TableGrid, message } from '@/components';
import userInfoApi from '@/api/user/userInfo'
import { useForm, Controller } from 'react-hook-form'
const UserAuth = () => {
    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([])
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
    useEffect(() => {
        getData()
    }, []);
    const getData = (data) => {
        userInfoApi.getPageList(1, 40, { keyword: data?.keyword || '', authStatus: 1 }).then(
            response => {
                setList(response.data.records)
            }
        )
    }
    const resetHandle = () => {
        // setCreateTimeBegin([dayjs(), dayjs()])
        reset()
        getData()
    }
    const approval = (id, authStatus) => {
        userInfoApi.approval(id, authStatus).then((response) => {
            getData()
            if (response.code) {
                console.log(response.code);
                message.success('操作成功!')
            }
        })
    }

    const columns = [
        { field: 'name', headerName: '姓名', width: 130 },
        { field: 'certificatesNo', headerName: '证件号', width: 200 },
        { field: 'createTime', headerName: '创建时间', width: 200 },
        {
            field: 'actions', headerName: '操作', width: 260,
            renderCell: ({ row }) => {
                return <Stack direction={'row'} spacing={0.4}>
                    <Button onClick={() => approval(row.id, 2)} variant="contained" >通过</Button>
                    <Button onClick={() => approval(row.id, -1)} variant="contained" >不通过</Button>
                </Stack>
            }
        },
    ]
    return <Box
        sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    // sx={{ bgcolor: 'white', width: '100%', height: '100%', p: 2, borderRadius: 2 }}
    >
        {/* <Typography sx={{ height: 30, fontWeight: 'bold' }}>医院列表</Typography> */}
        <Box component="form" className="form-page" onSubmit={handleSubmit(getData)}>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2 }} >
                <TextField
                    type="text"
                    // value={keyword}
                    // onChange={e => setKeyword(e.target.value)}
                    name="keyword"
                    sx={{ width: 240 }}
                    {...register('keyword')}
                    label={'姓名/手机'}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                        defaultValue={[dayjs(), dayjs()]}
                        onChange={(newValue) => setCreateTimeBegin(newValue)}
                        localeText={{ start: '开始时间', end: '截止时间' }} />
                </DemoContainer>
            </LocalizationProvider> */}
                <Button type='submit' color="primary" variant='contained'>查询</Button>
                <Button onClick={resetHandle} color="primary">清空</Button>
            </Stack>
        </Box>

        <TableGrid rows={list} columns={columns} />
    </Box>
}

export default UserAuth