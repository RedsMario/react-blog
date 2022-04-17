import styles from '@/views/Message/components/MessageFrom/index.module.scss'
import { warrperClass } from '@/utils/classnames'
import { FC } from 'react'

export interface MessageFromProps {
  name: string
  avatar: string
  comment: string
  num: number
}
const MessageFrom: FC<MessageFromProps> = ({ name, avatar, comment, num }) => {
  // 映射颜色
  const colorMap: { [key: number]: string } = {
    50: '#22b7e5',
    100: '#cfdadd',
    500: '#fad732',
    1000: '#f05050',
  }
  // 根据评论数据改变颜色
  const getColor = (num: number) => {
    for (const key in colorMap) {
      if (num >= Number(key)) {
        break
      } else {
        return colorMap[key] as string
      }
    }
    return colorMap[1000]
  }
  return (
    <div className={styles['message-from']}>
      <div className={warrperClass(styles, 'panel-body')}>
        <span className={warrperClass(styles, 'pull-left thumb-sm avatar m-r')}>
          <img alt="" className="img-square" src={avatar} />
        </span>
        <span className={warrperClass(styles, `badge bg-danger pull-right`)} style={{ backgroundColor: `${getColor(num)}` }}>
          {num}
        </span>
        <span style={{ marginTop: '10px' }} className={warrperClass(styles, 'clear text-ellipsis')}>
          <span>{name}</span>
          <small className={warrperClass(styles, 'text-muted clear text-ellipsis')}>{comment}</small>
        </span>
      </div>
    </div>
  )
}

export default MessageFrom
