interface URL {
  type: 'script' | 'style';
  url: string;
  options?: {
    async: boolean;
    defer: boolean;
  }
}

function makeScript(url: string, async: boolean, defer: boolean) {
  const tag = document.createElement('script')
  tag.src = url
  tag.async = async
  tag.defer = defer
  return tag
}

function makeLink(url: string) {
  const tag = document.createElement('link')
  tag.rel = 'stylesheet'
  tag.href = url
  return tag
}

export default function (urls: URL[], test: () => boolean, callback: () => void) {
  let remaining = urls.length

  function maybeCallback () {
    remaining = --remaining
    if (remaining < 1) {
      callback()
    }
  }

  if (!test()) {
    urls.forEach(({ type, url, options = { async: true, defer: true }}) => {
      const isScript = type === 'script'
      const tag = isScript ? makeScript(url, options.async, options.defer) : makeLink(url)
      tag.onload = maybeCallback
      document.body.appendChild(tag)
    })
  } else {
    callback()
  }
}
