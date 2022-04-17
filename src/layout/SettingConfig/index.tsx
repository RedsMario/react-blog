/*
 * @Author: Mario
 * @Date: 2022-03-19 11:57:45
 * @LastEditTime: 2022-04-09 17:16:16
 * @LastEditors: Mario
 * @Description: 设置页面布局组件
 */
import styles from '@/layout/SettingConfig/index.module.scss'
import { ReactSVG } from 'react-svg'
import settingSvg from '@/assets/svgs/setting.svg'
import { warrperClass } from '@/utils/classnames'
import { Button, Switch } from 'antd'
import classnames from 'classnames'
import { useState } from 'react'
const SettingConfig = () => {
  const [isActive, setIsActive] = useState(false)
  const [isCollapse, setCollapse] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [settingList, setSettingList] = useState([
    {
      label: '固定头部',
      isLock: false,
    },
    {
      label: '盒子模型',
      isLock: true,
    },
    {
      label: '深色模式',
      isLock: false,
    },
  ])
  const mouseDown = () => {
    setCollapse(true)
  }
  const mouseUp = () => {
    setCollapse(false)
  }
  const onChange = () => {}
  return (
    <div className={warrperClass(styles, `settings panel panel-default ${isActive ? 'active' : ''}`)}>
      <div className={classnames(styles['setting-header'])}>
        <div className={classnames(styles['setting-icon'], isCollapse ? styles.down : '')} onClick={() => setIsActive(!isActive)} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseUp}>
          <ReactSVG src={settingSvg} />
        </div>
        <div className={classnames(styles['setting-title'])}>设置</div>
        <Button type="primary" danger size="small" shape="round" className={classnames(styles['reset-btn'])}>
          重置
        </Button>
      </div>
      <ul className={classnames(styles['setting-config'])}>
        {settingList.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <Switch checked={item.isLock} onChange={onChange} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SettingConfig
