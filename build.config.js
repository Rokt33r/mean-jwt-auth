module.exports = {
    src:{
        js:['src/app/**/*.js'],
        tpl:['src/app/**/*.tpl.html'],
        sass:['src/sass/**/*.scss'],
        index:'src/index.html'
    },
    build_dir:'public',
    vendor:{
        angular:['bower_components/angular/angular.js'],
        'ui-bootstrap':['bower_components/angular-bootstrap/ui-bootstrap-tpls.js'],
        'ui-router':['bower_components/angular-ui-router/release/angular-ui-router.js'],
        'angular-jwt':['bower_components/angular-jwt/dist/angular-jwt.js'],
        'a0-angular-storage':['bower_components/a0-angular-storage/dist/angular-storage.js']
    }
}