import { useState } from 'react'
// import { useMediaQuery } from 'react-responsive'
import Header from '@/layout/Header'
import Navbar from '@/layout/Navbar'
import Content from '@/layout/Content'
import SettingConfig from '@/layout/SettingConfig'
import classnames from 'classnames'
import styles from '@/layout/index.module.scss'

const Layout = () => {
  const [isCollapse, setIsCollapse] = useState(true)
  const [initWidth, setInitWidth] = useState(220)
  // const [isBox, setIsBox] = useState(false)
  // const isLayout = useMediaQuery({
  //   query: '(max-width: 1300px)',
  // })
  // 'header-fixed',  isBox && isLayout ? '' : 'layout-box'
  return (
    <div className={classnames(styles.layout)}>
      <Header isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      <div style={{ backgroundColor: '#f9f9f9', height: 'auto' }}>
        <Navbar isCollapse={isCollapse} setIsCollapse={setIsCollapse} initWidth={initWidth} setInitWidth={setInitWidth} />
        <Content isCollapse={isCollapse} initWidth={initWidth} />
      </div>
      <SettingConfig />
    </div>
  )
}

export default Layout
