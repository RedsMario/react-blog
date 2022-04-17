import { useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import BlogHeader from '@/components/BlogHeader'
import Breadcrumb from '@/components/Breadcrumb'
import styles from '@/views/Message/index.module.scss'
import classnames from 'classnames'
import CommentList from '@/views/CommentList'
import party from 'party-js'
import zanSvg from '@/views/About/assets/svgs/zan.svg'
import { warrperClass } from '@/utils/classnames'
import { Row, Col } from 'antd'
import MessageFrom, { MessageFromProps } from '@/views/Message/components/MessageFrom'

const Message = () => {
  const [isActive, setIsActive] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerData = {
    title: '留言本',
    desc: '来都来了，留下点什么吧 ~ ',
    isCenter: true,
    customStyle: {
      fontSize: '24px',
    },
  }

  // 本周评论排行榜
  const commentRank: MessageFromProps[] = Array(2).fill({
    name: '范明明',
    avatar: 'https://gravatar.helingqi.com/wavatar/c7dbcad88f2f5e9113d18ef7a873397e?s=65&r=G&d=',
    comment: '一位热心的网友路过',
    num: 2,
  })
  // 总评论排行榜
  const totalRank: MessageFromProps[] = Array(10).fill({
    name: '范明明',
    avatar: 'https://gravatar.helingqi.com/wavatar/c7dbcad88f2f5e9113d18ef7a873397e?s=65&r=G&d=',
    comment: '一位热心的网友路过',
    num: 2000,
  })
  const handleLike = () => {
    const runButton = buttonRef.current as HTMLButtonElement
    party.confetti(runButton, {
      count: 60,
      size: 0.6,
    })
    setIsActive(!isActive)
  }
  return (
    <div className={styles.message}>
      <BlogHeader {...headerData} />
      <div className="warrper-md">
        <Breadcrumb />
        <div className={classnames(styles['entry-thumbnail'])} aria-hidden="true">
          <div className={warrperClass(styles, 'item-thumb lazy')} style={{ backgroundImage: 'url(https://www.ihewro.com/usr/uploads/2017/02/771535184.jpg)' }}></div>
        </div>
        <div className={classnames(styles['post-message'])} style={{ fontSize: '14px' }}>
          <div className={styles['entry-content']}>
            <h2>本周评论排行榜</h2>
            <p></p>
            <Row gutter={16}>
              {commentRank.map((item, index) => (
                <Col key={index} span={12}>
                  <MessageFrom {...item} />
                </Col>
              ))}
            </Row>
            <p></p>
            <h2>总评论排行榜</h2>
            <p></p>
            <Row gutter={16}>
              {totalRank.map((item, index) => (
                <Col key={index} span={12}>
                  <MessageFrom {...item} />
                </Col>
              ))}
            </Row>
            <p></p>
            <div className={styles['support-author']}>
              <button
                ref={buttonRef}
                id="star_post"
                data-cid="165"
                className={warrperClass(styles, `box-shadow-wrap-lg btn_post_footer like_button btn btn-pay btn-rounded ${isActive ? 'active' : ''}`)}
                onClick={handleLike}
              >
                <div className={warrperClass(styles, 'circle-rounded')}></div>
                <ReactSVG src={zanSvg} />
                <span>
                  赞&nbsp;
                  <span id="like_label" className={warrperClass(styles, 'like_label')}>
                    37
                  </span>
                </span>
              </button>
              <div className={warrperClass(styles, 'mt20 text-center article__reward-info')}>
                <span className={warrperClass(styles, 'mr10')}>如果觉得我的文章对你有用，请随意赞赏</span>
              </div>
            </div>
          </div>
        </div>
        <CommentList />
      </div>
    </div>
  )
}

export default Message
