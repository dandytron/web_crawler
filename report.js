function printReport(pages) {

    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    //?
    const sortedPages = sortPages(pages)
    for (page of sortedPages) {
        const url = page[0]
        const count = page[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
}

// sorts a dictionary of page sinto a list of tuples (url, count)
// in descending order of counts
function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
        if (pageB[1] === pageA[1]) {
            return pageA[0].localeCompare(pageB[0])
        }
        return pageB[1] - pageA[1]
    })
    pagesArr
}

export { printReport, sortPages }