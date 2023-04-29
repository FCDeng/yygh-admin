import { Box, Stack, Typography, TextField, Grid, Button, FormControlLabel } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie'
import { TableGrid, message } from '@/components';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import orderInfoApi from '@/api/order/orderInfo'
const DoctorOrderDetailPage = () => {
    const [search, setSearch] = useSearchParams()
    const [orderInfo, setOrderInfo] = useState({})
    const [patient, setPatient] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        orderInfoApi.getDetailById(search.get('id')).then(response => {
            setOrderInfo(response.data.orderInfo)
            setPatient(response.data.patient)
            reset(response.data.orderInfo)
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
        defaultValues: { keyword: '' },
    })

    const onFormSubmit = (data) => { 
        orderInfoApi.getUpdateDoctorOrder({ ...orderInfo, ...data }).then(response => {
            message.success('保存成功!')
            navigate('/doctorOrder/list')
        })
    }
    return <Stack spacing={0.5}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, borderBottom: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }}>医嘱编辑</Typography>
            {/* <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button> */}

        </Stack>
        <Typography sx={{ fontWeight: 'bold', py: 0.3 }}>订单信息</Typography>
        <Grid container sx={{ py: 0.3 }}>
            <Grid item xs={3}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>订单交易号:</Typography>
                    <Typography>{orderInfo.outTradeNo}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医院名称:</Typography>
                    <Typography>{orderInfo.hosname}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>科室名称:</Typography>
                    <Typography>{orderInfo.depname}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>医生职称:</Typography>
                    <Typography>{orderInfo.title}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold', py: 0.3 }}>患者信息</Typography>
        <Grid container sx={{ py: 0.5 }}>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>姓名:</Typography>
                    <Typography>{patient.name}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={'row'} spacing={1}>
                    <Typography>证件类型:</Typography>
                    <Typography>{patient.certificatesNo}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold', py: 2 }}>医嘱信息</Typography>
        <Box component="form" className="form-page" onSubmit={handleSubmit(onFormSubmit)}>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-around' }} >
                <FormControlLabel required label="诊断结果: " sx={{ m: 0, width: 320 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="routine"
                    // placeholder='内科护理，儿科护理'
                    sx={{ width: 240 }}
                    {...register('routine', { required: true })}
                />} />
                <FormControlLabel label="常规护理: " sx={{ m: 0, width: 320 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="routine"
                    placeholder='内科护理，儿科护理'
                    sx={{ width: 240 }}
                    {...register('routine')}
                // label={'常规护理'}
                />} />
                <FormControlLabel label="护理级别: " sx={{ m: 0, width: 320 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="nursingLevel"
                    placeholder='一级护理，二级'
                    sx={{ width: 240 }}
                    {...register('nursingLevel')}
                // label={'护理级别'}
                />} />

            </Stack>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-around' }} >
                <FormControlLabel label="饮食: " sx={{ m: 0, width: 320 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="diet"
                    placeholder='如普食，半流食'
                    sx={{ width: 240 }}
                    {...register('diet')}
                // label={'饮食'}
                />} />
                <FormControlLabel label="卧位: " sx={{ m: 0, width: 320 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="recumbentPosition"
                    placeholder='半卧位，绝对卧床'
                    sx={{ width: 240 }}
                    {...register('recumbentPosition')}
                // label={'卧位'}
                />} />
                <FormControlLabel label="特殊处理: " sx={{ m: 0, width: 320 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="specialTreatment"
                    placeholder='如测Bp、R、P半小时一次,雾化吸入'
                    sx={{ width: 240 }}
                    {...register('specialTreatment')}
                // label={'特殊处理'}
                />} />
            </Stack>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mb: 2 }} >

                <FormControlLabel label="药物: " sx={{ m: 0, width: 320 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="drug"
                    placeholder='静脉、肌肉、口服'
                    sx={{ width: 240 }}
                    {...register('drug')}
                // label={'药物'}
                />} />
                <FormControlLabel label="备注: " sx={{ m: 0 }} labelPlacement='start' control={<TextField
                    type="text"
                    name="remark"
                    placeholder='备注'
                    fullWidth
                    sx={{ width: 540 }}
                    {...register('remark', { required: true })}
                // label={'备注'}
                />} />
            </Stack>

            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'center' }} >
                <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button>
                <Button type='submit' color="primary" variant='contained'>保存</Button>
            </Stack>
        </Box>
    </Stack>
}
export default DoctorOrderDetailPage