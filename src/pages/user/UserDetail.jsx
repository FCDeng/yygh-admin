import { Box, Stack, Typography, Avatar, Grid, Button } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie'
import { TableGrid } from '@/components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import userInfoApi from '@/api/user/userInfo'
const UserDetail = () => {
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({})
    const [patientList, setPatientList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getData()
    })
    const getData = () => {
        userInfoApi.show(id).then(response => {
            setUserInfo(response.data.userInfo)
            setPatientList(response.data.patientList)
        })
    }

    const columns = [
        { field: 'name', headerName: '姓名', width: 80 },
        { field: 'phone', headerName: '手机号', width: 80 },
        { field: 'certificatesNo', headerName: '证件编号', width: 80 },
        { field: 'sex', headerName: '性别', width: 80, renderCell: (row) => (<Typography>{row?.sex == 1 ? '男' : '女'}</Typography>) },
        { field: 'isMarry', headerName: '是否结婚', width: 80, renderCell: (row) => (<Typography>{row?.isMarry ? '是' : '否'}</Typography>) },
        { field: 'birthdate', headerName: '出生年月', width: 100 },
        { field: 'address', headerName: '地址', width: 130 },
        { field: 'createTime', headerName: '创建时间', width: 80 },
    ]
    return <Stack spacing={0.5}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>用户详情</Typography>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button>

        </Stack>
        <Typography sx={{ fontWeight: 'bold', py: 0.5 }}>用户信息</Typography>
        <Grid container sx={{ py: 0.5 }}>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>手机号:</Typography>
                    <Typography>{userInfo.phone}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>用户姓名:</Typography>
                    <Typography>{userInfo.name}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>注册时间:</Typography>
                    <Typography>{userInfo.createTime}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold', py: 0.5 }}>认证信息</Typography>
        <Grid container sx={{ py: 1 }}>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>姓名:</Typography>
                    <Typography>{userInfo.name}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>证件号:</Typography>
                    <Typography>{userInfo.certificatesNo}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold', py: 0.3 }}>用户信息</Typography>
        <TableGrid rows={patientList} columns={columns} />
    </Stack>
}
export default UserDetail