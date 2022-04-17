import WarrperPagination from '@/components/Pagination'
import ArticleItem from '@/views/ArticleList/components/ArticleItem'
import PinnedArticle from '@/views/Home/components/PinnedArticle'
import styles from '@/views/ArticleList/index.module.scss'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
export interface Article {
  title: string
  simpleDesc: string
  article: string
  author: string
  banner?: string
  time: string
  isLeftRight?: boolean // 是否左右布局显示
  isPinned?: boolean // 是否置顶
  isCloseComment?: boolean // 是否关闭评论
  commentCount?: number // 评论条数
}
interface ArticleListProps {
  articleList: Article[]
}

const ArticleList: FC<ArticleListProps> = ({ articleList }) => {
  const navigate = useNavigate()

  // 预览文章详情
  const onPreviewDesc = (articleId: number) => {
    navigate(`/article/${articleId}`)
  }

  return (
    <div className={styles['article-list']}>
      {articleList?.map((article, index) =>
        article.isPinned ? <PinnedArticle key={index} index={index} {...article} handleClick={onPreviewDesc} /> : <ArticleItem key={index} index={index} {...article} handleClick={onPreviewDesc} />
      )}
      <WarrperPagination />
    </div>
  )
}

export default ArticleList
