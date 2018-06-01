function split(array, size){
    var localArray = array.slice(0)
    var results = []
    while (localArray.length)
        results.push(localArray.splice(0, size));
    return results;
}

const requestGenerator = (tableName, data, size) => split(data, size).map(subarray =>{
    return {
        RequestItems: {
            [tableName]: subarray
        }
    }
})

module.exports = requestGenerator