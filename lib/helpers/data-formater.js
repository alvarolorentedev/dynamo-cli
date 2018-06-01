const format = (data) => {
    let headers = data.shift()
    return data.map(dataPoint => {
        let items = {}
        dataPoint.forEach((prop,index) => {
            Object.assign(items, { [headers[index]] : prop } )    
        })
        
        return { PutRequest: { Item: items } }
    })
}

module.exports = format