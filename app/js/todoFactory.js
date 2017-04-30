angular.module("todoApp")
    .factory("todoFactory",["$q","$http",
        function($q,$http){
            function getTodos(){
                var result = $q.defer();

                $http({
                    method: 'GET',
                    url: '/todos'
                    }).then(function (data){
                        return result.resolve(data);
                    },function (error){
                        return result.reject(error);
                    });

                return result.promise;
            };// end getTodos()

            function addTodo(data){
                var result = $q.defer();

                $http({
                    method: 'PUT',
                    url: '/todos',
                    data:{item:data}
                }).then(function (response){
                    return result.resolve(response);
                },function (error){
                    return result.reject(error);
                });

                return result.promise;

            };// end addTodo()

            function removeTodo(id){
                var result = $q.defer();

                $http.delete("/todos/" + id)
                .then(function (response){
                    return result.resolve(response);
                },function (error){
                    return result.reject(error);
                });

                return result.promise;
            };// end removeTodo

            function editTodo(id){
                var result = $q.defer();

                $http.get("/todos/" + id)
                .then(function (response){
                    return result.resolve(response);
                },function (error){
                    return result.reject(error);
                });

                return result.promise;
            };// end editTodo

            function saveTodo(id,data){
                var result = $q.defer();

                $http({
                    method: 'PUT',
                    url: '/todos/' + id,
                    data:{item:data}
                }).then(function (response){
                    return result.resolve(response);
                },function (error){
                    return result.reject(error);
                });// end saveTodo

                return result.promise;
            };


            return {getTodos:getTodos,
                    addTodo:addTodo,
                    removeTodo:removeTodo,
                    editTodo:editTodo,
                    saveTodo:saveTodo };
    }])