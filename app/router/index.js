module.exports = function (app) {
    app.use('/',         require('./routes/index/index.js'));
    app.use('/wallie2', require('./routes/wall2/index.js'));
    app.use('/wallie3', require('./routes/wall3/index.js'));
    app.use('/logo', require('./routes/logo/index.js'));
    app.use('/intro', require('./routes/intro/index.js'));
    app.use('/about-us', require('./routes/aboutUs/index.js'));
    app.use('/why', require('./routes/why/index.js'));
    app.use('/idea', require('./routes/idea/index.js'));
    app.use('/problems', require('./routes/problems/index.js'));
    app.use('/you', require('./routes/you/index.js'));
    app.use('/form', require('./routes/form/index.js'));
    app.use('/api',      require('./routes/api/api.js'));
    app.use('/api/user', require('./routes/api/api-user.js'));
};
