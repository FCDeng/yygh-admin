import { Box, Stack, Typography, Avatar, Button } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState, useEffect, useRef } from 'react';
import classes from './Schedule.scss'
import cookie from 'js-cookie'
import { TreeList, message } from '@/components'
import LabelIcon from '@mui/icons-material/Label';
import { useNavigate, useParams } from 'react-router-dom'
import hospitalApi from '../../api/hosp/hosp'
import userInfoApi from '../../api/user/userInfo'
const Schedule = ({ hoscode }) => {
    const [hospital, setHospital] = useState({ param: {} })
    const [depcode, setDepcode] = useState(null)
    const [scheduleId, setScheduleId] = useState(null)
    const [bookingRule, setBookingRule] = useState({})
    const [departmentVoList, setDepartmentVoList] = useState([])
    const [workDate, setWorkDate] = useState(null)
    const [scheduleList, setScheduleList] = useState([
        { title: '医师', docname: '张三', amount: 50, availableNumber: 10 }
    ])
    const [tabShow, setTabShow] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0)
    const [timeString, setTimeString] = useState(null)
    const [depname, setDepname] = useState(null)
    const timerRef = useRef(null)
    const [time, setTime] = useState('今天')
    const [pageFirstStatus, setPageFirstStatus] = useState(0)
    const [bookingScheduleList, setBookingScheduleList] = useState([])
    const [baseMap, setBaseMap] = useState({})
    const [data, setData] = useState([])
    const navigate = useNavigate()
    // 获取可预约排班分页数据
    const getBookingScheduleRule = (workTime) => {
        hospitalApi.getBookingScheduleRule(1, 7, hoscode, depcode).then(response => {
            setBookingScheduleList(response.data.bookingScheduleList)
            setBaseMap(response.data.baseMap)

            // 分页后workDate=null，默认选中第一个
            if (workDate == null) {
                setWorkDate(response.data.bookingScheduleList[0].workDate)
            }
            //判断当天是否停止预约 status == -1 停止预约
            if (workDate == getCurDate()) {
                setPageFirstStatus(response.data.bookingScheduleList[0].status)
            } else {
                setPageFirstStatus(0)
            }
            findScheduleList(workTime || response.data.bookingScheduleList[0].workDate)
        })
    }
    // 获取排班信息
    const findScheduleList = (workDate) => {
        hospitalApi.findScheduleList(hoscode, depcode, workDate || getCurDate()).then(response => {
            setScheduleList(response.data)
        })
    }
    // 即将放号的倒计时
    const countDown = (releaseTime, nowTime) => {
        //计算倒计时时长
        let secondes = 0;
        if (releaseTime > nowTime) {
            setTime('今天')
            //当前时间到放号时间的时长
            secondes = Math.floor((releaseTime - nowTime) / 1000);
        } else {
            setTime('明天')
            //计算明天放号时间
            let releaseDate = new Date(releaseTime)
            releaseTime = new Date(releaseDate.setDate(releaseDate.getDate() + 1)).getTime()
            //当前时间到明天放号时间的时长
            secondes = Math.floor((releaseTime - nowTime) / 1000);
        }

        //定时任务
        timerRef.current = setInterval(() => {
            secondes = secondes - 1
            if (secondes <= 0) {
                clearInterval(timerRef);
            }
            setTimeString(convertTimeString(secondes))
        }, 1000);
    }
    const convertTimeString = (allseconds) => {
        if (allseconds <= 0) return '00:00:00'
        // 计算天数
        let days = Math.floor(allseconds / (60 * 60 * 24));
        // 小时
        let hours = Math.floor((allseconds - (days * 60 * 60 * 24)) / (60 * 60));
        // 分钟
        let minutes = Math.floor((allseconds - (days * 60 * 60 * 24) - (hours * 60 * 60)) / 60);
        // 秒
        let seconds = allseconds - (days * 60 * 60 * 24) - (hours * 60 * 60) - (minutes * 60);

        //拼接时间
        let timString = "";
        if (days > 0) {
            timString = days + "天:";
        }
        return timString += hours + " 时 " + minutes + " 分 " + seconds + " 秒 ";
    }

    const getCurDate = () => {
        let datetime = new Date()
        let year = datetime.getFullYear()
        let month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
        let date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
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
    const selectDate = (item, index) => {
        setWorkDate(item.workDate)
        setActiveIndex(index)
        //清理定时
        if (timerRef != null) clearInterval(timerRef)
        // 是否即将放号
        if (item.status == 1) {
            setTabShow(false)
            // 放号时间
            let releaseTime = new Date(getCurDate() + ' ' + baseMap.releaseTime).getTime()
            let nowTime = new Date().getTime();
            countDown(releaseTime, nowTime)
            // dealClass();
        } else {
            setTabShow(true)
            getBookingScheduleRule(item.workDate)
        }
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
    return <Box className={classes.schedule}>
        <Stack direction={'row'}>
            <Box sx={{ width: 150 }}>
                <TreeList data={data} />
            </Box>
            <Stack sx={{ display: 'flex', flex: 1 }}>
                <Typography>{`选择：${baseMap.hosname}/${depname}/${workDate} `}</Typography>
                <Stack direction={'row'} spacing={2}>
                    {bookingScheduleList.map((item, index) => (
                        <Stack key={item.workDate} spacing={1} sx={{ borderRadius: 1, border: '1px solid #999' }}
                            className={hasNum(item.status, item.availableNumber, index)}
                            onClick={() => selectDate(item, index)}>
                            <Stack direction={'row'} spacing={1} sx={{ px: 1, py: 1 }} className={classes.bookTop}>
                                <Typography sx={{ fontSize: 10 }} >{item.workDate}</Typography>
                                <Typography sx={{ fontSize: 10 }}>{item.dayOfWeek}</Typography>
                            </Stack>
                            <Typography sx={{ textAlign: 'center', pb: 2, fontSize: 10 }}>{isHasNumber(item.status, item.availableNumber)}</Typography>
                        </Stack>
                    ))}

                </Stack>
                {tabShow ? <Stack>
                    <Typography sx={{ py: 4 }}>号源</Typography>
                    <Stack >
                        {scheduleList.map((item, index) => (<Stack key={`${item.id}${index}scheduleList`}
                            direction={'row'} sx={{ display: 'flex', flex: 1, justifyContent: 'space-between', borderBottom: 1, pb: 2 }}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography sx={{ mt: 1.6 }} >{`${item.title} | ${item.docname}`}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2} sx={{ pr: 4 }} >
                                <Typography sx={{ color: '#3375C1', mt: 1 }}>{`￥${item.amount}`}</Typography>
                                <Button
                                    className={classes.btn}
                                    sx={item.availableNumber == 0 || pageFirstStatus == -1 ? { background: '#7f828b', px: 4 } : { bgcolor: '#3375C1', color: 'white', px: 4 }}
                                >{`剩余${item.availableNumber}`}</Button>
                            </Stack>
                        </Stack>
                        ))}
                    </Stack>
                </Stack> : null}
            </Stack>
        </Stack>
    </Box>
}
export default Schedule