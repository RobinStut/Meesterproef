const sportslistData = require("./sportslist.js")

module.exports = app => {
  app.get("/", (req, res) => {
    res.render("pages/index.ejs", {
      hero: "big-hero", 
      heroText: ["Amsterdam", "Zuid-Oost", "Be a part of it!"]
    })
  })
  app.get("/sportslist", async (req, res) => {
    const data = await sportslistData();
    res.render("pages/sportslist.ejs", {
      hero: "small-hero", 
      heroText: ["Sports Activities A-Z"],
      data: data,
      keys: Object.keys(data),
    })
  })
  app.get("/sportslist/:id", async (req, res) => {
    const id = req.params.id
    const data = await sportslistData();
    res.render("pages/sportlist-detail.ejs", {
      hero: "small-hero", 
      heroText: ["Sports Activities A-Z"],
      sport: id,
      data: data,
    })
  })
  app.get("/quiz", (req, res) => {
    res.render("pages/quiz.ejs")
  })
} 
