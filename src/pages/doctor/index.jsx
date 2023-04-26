import { Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect, useRef } from 'react';
import cookie from 'js-cookie'
import { TreeList, message, TableGrid } from '@/components'
import LabelIcon from '@mui/icons-material/Label';
import { useNavigate, useParams } from 'react-router-dom'
import hospApi from '../../api/hosp/hosp'
import userInfoApi from '../../api/user/userInfo'
const DoctorPage = ({ hoscode }) => {

    useEffect(() => {
        getData()
    },[])
    const [hospName, setHospName] = useState('香港玛丽医院')
    const [hosList, setHosList] = useState([])
    const getData = () => {
        hospApi.getPageList(1, 40, { hosname: hospName }).then(response => {
            //每页数据集合
            setHosList(response.data.content)
        })
    }
    const handleChange = (e) => {
        setHospName(e.target.value)
    }

    const columns = [
        { field: 'hosname', headerName: '医院名称', width: 130 },
        { field: 'hostypeString', headerName: '等级', width: 130 },
        { field: 'fullAddress', headerName: '地址', width: 130 },
        { field: 'status', headerName: '状态', width: 130, renderCell: (value) => (<Typography>{value === 0 ? '未上线' : '已上线'}</Typography>) },
        { field: 'createTime', headerName: '创建时间', width: 130 },
    ]

    return <Box >
        <Stack>
            <FormControl sx={{ width: 500 }} >
                <InputLabel id="comment">请选择医院：</InputLabel>
                <Select
                    labelId="hospName"
                    id="hospName"
                    value={hospName}
                    label="请选择医院"
                    onChange={handleChange}
                    name='hospName'
                >
                    {hosList.map(item => (<MenuItem key={item.id} value={item.hosname}>{item.hosname}</MenuItem>))}
                </Select>
            </FormControl>
        </Stack>
        {/* <TableGrid rows={list} columns={columns} /> */}
    </Box>
}
export default DoctorPage