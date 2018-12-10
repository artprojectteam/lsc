// 画像の呼び出し(file-loaderがtrueのときのみ)
// 相対パスにはできないのでその場合はfile-loaderの使用をfalseにしてcopyディレクトリを利用する
import img from '../img/kokoiku_start.png'
import Worker from './worker/_template.worker'

console.log(img)

const a = new Promise((resolve) => {
  resolve(true)
})

a.then(() => {
  console.log('success')
})

const b = [1, 2, 3, 4]

for (let c of b) {
  console.log(c)
}

b.forEach((item) => {
  console.log(item)
})

// Web Workerを使う場合
// worker-loaderをハブにするのでJSのURLは書かない
const w = new Worker()
w.addEventListener('message', (event) => {
  console.log(event.data)
})

w.postMessage({
  xxx: 'foo'
})

// サービスワーカーの登録
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}