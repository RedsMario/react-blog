import { useState } from 'react'
import { useRequest, useMount } from 'ahooks'
import { getArticleList } from '@/api/Articles'
import { Article } from '@/views/ArticleList'
import Header from '@/components/BlogHeader'
import styles from '@/views/Home/index.module.scss'
import ArticleList from '@/views/ArticleList'

const Home = () => {
  const [articleList, setArticleList] = useState<Article[]>()

  const headerData = {
    title: `Mario's Blog`,
    desc: '试玉要烧三日满，辨材须待七年期。',
  }
  // 获取文章列表
  const { run } = useRequest(getArticleList, {
    manual: true,
    onSuccess: (result) => {
      if (result.code === 1) {
        setArticleList(result.data)
      }
    },
  })
  useMount(() => {
    run()
  })
  return (
    <div className={styles.home}>
      <Header {...headerData} />
      <section className="padding-20">{articleList && <ArticleList articleList={articleList} />}</section>
    </div>
  )
}

export default Home
