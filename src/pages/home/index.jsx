import { Box, Typography, Button, Grid, TextField, Stack, Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import classes from './index.scss'

function HomePage() {

  return (
    <Stack spacing={2} sx={{ bgcolor: 'white', width: '100%', height: '100%', p:2, borderRadius:2 }}>
      <Stack direction={'row'}>
        <Typography>系统：</Typography>
        <Typography>香港玛丽医院业务系统</Typography>
      </Stack>
      <Stack direction={'row'}>
        <Typography>作者：</Typography>
        <Typography>邓奋聪190801050102</Typography>
      </Stack>
    </Stack>
  )
}

export default HomePage
