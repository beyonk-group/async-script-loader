export default function (url, test, callback, options = { async = true, defer = true }) {
  if (!test()) {
    const tag = document.createElement('script')
    tag.src = url
    tag.async = options.async
    tag.defer = options.defer
    tag.onload = callback
    document.body.appendChild(tag)
  } else {
    callback()
  }
}
