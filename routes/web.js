const homeController = require('../app/Http/Controllers/homeController')

function initRoutes(app) {
    // --routes---
    app.get('/', homeController().index)
    
}

module.exports = initRoutes