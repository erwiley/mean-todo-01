angular.module("todoApp",[])
    .controller("todoCtrl",["$scope","$log", "todoFactory","$timeout",
        function($scope, $log, todoFactory, $timeout){
            
            $scope.uiadd = true;
            $scope.uiedit = false;

            var refresh = function(){
                todoFactory.getTodos()
                .then(function(data){
                    $scope.todos = data.data;
                },function(error){
                    $log.error(error);
                });
            };
            refresh();

            $scope.add = function(){
                $scope.uiadd = true;
                $scope.uiedit = false;
                todoFactory.addTodo($scope.todo.item)
                    .then(function(response){
                        $scope.todo = undefined;
                        refresh();
                    },function(error){
                        $log.error(error);
                    });
            };

            $scope.remove = function(id){
                todoFactory.removeTodo(id)
                    .then(function(response){
                        refresh();
                    },function(error){
                        $log.error(error);
                    });  
            };

            $scope.edit = function(id){
                $scope.uiadd = false;
                $scope.uiedit = true;
                todoFactory.editTodo(id)
                    .then(function(response){
                        $scope.todo = response.data;
                    },function(error){
                        $log.error(error);
                    }); 
            };

            $scope.save = function(id){
                todoFactory.saveTodo(id,$scope.todo.item)
                    .then(function(response){
                        $scope.todo = undefined;
                        $scope.uiadd = true;
                        $scope.uiedit = false;
                        refresh();
                    },function(error){
                        $log.error(error);
                    });  
            };

            $scope.clear = function(){
                $scope.todo = undefined;
            };

            $scope.left = function(){
                return ($scope.todo === undefined) ? 100 : (100 - $scope.todo.item.length );
            };

            $timeout(function(){
                $scope.getTotalTodos = function(){
                    return $scope.todos.length;
                };
            }, 100);
        }]);