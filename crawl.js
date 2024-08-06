export function normalizeURL(s) {
    let urlObj = new URL(s)
    let fullpath = `${urlObj.host}${urlObj.pathname}`
    if (fullpath.slice(-1) === '/') {
        fullpath = fullpath.slice(0, -1)
    }
    return fullpath
}