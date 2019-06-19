module.exports = (app, fs, conceptEvents, eventsData) => {
    app.post('/publish-event', (req, res) => {
        if (req.url === '/publish-event' && eventsData.length === 0) {
            eventsData.push(conceptEvents[0])   

            console.log(eventsData)

            fs.writeFile('./data/json/sportEvents.json', JSON.stringify(eventsData), err => {
                if(err) {
                    return console.log(err) 
                }
            })

            conceptEvents.length = 0

            console.log('Event Data:')
            console.log(eventsData)

            res.redirect('/events')
        } else if (eventsData.length > 0) {
            console.log(conceptEvents)

            const exists = eventsData.find(e => {
                return e.general.title.toLowerCase() === conceptEvents[0].general.title.toLowerCase()
            })
            if (!exists) {
                eventsData.push(conceptEvents[0])

                conceptEvents.length = 0

                console.log('Event Data:')
                console.log(eventsData)

                res.redirect('/')
            } else {
                console.log("Sorry, that event already exists.")

                res.redirect('/')
            }
        }
    })
}