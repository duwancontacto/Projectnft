const authRoutes = require("./authRoutes")

const routes = (app) => {
    app.use("/api/auth", authRoutes)
}

module.exports = routes