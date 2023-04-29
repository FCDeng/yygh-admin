// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconAlbum, IconApple } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill, 
    IconAlbum,
    IconApple
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [
        {
            id: 'home',
            title: '首页',
            type: 'item',
            url: '/',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: '医院管理',
            type: 'item',
            icon: icons.IconPalette,
            type: 'collapse',
            breadcrumbs: false,
            children: [
                {
                    id: 'hospital-set',
                    title: '医院设置',
                    type: 'item',
                    url: '/hospital/set',
                    breadcrumbs: false
                },
                {
                    id: 'hospital-set-add',
                    title: '医院设置添加',
                    type: 'item',
                    url: '/hospital/setAdd',
                    breadcrumbs: false
                },
                {
                    id: 'hospital-man',
                    title: '医院列表',
                    type: 'item',
                    url: '/hospital/list',
                    breadcrumbs: false
                },
            ]
        }
        ,
        {
            id: 'user',
            title: '患者管理',
            type: 'item',
            icon: icons.IconShadow,
            type: 'collapse',
            breadcrumbs: false,
            children: [
                {
                    id: 'user-list',
                    title: '用户列表',
                    type: 'item',
                    url: 'user/list',
                    breadcrumbs: false
                },
                {
                    id: 'user-auth',
                    title: '用户认证',
                    type: 'item',
                    url: 'user/userAuth',
                    breadcrumbs: false
                }
            ]
        },
        // {
        //     id: 'doctor',
        //     title: '医生列表',
        //     type: 'item',
        //     url: 'doctor/list',
        //     icon: icons.IconWindmill,
        // },
        {
            id: 'order',
            title: '订单列表',
            type: 'item',
            url: 'order/list',
            icon: icons.IconApple,
        },
        {
            id: 'doctorOrder',
            title: '医嘱管理', 
            type: 'collapse',
            breadcrumbs: false, 
            icon: icons.IconAlbum,
            children: [
                {
                    id: 'doctorOrder-list',
                    title: '医嘱列表',
                    type: 'item',
                    url: 'doctorOrder/list',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
