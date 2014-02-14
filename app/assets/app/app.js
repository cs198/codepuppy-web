//= require_self
//= require_tree .

codepuppy = angular.module('codepuppy', ['ngRoute']);

codepuppy.config(function($routeProvider) {
  if (true) {
    $routeProvider
    .when('/', {
      templateUrl : '/assets/pages/home/home.html',
      controller  : 'HomeCtrl'
    })
    .when('/:courseID', {
      templateUrl : '/assets/pages/course/course.html',
      controller  : 'CourseCtrl'
    })
    .when('/:courseID/:assignmentID', {
      templateUrl : '/assets/pages/assignment/assignment.html',
      controller  : 'AssignmentCtrl'
    })
    .when('/:courseID/:assignmentID/:submissionID', {
      templateUrl : '/assets/pages/submission/submission.html',
      controller  : 'SubmissionCtrl'
    })
  }
});