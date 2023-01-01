

const configRoutes = (app) => {
    require('../routes/index') (app)
    require('../routes/company') (app)
    require('../routes/applicant') (app)
    require('../routes/auth') (app)
    require('../routes/recruiter') (app)
    require('../routes/user') (app)
    require('../routes/advertisement') (app)
}

module.exports = configRoutes;