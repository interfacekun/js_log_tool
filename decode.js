const zlib = require('zlib');
const walkDir = require('./lib/walk-dir')
const path = require('path');
const fs = require('fs');
const dir = "./pack/"
const dst = "./unpack/"

walkDir.walk(dir, (d, file) => {

    let localFileName = path.join(d, file)
    let dstFileName = path.join(dst, file)

    if(localFileName.indexOf(".gitignore") === -1){

        fs.readFile(localFileName, 'utf-8', (err, data) => {
            data = Buffer.from(data, 'base64')
            zlib.unzip(data, (err, buffer) => {
                if (err) {
                    console.log("zlib.inflate err", JSON.stringify(err))
                } else {
                    fs.writeFile(dstFileName, buffer.toString(), (err) => {
                        if (err) {
                            console.log(`fs.writeFile err`, JSON.stringify(err))
                        } else {
                            console.log(`fs.writeFile ${dstFileName} ok`)
                        }
                    })
                }
            })
        })

    } else {
        console.log(`filters ${localFileName}`)
    }
});