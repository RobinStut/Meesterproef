module.exports = app => {
  app.get("/", (req, res) => {
    res.render("pages/index.ejs")
  })
}
