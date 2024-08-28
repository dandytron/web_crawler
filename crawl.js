import { JSDOM } from 'jsdom'

function normalizeURL(s) {
    let urlObj = new URL(s)
    let fullpath = `${urlObj.host}${urlObj.pathname}`
    if (fullpath.slice(-1) === '/') {
        fullpath = fullpath.slice(0, -1)
    }
    return fullpath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urlList = []
    // creates a new "document object model" or DOM
    const dom = new JSDOM(htmlBody)
    // returns an array of <a> tag "anchor" elements
    const nodeList = dom.window.document.querySelectorAll('a')
    // convert to an array
    const anchorArray = Array.from(nodeList)
    // loop through the list and add the URLs to the return array.
    anchorArray.forEach(anchorTag =>{
        if (anchorTag.hasAttribute('href')) {
            let url = anchorTag.getAttribute('href')

            try {
                url = new URL(url, baseURL).href
                urlList.push(url)
            } catch(err) {
                console.log('${err.message}: ${href}')
            }
            
        }

    })
    return urlList
}

async function crawlPage(currentURL) {
    // Status message so we know that we're traversing
    console.log(`crawling ${currentURL}`)

    let res
    try {
        res = await fetch(currentURL)
        if (res.status > 399) {
            throw new Error(`Got Network error: ${res.status}`)
        }
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('text/html')) {
            throw new Error(`Got non-HTML response: ${contentType}`)
        }

        console.log(await res.text())

    } catch (err) {
        console.error(err.message)
    }

}

// we don't need the 'export function' keywords above if we choose to export as below:
export { normalizeURL, getURLsFromHTML, crawlPage }