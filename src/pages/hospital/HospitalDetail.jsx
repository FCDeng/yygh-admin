import { Box, Stack, Typography, Avatar, Grid, Button } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect } from 'react';
import classes from './HospitalDetail.scss'
import cookie from 'js-cookie'
import hospApi from '@/api/hosp/hosp'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
const HospitalDetailPage = ({ id }) => {
    const [hospital, setHospital] = useState({})
    const [bookingRule, setBookingRule] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getData()
    })
    const getData = () => {
        hospApi.getHospById(id).then(response => {
            setHospital(response.data.hospital)
            setBookingRule(response.data.bookingRule)
        })
    }


    return <Stack spacing={0.5} className={classes.HospitalDetailPage}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>医院详情</Typography>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button>

        </Stack>
        <Typography sx={{ fontWeight: 'bold', py: 2 }}>基本信息</Typography>
        <Grid container sx={{ py: 1 }}>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医院名称:</Typography>
                    <Typography><b>{hospital.hosname}</b> | {hospital?.param?.hostypeString}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医院编码:</Typography>
                    <Typography>{hospital.hoscode}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Grid container sx={{ py: 1 }}>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>地址:</Typography>
                    <Typography>{hospital?.param?.fullAddress}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>坐车路线:</Typography>
                    <Typography>{hospital.route}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Grid container sx={{ py: 1 }}>
            <Grid item >
                <Stack direction={'row'} spacing={1}>
                    <Typography>医院简介:</Typography>
                    <Typography>{hospital.intro}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold', py: 2 }}>预约规则</Typography>
        <Grid container sx={{ py: 1 }}>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>预约周期:</Typography>
                    <Typography>{`${bookingRule.cycle}天`}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>放号时间:</Typography>
                    <Typography>{bookingRule.releaseTime}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Grid container sx={{ py: 1 }}>
            <Grid item xs={6}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>停挂时间:</Typography>
                    <Typography>{bookingRule.stopTime}</Typography>
                </Stack>
            </Grid>
        </Grid>

    </Stack>
}
export default HospitalDetailPage