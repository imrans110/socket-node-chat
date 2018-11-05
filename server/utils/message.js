const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
        }
}

const generateLocationMessage = (from, coords) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: new Date().getTime()
    }
}



module.exports = {generateMessage, generateLocationMessage};