angular.module('myapp.register', ['ui.router', 'angular-storage', 'angular-jwt', 'myapp.auth'])
    .controller('RegisterController', function($log, Auth, $state, store){
        var register = this;

        register.errors = {};

        register.submit = function(){
            var email = register.email
                , password = register.password
                , name = register.name;

            Auth.register(email, password, name)
                .success(function(data){
                    store.set('jwt', data.jwt);
                    $state.go('home');
                }).error(function(data, status){
                    $log.error(data, status);
                    register.error = data;
                });
        };

        register.goSignIn = function(){
            $state.go('signin');
        }
    });