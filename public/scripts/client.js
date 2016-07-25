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
    vm.inputCheck = inputCheck;


    inputReset();



    function submitAssignment() {
      if (inputCheck()) {
        var sendData = {};
        sendData.assignmentNumber = vm.assignmentNumber;
        sendData.studentName = vm.studentName;
        sendData.score = vm.score;

        //reset input fields
        inputReset();

        $http.post('/assignment/add', sendData).then(addSuccess, httpFailure);
      } else {
        alert('Missing Input Fields');
      }

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
      vm.assignmentList = response.data;
      if(!response.data) {
        console.log('No ID found');
      }
    }


    function removeAssignment(id) {
      $http.delete('/assignment/remove/' + id).then(removeSuccess, httpFailure);
    }

    function addSuccess(response) {
      getAssignmentList();
    }

    function removeSuccess(response) {
      getAssignmentList();
    }

    function httpFailure(response) {
      console.log('HTTP request failed');
    }

    function inputReset() {
      vm.assignmentNumber = '';
      vm.studentName = '';
      vm.score = '';
    }

    function inputCheck() {
      if (vm.assignmentNumber.length > 0 && vm.studentName.length > 0 && vm.score.length > 0) {
        return true;
      }
      else {
        return false;
      }
    }

    getAssignmentList();

  //controller end tag
  };











})();
