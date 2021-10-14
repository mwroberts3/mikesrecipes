exports.encryptUserName = (userName) => {
    let encryptedArray = []

    for(let i=0; i < userName.length; i++) {
        if (+userName.charCodeAt(i) % 2 === 0) {
            encryptedArray.push(+userName.charCodeAt(i) + 90)
        } else {
            encryptedArray.push(+userName.charCodeAt(i) + 14)
        }
    }

    let encryptedString = ''

    for (let i=0; i < encryptedArray.length; i++) {
        encryptedString += String.fromCharCode(encryptedArray[i])
    }

    return encryptedString.replace(/\s+/g, '')
}