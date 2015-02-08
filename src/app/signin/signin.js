angular.module('myapp.signin', ['ui.router', 'angular-storage', 'angular-jwt', 'myapp.auth'])
    .controller('SignInController', function($log, Auth, $state, store){
        var signin = this;

        signin.errors = {};

        signin.submit = function(){
            var email = signin.email
                , password = signin.password;
            Auth.signin(email, password)
                .success(function(data){
                    store.set('jwt', data.jwt);
                    $state.go('home');
                }).error(function(data, status){
                    $log.error(data);
                    signin.error = data;
                });
        }

        signin.goRegister = function(){
            $state.go('register');
        }

    });