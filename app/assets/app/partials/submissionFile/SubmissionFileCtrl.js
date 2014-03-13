angular.module('codepuppy').controller('SubmissionFileCtrl',
['$scope', '$routeParams', '$fileUploader', '$http', '$modal', function($scope, $routeParams, $fileUploader, $http, $modal) {
  $scope.comments = {};

  $scope.submissionClicked = function(index) {
    if($scope.commentPermissions) {
      $scope.commentBody = {};
      if($scope.comments[index] !== undefined) {
        return;
      } else {
        $scope.commentBody.line_number = index;
        $scope.commentBody.comment = "Hello!";
      }

      var commentModal = $modal.open({
      templateUrl: '/assets/partials/commentModal/commentModal.html',
      controller: CommentModalCtrl,
      resolve: {
        commentBody: function()  {
          return $scope.commentBody;
        }
      }
      });

      commentModal.result.then(function(comment) {
        // Make a POST for a new comment.
        // On succcess: perform these things -- add to comments.
        var createComment = function() {
          console.log($scope.file);

          var urlParams = {
            submission_file_id: $scope.file.id,
            line_number: $scope.commentBody.line_number,
            num_lines: 1,
            comment: $scope.commentBody.comment,
          };


          // 4 URL params: assignment_id, student_id, date_submited, feedback_released
          $http({method: 'POST', url: '/submission_files/' + $scope.file.id + '/file_comments.json', data: urlParams}).success(function(data, status, headers, config) {
            console.log(data);
          });  
        };

        createComment();

        $scope.commentBody.comment = comment;
        $scope.comments[$scope.commentBody.line_number] = $scope.commentBody;
      });
    }
  };
}]);
