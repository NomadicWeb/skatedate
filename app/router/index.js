module.exports = function (app) {
    app.use('/',                require('./routes/gif-part-one/index.js'));
    app.use('/gif-part-two',    require('./routes/gif-part-two/index.js'));
    app.use('/gif-part-three',  require('./routes/gif-part-three/index.js'));
    app.use('/logo',            require('./routes/logo/index.js'));
    app.use('/intro',           require('./routes/intro/index.js'));
    app.use('/about-us',        require('./routes/about-us/index.js'));
    app.use('/why',             require('./routes/why/index.js'));
    app.use('/idea',            require('./routes/idea/index.js'));
    app.use('/problems',        require('./routes/problems/index.js'));
    app.use('/we-need-you',     require('./routes/we-need-you/index.js'));
    app.use('/form',            require('./routes/form/index.js'));
    app.use('/api',             require('./routes/api/api.js'));
    app.use('/api/user',        require('./routes/api/api-user.js'));
};
