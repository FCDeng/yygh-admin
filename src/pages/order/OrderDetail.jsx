import { Box, Stack, Typography, Avatar, Grid, Button } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie'
import { TableGrid } from '@/components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import orderInfoApi from '@/api/order/orderInfo'
const OrderDetail = () => {
    const { id } = useParams()
    const [orderInfo, setOrderInfo] = useState({})
    const [patientList, setPatientList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getData()
    })
    const getData = () => {
        orderInfoApi.getDetailById(id).then(response => {
            setOrderInfo(response.data.orderInfo)
            setPatientList(response.data.patient)
        })
    }

    const columns = [
        { field: 'name', headerName: '姓名', width: 80 },
        { field: 'phone', headerName: '手机号', width: 80 },
        { field: 'certificatesNo', headerName: '证件编号', width: 80 },
        { field: 'sex', headerName: '性别', width: 80, renderCell: (row) => (<Typography>{row?.sex == 1 ? '男' : '女'}</Typography>) },
        { field: 'isMarry', headerName: '是否结婚', width: 80, renderCell: (row) => (<Typography>{row?.isMarry ? '是' : '否'}</Typography>) },
        { field: 'birthdate', headerName: '出生年月', width: 100 },
        { field: 'contactsName', headerName: '联系人姓名', width: 80 },
        { field: 'contactsCertificatesNo', headerName: '联系人证件号', width: 130 },
        { field: 'contactsPhone', headerName: '联系人手机', width: 80 },
        { field: 'createTime', headerName: '创建时间', width: 80 },
    ]
    return <Stack spacing={0.5}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>订单详情</Typography>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button>

        </Stack>
        <Typography sx={{ fontWeight: 'bold', py: 0.5 }}>订单信息</Typography>
        <Grid container sx={{ py: 0.5 }}>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>订单交易号:</Typography>
                    <Typography>{orderInfo.outTradeNo}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医院名称:</Typography>
                    <Typography>{orderInfo.hosname}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>科室名称:</Typography>
                    <Typography>{orderInfo.depname}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Grid container sx={{ py: 1 }}>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医生职称:</Typography>
                    <Typography>{orderInfo.title}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>安排日期:</Typography>
                    <Typography>{orderInfo.reserveDate}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>预约号序:</Typography>
                    <Typography>{orderInfo.number}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Grid container sx={{ py: 1 }}>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医事服务费:</Typography>
                    <Typography>{orderInfo.amount}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>订单状态:</Typography>
                    <Typography>{orderInfo?.param?.orderStatusString}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>预约时间:</Typography>
                    <Typography>{orderInfo.createTime}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold', py: 0.3 }}>就诊人信息</Typography>
        <TableGrid rows={patientList} columns={columns} />
    </Stack>
}
export default OrderDetail