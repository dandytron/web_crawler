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

// we don't need the 'export function' keywords above if we choose to export as below:
export { normalizeURL, getURLsFromHTML }