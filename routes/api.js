const userController = require('../app/Http/Controllers/Api/userController')
const Auth = require('../app/Http/Middleware/authenticateToken')

function apiRoutes(app) {
    // --routes---
    app.get('/api/users', Auth, userController().index);
    app.post('/api/users/signup', userController().signup);
    app.post('/api/users/login', userController().login);
    app.get('/api/users/profile', Auth, userController().profile);
    app.put('/api/users/add-address', Auth, userController().addAddress);
}

module.exports = apiRoutes