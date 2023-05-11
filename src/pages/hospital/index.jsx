import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { TableGrid } from '@/components';
import { useForm, Controller } from 'react-hook-form'
import lodash from 'lodash'
import hospApi from '../../api/hosp/hosp'
const Hospital = () => {


    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([
        { id: 1, hosname: 'hosname', hostypeString: 'hostypeString', fullAddress: 'fullAddress', status: 1 },
    ])
    // useState
    const navigate = useNavigate()
    useEffect(() => {
        getData()
    }, []);
    const getData = (data) => {
        hospApi.getPageList(1, 40, { hosname: data?.hosname || '' }).then(response => {
            //每页数据集合
            setList(response.data.content.map(item => ({
                ...item,
                hostypeString: item.param.hostypeString,
                fullAddress: item.param.hostypeString,
                // status: item.status
            })))
        })
    }
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
        defaultValues: { hosp: '' },
    })

    const resetHandle = () => {
        // reset()
        // setHosp('')
        getData()
    }
    const goDetail = (id) => {
        navigate(`/hospital/detail?id=${id}`)
    }
    const goSchedule = (hoscode) => {
        navigate(`/hospital/schedule?hoscode=${hoscode}`)
    }
    const setStatus = (id, status) => {
        hospApi.updateStatus(id, status)
            .then(response => {
                //刷新页面
                getData(1)
            })
    }

    const onFormSubmit = (data) => { 
        getData(data)
    }

    const columns = [
        { field: 'hosname', headerName: '医院名称', width: 180 },
        { field: 'hostypeString', headerName: '等级', width: 130, renderCell: ({ row }) => (<Typography>{row?.param?.hostypeString}</Typography>) },
        { field: 'address', headerName: '地址', width: 230},
        // {
        //     field: 'status', headerName: '状态', width: 80,
        //     renderCell: (row) => (<Typography>{row.value == 0 ? '未上线' : '已上线'}</Typography>)
        // },
        { field: 'createTime', headerName: '创建时间', width: 160 },
        {
            field: 'actions', headerName: '操作', width: 250,
            renderCell: ({ row }) => {
                return <Stack direction={'row'} spacing={0.4}>
                    <Button onClick={() => goDetail(row.id)} variant="contained" size="small">详情</Button>
                    <Button onClick={() => goSchedule(row.hoscode)} variant="contained" size="small">排班</Button>
                    {/* <Button variant="contained" onClick={() => setStatus(row.id, row.status ? 0 : 1)}>{row.status === 0 ? '上线' : '下线'}</Button> */}
                </Stack>
            }
        },
    ]
    return <Box
        sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    // sx={{ bgcolor: 'white', width: '100%', height: '100%', p: 2, borderRadius: 2 }}
    >
        {/* <Typography sx={{ height: 30, fontWeight: 'bold' }}>医院列表</Typography> */}
        <Box component="form" className="form-page" onSubmit={handleSubmit(onFormSubmit)} >
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2, height: 30 }} >
                <TextField
                    sx={{ width: 300 }}
                    name="hosname"
                    onChange={e => {
                        setHosp(e.target.value)
                    }}
                    {...register('hosname')}
                    label={'请输入医院名称'}
                />

                <Button onClick={getData} color="primary" type='submit' variant='contained'>查询</Button>
                <Button onClick={resetHandle} type='reset' color="primary">清空</Button>
            </Stack>
        </Box>
        <TableGrid rows={list} columns={columns} />
    </Box>
}

export default Hospital