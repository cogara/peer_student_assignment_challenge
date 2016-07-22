(function() {

  angular
    .module('assignmentApp',[])
    .controller('AssignmentController', AssignmentController);


  function AssignmentController($http) {
    let vm = this;
    vm.submitAssignment = submitAssignment;
    vm.getAssignmentList = getAssignmentList;
    vm.removeAssignment = removeAssignment;
    vm.tempAssignment = '';

    function submitAssignment() {
      var sendData = {};

      sendData.assignmentNumber = vm.assignmentNumber;
      sendData.studentName = vm.studentName;
      sendData.score = vm.score;

      vm.assignmentNumber = '';
      vm.studentName = '';
      vm.score = '';

      $http.post('/assignment/add', sendData).then(addSuccess, httpFailure);
    }

    function getAssignmentList() {
      if(vm.tempAssignment.length > 0){
        $http.get('/assignment/get/' + vm.tempAssignment).then(getAssignmentSuccess, httpFailure)
      } else {
        $http.get('/assignment/get').then(getAssignmentSuccess, httpFailure);
      }
      vm.tempAssignment = '';
    }

    function getAssignmentSuccess(response) {
      console.log(response);
      vm.assignmentList = response.data;
      console.log('What is not found?', vm.assignmentList);
      if(!response.data) {
        console.log('No ID found');
      }
    }


    function removeAssignment(id) {
      $http.delete('/assignment/remove/' + id).then(removeSuccess, httpFailure);
    }

    function addSuccess(response) {
      console.log(response);
      getAssignmentList();
    }

    function removeSuccess(response) {
      console.log('Assignment removed');
      getAssignmentList();
    }

    function httpFailure(response) {
      console.log('HTTP request failed');
    }

  getAssignmentList();

  //controller end tag
  };











})();