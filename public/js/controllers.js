angular.module("todoApp")
    .controller("todoCtrl",["$scope","$log", "todoFactory","$timeout","global",
        function($scope, $log, todoFactory, $timeout, global){

            $scope.global = global;
            
            $scope.title = "Hello App from Ctrl";

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
                $scope.toSave = true;
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
                        $scope.toSave = false;
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

        }])          
        .controller("contactCtrl",["$scope","global",function($scope, global){
            $scope.global = global;
            console.log("in contactCtrl");
        }]);