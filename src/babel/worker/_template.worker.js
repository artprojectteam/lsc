// 記述例
self.addEventListener('message', (event) => {
  self.postMessage('success')
  // or
  self.postMessage(['success'])
})