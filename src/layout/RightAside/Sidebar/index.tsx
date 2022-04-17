import { useState } from 'react'
import { Tabs, Anchor } from 'antd'
import { ReactSVG } from 'react-svg'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { State } from '@/store'
import classnames from 'classnames'
import likeoutSvg from '@/assets/svgs/likeout.svg'
import giftSvg from '@/assets/svgs/gift.svg'
import commentSvg from '@/assets/svgs/comment.svg'

import NewArticle from '@/layout/RightAside/Sidebar/components/NewArticle'
import BlogInfo from '@/layout/RightAside/Sidebar/components/BlogInfo'
import BabelCloud from '@/layout/RightAside/Sidebar/components/BabelCloud'
import styles from '@/layout/RightAside/Sidebar/index.module.scss'

const { TabPane } = Tabs
const { Link } = Anchor
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
  const location = useLocation()
  const category = useSelector((state: State) => state.category)
  const isDirectory = location.pathname.indexOf('/article') > -1
  const tabsList: TabsList[] = [
    {
      title: '热门文章',
      icon: likeoutSvg,
      children: [
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/1.jpg',
          icon: require('@/layout/RightAside/Sidebar/components/NewArticle/assets/svgs/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/2.jpg',
          icon: require('@/layout/RightAside/Sidebar/components/NewArticle/assets/svgs/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/3.jpg',
          icon: require('@/layout/RightAside/Sidebar/components/NewArticle/assets/svgs/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/4.jpg',
          icon: require('@/layout/RightAside/Sidebar/components/NewArticle/assets/svgs/icon-one.svg').default,
        },
        {
          title: 'handsome —— 一款typecho主题',
          content: 1772,
          imgSrc: 'https://cdn.mariowork.com/auth/5.jpg',
          icon: require('@/layout/RightAside/Sidebar/components/NewArticle/assets/svgs/icon-one.svg').default,
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
          icon: require('@/layout/RightAside/Sidebar/components/NewArticle/assets/svgs/icon-one.svg').default,
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
          icon: require('@/layout/RightAside/Sidebar/components/NewArticle/assets/svgs/icon-one.svg').default,
        },
      ],
    },
  ]

  // tab切换
  const onTabClick = (key: string) => {
    setCurrentIndex(Number(key))
  }
  // 生成目录
  const generateCatetory = (arr: any) => {
    return arr.map((link: any) => {
      if (!link.children) {
        return <Link key={link.href} href={link.href} title={link.title} />
      } else {
        return (
          <Link key={link.href} href={link.href} title={link.title}>
            {generateCatetory(link.children)}
          </Link>
        )
      }
    })
  }
  return (
    <div className={classnames(styles.sidebar, isDirectory ? styles['sidebar-fixed'] : '')}>
      {isDirectory ? (
        <div className={styles.directory}>
          <h5 style={{ fontSize: '16px', marginBottom: '15px', color: 'inherit' }}>文章目录</h5>
          <Anchor offsetTop={80} targetOffset={80} showInkInFixed>
            {generateCatetory(category)}
          </Anchor>
        </div>
      ) : (
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
      )}
      {!isDirectory ? (
        <>
          <BlogInfo />
          <BabelCloud />
        </>
      ) : null}
    </div>
  )
}

export default Sidebar
