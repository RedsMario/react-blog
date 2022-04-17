/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { HomeOutlined, GithubOutlined, HeartOutlined, PictureOutlined, CoffeeOutlined, LockOutlined, UserOutlined, MessageOutlined, AppstoreOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { MenuList } from '@/types'
import { ReactSVG } from 'react-svg'
import { useMediaQuery } from 'react-responsive'
import styles from '@/layout/Navbar/index.module.scss'
import homeIcon from '@/layout/Navbar/assets/svgs/home.svg'
import respoIcon from '@/layout/Navbar/assets/svgs/respo.svg'
import photoIcon from '@/layout/Navbar/assets/svgs/photo.svg'
import lockIcon from '@/layout/Navbar/assets/svgs/lock.svg'
import coffeIcon from '@/layout/Navbar/assets/svgs/coffe.svg'
const { SubMenu } = Menu
const menuList = [
  {
    title: '导航',
    list: [
      {
        label: '首页',
        icon: <ReactSVG src={homeIcon} />,
        path: '/',
      },
      {
        label: '仓库',
        icon: <ReactSVG src={respoIcon} />,
        path: '/respositories',
      },
      {
        label: '相册',
        icon: <ReactSVG src={photoIcon} />,
        path: '/photo',
      },
      {
        label: '日记',
        icon: <ReactSVG src={lockIcon} />,
        path: '/diary',
      },
      {
        label: '关于',
        icon: <ReactSVG src={coffeIcon} />,
        children: [
          {
            label: '关于我',
            icon: <ReactSVG src={coffeIcon} />,
            path: '/about',
          },
          {
            label: '留言本',
            icon: <MessageOutlined />,
            path: '/about/message',
          },
        ],
      },
    ],
  },
  // {
  //   title: '组成',
  //   list: [
  //     {
  //       label: '分类',
  //       icon: <AppstoreOutlined />,
  //       children: [
  //         {
  //           label: '设计作品',
  //           path: '/projects',
  //         },
  //         {
  //           label: '技巧杂烩',
  //           path: '/skill',
  //         },
  //         {
  //           label: '生活随笔',
  //           path: '/lifeEssay',
  //         },
  //         {
  //           label: '兴趣爱好',
  //           path: '/hobby',
  //         },
  //       ],
  //     },
  //   ],
  // },
]
interface NavBarProps {
  width: number
  isCollapse: boolean
  setIsCollapse: (args: boolean) => void
}
const Navbar: FC<NavBarProps> = ({ width, isCollapse, setIsCollapse }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(['首页'])
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  })
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()
  const renderMenuList = (menuList: MenuList[]) => {
    return menuList.map((item, index) => {
      return item.children ? (
        <SubMenu key={item.label} icon={item.icon} title={item.label}>
          {item.children.map((subItem) => (
            <Menu.Item key={subItem.path} icon={subItem.icon}>
              {subItem.label}
            </Menu.Item>
          ))}
        </SubMenu>
      ) : (
        <Menu.Item key={item.path} icon={item.icon}>
          {item.label}
        </Menu.Item>
      )
    })
  }

  const onClickMenu = ({ key }: { key: string }) => {
    navigate(key)
    window.scroll(0, 0)
    setSelectedKeys([key])

    if (isMobile && !isCollapse) {
      setIsCollapse(!isCollapse)
    }
  }
  return (
    <div style={{ width }}>
      {menuList.map((menu) => {
        return (
          <span key={menu.title}>
            <div className={styles.label}>
              <span>{menu.title}</span>
            </div>
            <Menu selectedKeys={selectedKeys} mode="inline" theme="dark" inlineCollapsed={collapsed} onClick={onClickMenu}>
              {renderMenuList(menu.list)}
            </Menu>
          </span>
        )
      })}
    </div>
  )
}
export default Navbar
