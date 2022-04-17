import { useRef, useState } from 'react'
import BlogHeader from '@/components/BlogHeader'
import Breadcrumb from '@/components/Breadcrumb'
import { ReactSVG } from 'react-svg'
import { warrperClass } from '@/utils/classnames'
import zanSvg from '@/views/About/assets/svgs/zan.svg'
import styles from '@/views/About/index.module.scss'
import classnames from 'classnames'
import CommentList from '@/views/CommentList'
import party from 'party-js'

const About = () => {
  const [isActive, setIsActive] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerData = {
    title: '关于我',
    desc: '路漫漫其修远兮，吾将上下而求索 ~',
    isCenter: true,
    customStyle: {
      fontSize: '30px',
    },
  }
  const handleLike = () => {
    const runButton = buttonRef.current as HTMLButtonElement
    party.confetti(runButton, {
      count: 60,
      size: 0.6,
    })
    setIsActive(!isActive)
  }
  return (
    <div className={styles.about}>
      <BlogHeader {...headerData} />
      <div className="warrper-md">
        <Breadcrumb />
        <div className={classnames(styles['entry-thumbnail'])} aria-hidden="true">
          <div className={warrperClass(styles, 'item-thumb lazy')} style={{ backgroundImage: 'url(https://www.ihewro.com/usr/uploads/2017/04/3655500315.png)' }}></div>
        </div>
        <div className={classnames(styles['post-message'])} style={{ fontSize: '14px' }}>
          <div className={styles['entry-content']}>
            <h2>自述</h2>
            <p></p>
            <div className={styles['flex-column']}>
              <div className={styles['flex-block']} style={{ flex: 'auto' }}>
                所在地：西安
                <br />
                目前岗位：前端开发
                <br />
              </div>
              <div className={styles['flex-block']} style={{ flex: 'auto' }}>
                目标：做最酷的人。
                <br />
                联系方式：<a href="mailto:ihewro@163.com">marioworker@163.com</a>
                <br />
              </div>
            </div>
            <p></p>
            <h2>技能</h2>
            <p></p>
            <div className={styles['flex-column']}>
              <div className={styles['flex-block']} style={{ flex: 'auto' }}>
                <div className={warrperClass(styles, 'tip inlineBlock share simple small')}>前端/后台开发</div>
                <ul>
                  <li>web站点</li>
                  <li>后台管理</li>
                  <li>爬虫</li>
                </ul>
              </div>
              <div className={styles['flex-block']} style={{ flex: 'auto' }}>
                <div className={warrperClass(styles, 'tip inlineBlock share simple small')}>前端/后台开发</div>
                <ul>
                  <li>javascript</li>
                  <li>shell</li>
                  <li>Go</li>
                </ul>
              </div>
            </div>
            <p></p>
            <h2>相关经历</h2>
            <p></p>
            <ul className={styles.experience}>
              <li>2019-2021 工作于东信北邮，日常使用Scala完成接口、前端需求。偶尔与图像识别、视频处理传输相关工作。 现主要工作是c++视频播放传输工作。</li>
              <li>2021.5 - 2021.10 字节飞书实习，PC 客户端开发</li>
            </ul>
            <p></p>
            <h2>相关作品</h2>
            <p></p>
            <ul className={styles.projects}>
              <li>React-Blog</li>
              <li>Typescript</li>
            </ul>
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

export default About
