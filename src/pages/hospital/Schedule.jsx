import { Box, Stack, Typography, Avatar, Button } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect, useRef } from 'react';
import classes from './Schedule.scss'
import cookie from 'js-cookie'
import { TreeList, message } from '@/components'
import LabelIcon from '@mui/icons-material/Label';
import { useNavigate, useSearchParams, } from 'react-router-dom'
import { TableGrid } from '@/components';
import hospApi from '@/api/hosp/hosp'
const Schedule = () => {
    const [hospital, setHospital] = useState({ param: {} })
    const [scheduleId, setScheduleId] = useState(null)
    const [search, setSearch] = useSearchParams()
    const [bookingRule, setBookingRule] = useState({})
    const [departmentVoList, setDepartmentVoList] = useState([])
    const [workDate, setWorkDate] = useState(null)
    const [scheduleList, setScheduleList] = useState([])
    const [tabShow, setTabShow] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0)
    const [timeString, setTimeString] = useState(null)
    const [depname, setDepname] = useState(null)
    const timerRef = useRef(null)
    const [time, setTime] = useState('今天')
   const navigate = useNavigate()
    const [bookingScheduleList, setBookingScheduleList] = useState([])
    const [baseMap, setBaseMap] = useState({})
    const [data, setData] = useState([])
    const [departmentCode, setDepartmentCode] = useState(null);
    const hoscode = search.get('hoscode')
    useEffect(() => {
        setWorkDate(getCurDate())
        fetchData()
    }, []);

    // 查询医院所有科室列表
    const fetchData = () => {
        hospApi.getDeptByHoscode(hoscode).then(response => {
            setData(response.data)
            // 默认选中第一个
            let resDepartmentCode = response.data[0].children[0].depcode
            setDepartmentCode(response.data.length ? resDepartmentCode : departmentCode)
            setDepname(response.data.length ? response.data[0].children[0].depname : depname)
            getPage(resDepartmentCode)
        })
    }
    const getPage = (resDepartmentCode) => {
        setWorkDate(null)
        setActiveIndex(0)
        getScheduleRule(resDepartmentCode)
    }
    // 查询排班规则数据
    const getScheduleRule = (resDepartmentCode) => {
        hospApi.getScheduleRule(1, 10, hoscode, departmentCode || resDepartmentCode).then(response => {
            setBookingScheduleList(response.data.bookingScheduleRuleList)
            setScheduleList(response.data.scheduleList || [])
            setBaseMap(response.data.baseMap)

            // 分页后workDate=null，默认选中第一个 
            setWorkDate(workDate || response.data.bookingScheduleRuleList[0].workDate)
            //调用查询排班详情
            getDetailSchedule(resDepartmentCode)
        })
    }
    console.log(workDate, 1111);
    //查询排班详情
    const getDetailSchedule = (resDepartmentCode) => {
        // console.log(resDepartmentCode, departmentCode, workDate);
        hospApi.getScheduleDetail(hoscode, departmentCode || resDepartmentCode, workDate || getCurDate())
            .then(response => {
                setScheduleList(response.data)
            })
    }

    const handleNodeClick = (data) => {
        // 科室大类直接返回
        if (data.children != null) return
        setDepartmentCode(data.depcode)
        setDepname(data.depname)
        getPage()
    }

    const selectDate = (workDate, index) => {
        setWorkDate(workDate.workDate)
        setActiveIndex(index)
        //调用查询排班详情
        getDetailSchedule()
    }

    const getCurDate = () => {
        var datetime = new Date()
        var year = datetime.getFullYear()
        var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
        var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
        return year + '-' + month + '-' + date
    }
    const isHasNumber = (status, availableNumber,) => {
        let title = ''
        if (status == 0) {
            title = availableNumber == -1 ? '无号' : availableNumber == 0 ? '约满' : '有号'
        } else if (status == 1) {
            title = '即将放号'
        } else {
            title = '停止挂号'
        }
        return title
    }
    const hasNum = (status, availableNumber, index) => {
        let classType = ''
        if (index == activeIndex) {
            classType = classes.noNumberAct
        }
        if (status == 0) {
            if (availableNumber > 0) {
                classType = classes.hasNum
                if (index == activeIndex) { classType = classes.selected }
            }
        } else if (index == activeIndex) {
            classType = classes.noNumberAct
        }
        return `${classes.book} ${classType}`
    }
    const treeHandle = (item) => {
        if (item.children != null) return
        setDepartmentCode(item.depcode)
        setDepname(item.depname)
        getPage()
    }

    const columns = [
        { field: 'title', headerName: '职称', width: 130, renderCell: ({ row }) => (<Typography>{`${row.title} | ${row.docname}`}</Typography>) },
        { field: 'reservedNumber', headerName: '可预约数', width: 130 },
        { field: 'availableNumber', headerName: '剩余预约数', width: 130 },
        { field: 'amount', headerName: '挂号费(元)', width: 130 },
        { field: 'skill', headerName: '擅长技能', width: 130 }
    ]
    console.log(activeIndex);

    return <Box className={classes.schedule}>
        <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>排班页面</Typography>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: 60 }}>返回</Button>

        </Stack>
        <Stack direction={'row'}>
            <Box sx={{ width: 200, height: 500, border: 1, mr: 2 }}>
                <TreeList data={data} treeHandle={treeHandle} />
            </Box>
            <Stack sx={{ display: 'flex', flex: 1 }} spacing={2}>
                <Typography sx={{ mb: 1 }} >{`选择：${baseMap.hosname}/${depname}/${workDate} `}</Typography>
                <Stack direction={'row'} spacing={2}>
                    {bookingScheduleList.map((item, index) => (
                        <Stack key={item.workDate} spacing={1}
                            sx={{
                                borderRadius: 1, border: '1px solid #d9ecff', bgcolor: index == activeIndex ? '#ecf5ff' : '',
                                p: 1
                            }}
                            className={`${index == activeIndex ? classes.active : ''}`}
                            onClick={() => selectDate(item, index)}>
                            <Stack direction={'row'} spacing={1} sx={{ px: 1, py: 1 }} className={classes.bookTop}>
                                <Typography sx={{ fontSize: 10, color: index == activeIndex ? '#409EFF' : '' }} >{item.workDate}</Typography>
                                <Typography sx={{ fontSize: 10, color: index == activeIndex ? '#409EFF' : '' }}>{item.dayOfWeek}</Typography>
                            </Stack>
                            <Typography sx={{ textAlign: 'center', pb: 2, fontSize: 10, color: index == activeIndex ? '#409EFF' : '' }}>{item.availableNumber} / {item.reservedNumber}</Typography>
                        </Stack>
                    ))}

                </Stack>
                <TableGrid rows={scheduleList} columns={columns} />
            </Stack>
        </Stack>
    </Box>
}
export default Schedule