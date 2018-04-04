const {
    create,
} = require('../Controllers/PartnerController')

module.exports = (app) => {
    app.post('/partners', create)
}