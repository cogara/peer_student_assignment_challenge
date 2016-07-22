var router = require('express').Router();

var Assignment = require('../models/assignment.js');

router.get('/', function(request, response) {
  console.log('In Assignment Route');
  response.send('Get out of here!');
})

router.post('/add', function(request, response){
  console.log(request.body);
  var data = request.body;

  var addedAssignment = new Assignment({
    assignmentNumber: data.assignmentNumber,
    studentName: data.studentName,
    score: data.score,
    dateCompleted: new Date()
  })

  addedAssignment.save(function(err) {
    if(err){
      console.log('Save Error (/addAssignment)', err);
      response.sendStatus(500);
    } else {
      console.log('Save Success!');
      response.sendStatus(200);
    }
  });
})

router.get('/get/:id?', function(request, response) {

  var id = request.params.id;
  if(!id) {
    Assignment.find({}, function(err, assignment) {
      if(err){
        console.log('Get Assignment Error', err);
      } else {
        response.send(assignment);
      }
    })
  }
  else {
    console.log('Else request ID:', id);
    Assignment.find({'_id': id}, function(err, assignment) {
      if(err){
        console.log('Get Assignment Error', err);
        response.send(false);
      } else {
        console.log('Get Success!');
        response.send(assignment);
      }

    })
  }
})

router.delete('/remove/:id', function(request, response) {
  console.log(request.params);
  var id = request.params.id;
  Assignment.remove({'_id': id}, function(err) {
    if(err) {
      console.log('Could not delete');
      response.sendStatus(500);
    } else {
      console.log('Remove Success');
      response.sendStatus(200);
    }

  })
});

module.exports = router;
