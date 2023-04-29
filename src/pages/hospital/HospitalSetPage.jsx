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
import { TableGrid, message } from '@/components';
import hospitalSetApi from '@/api/hosp/hospitalSet'
import { useForm, Controller } from 'react-hook-form'

const HospitalSetPage = () => {
    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([
        {
            index: 'index',
            id: 'index',
            hosname: 'hosname',
            hoscode: 'hoscode',
            apiUrl: 'apiUrl',
            status: 'status',
            contactsName: 'contactsName',
            contactsPhone: 'contactsPhone',
        }
    ])
    const [statusList, setStatusList] = useState([])
    const [multipleSelection, setMultipleSelection] = useState([])
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
        defaultValues: { hosname: '', hoscode: '' },
    })
    const [createTimeBegin, setCreateTimeBegin] = useState([dayjs(), dayjs()])
    const [keyword, setKeyword] = useState(null)
    const navigate = useNavigate()
    const [reserveDate, setReserveDate] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);
    useEffect(() => {
        getData()
    }, []);
    const getData = (data = { hosname: '', hoscode: '' }) => {
        hospitalSetApi.getPageList(1, 4, data).then(response => {
            setList(response.data.records)
        }).catch(error => {
            console.log(error)
        })
    }
    //删除医院设置的方法
    const removeDataById = (id) => {
        hospitalSetApi.deleteHospSet(id).then(response => {
            message.success('删除成功！')
            getData()
        })
    }
    // 当表格复选框选项发生变化的时候触发
    const handleSelectionChange = (selection) => {
        setMultipleSelection(selection)
    }
    //批量删除
    const removeRows = () => {
        var idList = []
        //遍历数组得到每个id值，设置到idList里面
        for (var i = 0; i < multipleSelection.length; i++) {
            var obj = multipleSelection[i]
            var id = obj.id
            idList.push(id)
        }
        //调用接口
        hospitalSetApi.removeRows(idList).then(response => {
            message.success('删除成功！')
            getData(1)
        })
    }
    //锁定和取消锁定
    const lockHostSet = (id, status) => {
        hospitalSetApi.lockHospSet(id, status).then(response => {
            getData()
        })
    }
    const goDetail = (id) => {
        navigate(`/hospital/setAdd?id=${id}`)
    }

    const goAdd = () => {
        navigate(`/hospital/setAdd`)
    }
    const goEdit = (id) => {
        navigate(`/hospital/setAdd?id=${id}`)
    }

    const onFormSubmit = (data) => {
        getData(data)
    }
    const resetHandle = () => {
        reset()
        getData()
    }

    const columns = [
        { field: 'index', headerName: '序号', width: 80 },
        { field: 'hosname', headerName: '医院名称', width: 200 },
        { field: 'hoscode', headerName: '医院编号', width: 80 },
        { field: 'apiUrl', headerName: 'api基础路径', width: 130 },
        { field: 'status', headerName: '状态', width: 100, renderCell: ({ row }) => (<Typography>{row?.status === 1 ? '可用' : '不可用'}</Typography>) },
        { field: 'contactsName', headerName: '联系人姓名', width: 100 },
        { field: 'contactsPhone', headerName: '联系人手机', width: 130 },
        {
            field: 'actions', headerName: '操作', width: 360,
            renderCell: ({ row }) => {
                return <Stack direction={'row'} spacing={0.4}>
                    <Button onClick={() => goEdit(row.id)} variant="contained" >编辑</Button>
                    <Button onClick={() => removeDataById(row.id)} variant="contained" >删除</Button>
                    <Button onClick={() => goDetail(row.id)} variant="contained" >详情</Button>
                    <Button onClick={() => lockHostSet(row.id, row.status ? 0 : 1)} variant="contained" >{row?.status === 1 ? '锁定' : '取消锁定'}</Button>
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
                    name="hoscode"
                    sx={{ width: 240 }}
                    {...register('hoscode')}
                    label={'医院编号'}
                />

                <Button type='submit' color="primary" variant='contained'>查询</Button>
                <Button onClick={resetHandle} color="primary">清空</Button>
            </Stack>
        </Box>
        <Stack spacing={1}>  <Button sx={{ width: 50, mb: 2 }} variant='contained' onClick={goAdd} color="primary">添加</Button></Stack>
        <TableGrid rows={list} columns={columns} />
    </Box>
}

export default HospitalSetPage