function load (urls, test, callback) {
  let remaining = urls.length

  function maybeCallback () {
    remaining = --remaining
    if (remaining < 1) {
      callback()
    }
  }

  if (test()) {
    return callback()
  }

  for (const { type, url, options = { async: true, defer: true }} of urls) {
    const isScript = type === 'script'
    const tag = document.createElement(isScript ? 'script': 'link')
    if (isScript) {
      tag.src = url
      tag.async = options.async
      tag.defer = options.defer
    } else {
      tag.rel = 'stylesheet'
      tag.href = url
    }
    tag.onload = maybeCallback
    document.body.appendChild(tag)
  }
}

export default load
