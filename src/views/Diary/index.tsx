import { useState } from 'react'
import Header from '@/components/BlogHeader'
import styles from '@/views/Diary/index.module.scss'
import ArticleList from '@/views/ArticleList'
import { useRequest, useMount } from 'ahooks'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getDiaryList, getDiaryDesc } from '@/api/Diary'

const Diary = () => {
  const [diaryList, setDiaryList] = useState()
  const headerData = {
    title: '我的日记',
    desc: '记录开心美好的每一天 ~ ',
    isCenter: true,
    customStyle: {
      fontSize: '24px',
    },
  }
  // 获取日记列表
  const { run } = useRequest(getDiaryList, {
    manual: true,
    onSuccess: (result) => {
      if (result.code === 1) {
        setDiaryList(result.data)
      }
    },
  })

  useMount(() => {
    run()
  })
  return (
    <div className={styles.diary}>
      <Header {...headerData} />
      <section className="padding-20">{diaryList && <ArticleList articleList={diaryList} />}</section>
    </div>
  )
}

export default Diary
