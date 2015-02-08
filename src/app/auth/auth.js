angular.module('myapp.auth', [])
    .factory('Auth', function($http){
        return {
            // REST API
            register:function(email, password, name){
                return $http.post('/register', {
                    email:email,
                    password:password,
                    name:name
                });
            },
            check:function(){
                return $http.get('/auth');
            },
            signin:function(email, password){
                return $http.post('/auth', {
                    email:email,
                    password:password
                });
            }
        }
    });
