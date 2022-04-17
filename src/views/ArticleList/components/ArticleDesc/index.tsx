/*
 * @Author: Mario
 * @Date: 2022-03-01 18:27:32
 * @LastEditTime: 2022-04-09 17:18:48
 * @LastEditors: Mario
 * @Description: 文章详情组件
 */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getArticleDesc } from '@/api/Articles'
import BlogHeader from '@/components/BlogHeader'
import VditorPreview from '@/components/VditorPreview'
import Breadcrumb from '@/components/Breadcrumb'
import { diffDom, toTree } from '@/utils'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from '@/store'
// import MarkdownIt from 'markdown-it'
// import MarkdownContainer from 'markdown-it-container'
interface IPreviewOptions {
  mode: 'dark' | 'light'
  customEmoji?: IObject
  lang?: keyof II18n
  i18n?: ITips
  lazyLoadImage?: string
  emojiPath?: string
  hljs?: IHljs
  speech?: {
    enable?: boolean
  }
  anchor?: number // 0: no render, 1: render left, 2: render right
  math?: IMath
  cdn?: string
  markdown?: IMarkdownConfig
  renderers?: ILuteRender
  theme?: IPreviewTheme
  icon?: 'ant' | 'material' | undefined

  transform?(html: string): string

  after?(): void
}
const TestVditorEditor = () => {
  const [markdown, setMarkdown] = useState('')
  const [headerData, setHeaderData] = useState({ title: '', desc: '' })
  const params = useParams()

  const dispatch = useDispatch()
  const { setCategoryState } = bindActionCreators(actionCreators, dispatch)
  // const md = MarkdownIt()
  // 获取文章详情
  const { run } = useRequest(() => getArticleDesc({ id: params.id }), {
    manual: true,
    onSuccess: async (result) => {
      if (result.code === 1) {
        const { articleDesc, ...rest } = result.data
        setHeaderData({
          ...rest,
          isCenter: true,
          customStyle: {
            fontSize: '24px',
          },
        })
        setMarkdown(handleHtml(articleDesc))
      }
    },
  })
  const handleHtml = (markdown: string) => {
    const reg = /(\[scoped\]\s+(warning|success|danger)\s+(提示|注意|危险)(.*)\n?(.*)?\n?\[\/scoped\])/gi
    return markdown.replace(reg, (result) => {
      const finallyStr = result.replace(/\n+/g, '')
      const replaceResult = /(\[scoped\]\s+(warning|success|danger)\s+(提示|注意|危险)(.*)\n?(.*)?\n?\[\/scoped\])/gi.exec(finallyStr)
      if (replaceResult) {
        const type = replaceResult[2]
        const tip = replaceResult[3]
        const content = replaceResult[4]
        return `<div class="custom-block ${type}">${tip ? `<p class="custom-block-title">${tip}</p>` : ''}${content}</div>`
      } else {
        return `<div>解析异常</div>`
      }
    })
  }
  // const resolveMarkdown = () => {
  //   md.use(MarkdownContainer, 'warning', {
  //     marker: ':',
  //     validate: function (params: string) {
  //       return false
  //     },
  //     render: function (tokens: any, idx: any) {
  //       const m = tokens[idx].info.trim().match(/^(warning|success|danger)\s+(.*)/)
  //       const replaceResult = tokens[idx].info.trim().replace(/success|warning|danger/, '')
  //       if (tokens[idx].nesting === 1) {
  //         let type = ''
  //         let info = ''
  //         if (replaceResult) {
  //           type = md.utils.escapeHtml(m[1])
  //           info = md.utils.escapeHtml(m[2])
  //         } else {
  //           type = tokens[idx].info.trim()
  //         }
  //         // opening tag
  //         return `<div class="custom-block ${type}">${info ? `<p class="custom-block-title">${info}</p>` : ''}\n`
  //       } else {
  //         // closing tag
  //         return '</div>\n'
  //       }
  //     },
  //   })
  // }

  // const headerData = {
  //   title: '相册图片',
  //   desc: '美好的事情值得纪念呦 ~ ',
  //   isCenter: true,
  //   customStyle: {
  //     fontSize: '24px',
  //   },
  // }
  // 文章预览配置
  const options: IPreviewOptions = {
    mode: 'dark',
    hljs: {
      enable: true,
      style: 'native',
      lineNumber: true,
    },
  }

  // 根据h标签生成目录
  const asyncRender = () => {
    const root = document.querySelector('.vditor-reset')
    const tags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
    const hTags = diffDom(root, [], tags).map((node) => ({
      hLevel: Number(node.tagName.replace('H', '')),
      href: `#${node.id}`,
      title: node.id,
    }))
    const tree = toTree(hTags)
    setCategoryState(tree)
  }
  useEffect(() => {
    run()
  }, [run])
  return (
    <div className="article-desc">
      <BlogHeader {...headerData} />
      <div className="warrper-md">
        <Breadcrumb />
        {markdown ? <VditorPreview markdown={markdown} options={options} callback={asyncRender} /> : null}
      </div>
    </div>
  )
}

export default TestVditorEditor
