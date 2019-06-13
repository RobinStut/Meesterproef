const request = require("request")

module.exports = () => {
    return new Promise((resolve, reject) => {
    
    const options = {
    url: 'https://raw.githubusercontent.com/RobinStut/meesterproef/development/data/json/sportaanbieders.json'
    };
 
    callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const response = JSON.parse(body);
            const allSportClubs = response.filter(item => Object.keys(item).length !== 0); // remove all empty records
            const allSports = allSportClubs.map(item => item.sport)
            const uniqueSports = [...new Set(allSports)].sort() 

            const sortedSports = uniqueSports.reduce((a, sport) => {
                if (sport !== undefined) {
                    let firstLetter = sport[0].toLocaleUpperCase()
                    // either push to an existing dict entry or create one
                    if (a[firstLetter]) {
                        a[firstLetter].push(sport)
                    } else {
                        a[firstLetter] = [sport]
                    }
                    return a
                }
            }, [])
            // return data
            resolve(sortedSports)
            reject(error)
        }
    }
    request(options, callback)
    })
  }