import { ReactSVG } from 'react-svg'
import styles from '@/components/Breadcrumb/index.module.scss'
import backSvg from '@/assets/svgs/back.svg'
import homeSvg from '@/assets/svgs/home.svg'
import { warrperClass } from '@/utils/classnames'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
interface BreadcrumbProps {
  goBack?: () => void
  title?: string
}
const Breadcrumb: FC<BreadcrumbProps> = ({ goBack, title }) => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }
  return (
    <ol className={warrperClass(styles, 'breadcrumb bg-white-pure')}>
      <li onClick={() => (goBack ? goBack() : goHome())}>
        <div className="flex" style={{ alignItems: 'center' }}>
          <div className={warrperClass(styles, goBack ? 'home-icons' : '')}>
            <ReactSVG src={goBack ? backSvg : homeSvg} />
          </div>
          <div style={{ marginLeft: '5px' }}>{goBack ? '返回' : title ? title : '首页'}</div>
        </div>
      </li>
      <li className={warrperClass(styles, 'active')}>正文&nbsp;&nbsp;</li>
    </ol>
  )
}
export default Breadcrumb
