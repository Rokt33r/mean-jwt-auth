angular.module('myapp', ['ui.router', 'angular-jwt', 'templates', 'myapp.auth', 'myapp.home'])
    .config(function($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider){

        // home route
        $stateProvider.state('home', {
            templateUrl:'home/home.tpl.html',
            url:'',
            controller:'HomeController',
            controllerAs:'home'
        });

        $stateProvider.state('signin', {
            templateUrl:'signin/signin.tpl.html',
            url:'signin',
            controller:'SignInController',
            controllerAs:'signin'
        });

        $stateProvider.state('register', {
            templateUrl:'register/register.tpl.html',
            url:'register',
            controller:'RegisterController',
            controllerAs:'register'
        });

        $urlRouterProvider.otherwise('/');

        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('jwt');
        };

        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(function($state, Auth, $log, store){
        if(store.get('jwt') === null){
            $state.go('signin');
            return
        }
        Auth.check().success(function(){
            $state.go('home');
        }).error(function(data){
            $log.error(data);
            $state.go('signin');
            store.remove('jwt');
        });
    });
angular.module('templates', []);