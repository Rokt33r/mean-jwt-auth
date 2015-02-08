angular.module('myapp.home', ['ui.bootstrap', 'myapp.auth', 'ui.router', 'angular-storage'])
    .controller('HomeController', function(Auth, $state, $log, store){
        var home = this;

        home.currentUser;

        Auth.check().success(function(data){
            home.currentUser = data.currentUser;
        }).error(function(data, status){
            $log.error(data, status)
        });

        home.signout = function(){
            store.remove('jwt');
            $state.go('signin');
        }
    });