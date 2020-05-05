<p align="center">
  <img width="186" height="90" src="https://user-images.githubusercontent.com/218949/44782765-377e7c80-ab80-11e8-9dd8-fce0e37c235b.png" alt="Beyonk" />
</p>

## Async Script Loader

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![CircleCI](https://circleci.com/gh/beyonk-adventures/async-script-loader.svg?style=shield)](https://circleci.com/gh/beyonk-adventures/async-script-loader)

Allows asynchronous loading of scripts and styles in a Single Page Application (or anything else, in fact):

* Using a test to ensure that the code is only loaded once
* Running a callback once the script is loaded
* Running a callback if the script is already loaded
* Not blocking the main thread

### Reasoning

Having integrated a multitude of third-party SDKs from large, well known providers, I've come to the conclusion that not having a standard interface turns the whole thing into a minefield of callbacks, timers, random library-specific loader modules, and global objects on the window, resulting in XSS risks and all sort of other undesirable behaviour. This module aims to provide a standard way of loading third-party dependencies.

### Usage

You pass a list of urls to the loader, along with a method for checking that your page is ready, and a callback to call when it is.

Urls can be scripts or stylesheets.

### Script Tags

You can use the module like so, for a library loaded from example.com, which, when loaded, adds an attribute called PROVIDER to the global window object.

```js
<script>
  import loader from '@beyonk/async-script-loader'

  const url = '//example.com/sdk/1.0.0/lib.js'

  function test () {
    return !!window.PROVIDER
  }

  function callback () {
    window.PROVIDER.someFunction()
  }

  loader([
    { type: 'script', url }
  ], test, callback)
</script>
```

#### Style Tags

You can include any number of tags, including style tags.

When the last one has loaded, the callback will be called.

```js
<script>
  import loader from '@beyonk/async-script-loader'

  loader([
    { type: 'script', url: '//example.com/sdk/1.0.0/lib.js' },
    { type: 'script', url: '//example.com/sdk/1.0.0/lib2.js' },
    { type: 'style', url: '//example.com/sdk/1.0.0/style.css' }
  ], () => {
    return !!window.PROVIDER
  }, () => {
    window.PROVIDER.someFunction()
  })
</script>
```

No more tears!