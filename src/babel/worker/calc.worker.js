self.addEventListener('message', (event) => {
  self.postMessage('test')
})