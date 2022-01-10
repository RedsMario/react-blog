import React from 'react'
import ReactDOM from 'react-dom'
import '@/style/index.css'
import App from '@/views/app'
import '@/plugins'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
// 捕获aplayer错误
window.addEventListener('error', (event) => {})
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
