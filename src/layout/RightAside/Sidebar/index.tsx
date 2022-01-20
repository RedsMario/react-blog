import { Tabs } from 'antd'
import { ReactSVG } from 'react-svg'
import likeoutSvg from '@/assets/svgs/likeout.svg'
import giftSvg from '@/assets/svgs/gift.svg'
import commentSvg from '@/assets/svgs/comment.svg'
import NewArticle from '@/layout/RightAside/Sidebar/components/NewArticle'
import BlogInfo from '@/layout/RightAside/Sidebar/components/BlogInfo'
import BabelCloud from '@/layout/RightAside/Sidebar/components/BabelCloud'
import styles from '@/layout/RightAside/Sidebar/index.module.scss'
import { useState } from 'react'
const { TabPane } = Tabs

interface Tab {
  title: string
  icon: string
}
interface Comment extends Tab {
  imgSrc: string
  content: string | number
}
export interface TabsList extends Tab {
  children: Comment[]
}
const Sidebar = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const tabsList: TabsList[] = [
    {
      title: '热门文章',
      icon: likeoutSvg,
      children: [
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/1.jpg',
          icon: require('@/assets/svgs/newArticle/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/2.jpg',
          icon: require('@/assets/svgs/newArticle/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/3.jpg',
          icon: require('@/assets/svgs/newArticle/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/4.jpg',
          icon: require('@/assets/svgs/newArticle/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/5.jpg',
          icon: require('@/assets/svgs/newArticle/icon-one.svg').default,
        },
      ],
    },
    {
      title: '最新评论',
      icon: commentSvg,
      children: [
        {
          title: '潜心学习的打工人',
          content: '感谢学长分享',
          imgSrc: 'https://cdn.mariowork.com/auth/5.jpg',
          icon: require('@/assets/svgs/newArticle/icon-one.svg').default,
        },
      ],
    },
    {
      title: '随机文章',
      icon: giftSvg,
      children: [
        {
          title: '为你的项目添加开源许可协议',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/5.jpg',
          icon: require('@/assets/svgs/newArticle/icon-one.svg').default,
        },
      ],
    },
  ]

  const onTabClick = (key: string) => {
    setCurrentIndex(Number(key))
  }
  return (
    <div className={styles.sidebar}>
      <Tabs defaultActiveKey={`${currentIndex}`} animated onTabClick={onTabClick}>
        {tabsList.map((tab, index) => (
          <TabPane
            tab={
              <ReactSVG
                className={index === currentIndex ? `${styles.active}` : ''}
                src={tab.icon}
                beforeInjection={(svg) => {
                  svg.setAttribute('style', 'color: rgb(119, 119, 119)')
                }}
              />
            }
            key={index}
          >
            <NewArticle {...tab} currentIndex={index} />
          </TabPane>
        ))}
      </Tabs>
      <BlogInfo />
      <BabelCloud />
    </div>
  )
}

export default Sidebar
