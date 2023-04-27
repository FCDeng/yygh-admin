import { Box, Stack, Typography, Avatar, Grid, Button } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie'
import { TableGrid } from '@/components';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import hospApi from '@/api/hosp/hosp'
const HospitalDetailPage = () => {
    const [search, setSearch] = useSearchParams()
    const [hospital, setHospital] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        getData()
    }, [])
    const id = search.get('id')
    const getData = () => {
        hospApi.getHospById(id).then(response => {
            setHospital(response.data.hospital)
        })
    }


    return <Stack spacing={0.5}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>医院详情</Typography>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button>

        </Stack>
        <Typography sx={{ fontWeight: 'bold', py: 0.5 }}>基本信息</Typography>
        <Grid container sx={{ py: 0.5 }}>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医院名称:</Typography>
                    <Typography>{hospital.hosname}  | {hospital?.param?.hostypeString}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医院编码:</Typography>
                    <Typography>{hospital.hoscode}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>地址:</Typography>
                    <Typography>{hospital?.param?.fullAddress}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Stack direction={'row'} spacing={1}>
            <Typography>坐车路线:</Typography>
            <Typography>{hospital.route}</Typography>
        </Stack>
        <Stack spacing={1} >
            <Typography sx={{ fontWeight: 'bold', py: 0.5 }}>医院简介:</Typography>
            <Typography>{hospital.intro}</Typography>
        </Stack>
    </Stack >
}
export default HospitalDetailPage