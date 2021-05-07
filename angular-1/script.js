// eslint-disable-next-line no-unused-vars
function TodoCtrl($scope) {

  $scope.todos = [
    {
      text: 'learn angular',
      done: true
    },
    {
      text: 'build an angular app',
      done: true
    },
    {
      text: 'llamar a mama',
      done: true
    }
  ];

  $scope.addTodo = function() {
    $scope.todos.push({
      text: $scope.todoText,
      done: false
    });
    $scope.todoText = '';
  };

  $scope.remaining = function() {
    let count = 0;
    $scope.todos.forEach(function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    const oldTodos = $scope.todos;
    $scope.todos = [];
    oldTodos.forEach(function(todo) {
      if (!todo.done){
        $scope.todos.push(todo);
      }
    });
  };
}
