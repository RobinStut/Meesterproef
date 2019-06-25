const fetch = require("./helper/fetcher.js")
const filter = require("./helper/filter.js")

const getAllSports = require("./sportlist/sportlist-az-list.js")
const quizCalc = require("./quiz/quiz-calculation.js")

let _eventData, _clubsData, _descriptionData, _quizData

async function updateData() {
	_eventData = await fetch.file("data/json/sportEvents.json")
	_clubsData = await fetch.file("data/json/sportaanbieders.json")
	_descriptionData = await fetch.file("data/json/sportDescription.json")
	_quizData = await fetch.file("data/json/sportQuizFilter.json")
}

updateData()

// Update the data, not sure if this is good practice.
setInterval(updateData, 1000 * 60 * 60 * 24)

module.exports = app => {
	// HOME
	app.get("/", async (req, res) => {
		const firstTwo = JSON.parse(_eventData).slice(0, 2)

		res.render("pages/index.ejs", {
			hero: "hero--big",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"],
			sportEvents: firstTwo,
			popUpData: JSON.parse(_eventData)
		})
	})

	// SPORTLIST
	app.get("/sportslist", async (req, res) => {
		const allSports = await getAllSports(_clubsData)

		res.render("pages/sportlist/sportlist-az-list.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"],
			data: allSports,
			keys: Object.keys(allSports)
		})
	})

	app.get("/sportsmap", (req, res) => {
		res.render("pages/sportlist/sportlist-map.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"]
		})
	})

	app.get("/sportslist/clubs/:id", async (req, res) => {
		const id = req.params.id

		const matchingClubs = await filter.clubs(_clubsData, id)
		const description = await filter.descriptions(_descriptionData, id)

		res.render("pages/sportlist/sportlist-clubs.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"],
			sport: id,
			clubs: matchingClubs,
			sportDescription: description
		})
	})

	app.get("/sportslist/events/:id", async (req, res) => {
		const id = req.params.id

		const matchingEvents = await filter.eventsByName(_eventData, id)
		const description = await filter.descriptions(_descriptionData, id)

		res.render("pages/sportlist/sportlist-events.ejs", {
			hero: "hero--small",
			heroText: ["Sporten A-Z"],
			sport: req.params.id,
			events: matchingEvents,
			sportDescription: description
		})
	})

	// EVENTS
	app.get("/events", (req, res) => {
		res.render("pages/events/events-overview.ejs", {
			hero: "hero--small",
			heroText: ["Activiteiten"],
			data: JSON.parse(_eventData)
		})
	})

	app.get("/events/:id", async (req, res) => {
		const id = req.params.id
		const matchingEvents = await filter.eventsById(_eventData, id)

		console.log(matchingEvents)

		res.render("pages/events/events-detail.ejs", {
			hero: "hero--small",
			heroText: [""],
			data: matchingEvents
		})
	})

	// QUIZ
	app.get("/quiz", (req, res) => {
		res.render("pages/quiz/quiz-questions.ejs", {
			hero: "hero--small",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})

	app.post("/quiz", (req, res) => {
		const quizResult = quizCalc(req, _quizData)

		res.render("pages/quiz/quiz-result.ejs", {
			quizResult: quizResult,
			hero: "hero--small",
			heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
		})
	})

	// SPORTPROVIDER
	app.get("/login", (req, res) => {
		res.render("pages/sportprovider/sportprovider-login.ejs", {
			hero: "hero--small",
			heroText: ["Login"]
		})
	})

	app.get("/dashboard", (req, res) => {
		res.render("pages/sportprovider/sportprovider-dashboard.ejs", {
			hero: "hero--small",
			heroText: ["Dashboard"]
		})
	})

	app.get("/create-event", (req, res) => {
		res.render("pages/sportprovider/sportprovider-create-event.ejs", {
			hero: "hero--small",
			heroText: [""],
			sportEvents: JSON.parse(_eventData),
			sportDescription: JSON.parse(_descriptionData)
		})
	})
}
