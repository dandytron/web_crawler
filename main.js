import { crawlPage } from "./crawl.js"

async function main() {
    const args = process.argv
    if (args.length == 3) {
        // try to create a new URL object with the arg, exit if we can't
        try {
            const url = new URL(args[2])
            console.log(`Crawler is starting, beginning at root URL '${args[2]}'`)           
        } catch(err) {
            console.log(`${err.message}: ${args[2]} is not a valid URL. Please provide a valid URL.`)
            return
        }
        
    // if args are greate or less than 3 we have invalid input, send message and exit
    } else if (args.length < 3) {
        console.log(Error('No URL provided. Please provide a root URL.').message)
        return
    } else {
        console.log(Error('Too many command-line arguments. Please only provide one root URL.').message)
        return
    }

    const baseURL = process.argv[2]

    console.log(`Beginning crawl of: ${baseURL}...`)

    await crawlPage(baseURL)
    
}

main()