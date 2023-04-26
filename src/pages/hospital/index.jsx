import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { TableGrid } from '@/components';
import { useForm, Controller } from 'react-hook-form'
import hospApi from '../../api/hosp/hosp'
const Hospital = () => {


    const [hosp, setHosp] = useState('')
    const [list, setList] = useState([
        { id: 1, hosname: 'hosname', hostypeString: 'hostypeString', fullAddress: 'fullAddress', status: 1 },
    ])
    const navigate = useNavigate()
    useEffect(() => {
        // if (user.userStateIndex) {
        //     setShowHospIndex(user.userStateIndex)
        //     dispatch(SET_UserStateIndex({ userStateIndex: 0 }))
        // }
        getData()
    }, []);
    const getData = () => {
        hospApi.getPageList(1, 40, { hosname: hosp }).then(response => {
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
        reset()
        setHosp('')
        getData()
    }
    const goDetail = (id) => {
        navigate('/hospital/detail', { state: { id } })
    }
    const goSchedule = (id) => {
        navigate('/hospital/schedule', { state: { id } })
    }
    const setStatus = (id, status) => {
        hospApi.updateStatus(id, status)
            .then(response => {
                //刷新页面
                getData(1)
            })
    }

    const columns = [
        { field: 'hosname', headerName: '医院名称', width: 130 },
        { field: 'hostypeString', headerName: '等级', width: 130 },
        { field: 'fullAddress', headerName: '地址', width: 130 },
        {
            field: 'status', headerName: '状态', width: 130,
            renderCell: (row) => (<Typography>{row.value == 0 ? '未上线' : '已上线'}</Typography>)
        },
        { field: 'createTime', headerName: '创建时间', width: 160 },
        {
            field: 'actions', headerName: '操作', width: 250,
            renderCell: ({ row }) => {
                return <Stack direction={'row'} spacing={0.4}>
                    <Button onClick={() => goDetail(row.id)} variant="contained" size="small">详情</Button>
                    <Button onClick={() => goSchedule(row.id)} variant="contained" size="small">排班</Button>
                    <Button variant="contained" onClick={() => setStatus(row.id, row.status ? 0 : 1)}>{row.status === 0 ? '上线' : '下线'}</Button>
                </Stack>
            }
        },
    ]
    return <Box
        sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    // sx={{ bgcolor: 'white', width: '100%', height: '100%', p: 2, borderRadius: 2 }}
    >
        {/* <Typography sx={{ height: 30, fontWeight: 'bold' }}>医院列表</Typography> */}
        <Box component="form" className="form-page" >
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2, height: 30 }} >
                <TextField
                    sx={{ width: 300 }}
                    // value={hosp}
                    onChange={e => {
                        setHosp(e.target.value)
                    }}
                    {...register('hosp')}
                    label={'请输入医院名称'}
                />

                <Button onClick={getData} color="primary" variant='contained'>查询</Button>
                <Button onClick={resetHandle} color="primary">清空</Button>
            </Stack>
        </Box>
        <TableGrid rows={list} columns={columns} />
    </Box>
}

export default Hospital