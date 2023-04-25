
import { useState, useEffect, useRef } from 'react';

import { useNavigate, useLocation } from 'react-router-dom'
import cookie from 'js-cookie'
const AuthRouter = ({ children }) => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     let token = cookie.get('token')
    //     if (!token) navigate('/login', { replace: true })
    // })
    return children
}
export default AuthRouter