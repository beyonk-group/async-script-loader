import polkadot from 'polkadot'
import puppeteer from 'puppeteer'
import { getDocument, queries } from 'pptr-testing-library'

const app = polkadot(async (req, res) => {
  return 'console.log("hello")'
});
 
app.listen(5491, err => {
  if (err) throw err
})

async function run () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const $document = await getDocument(page)
}

run()