class SubmissionFilesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  respond_to :html, :xml, :json

  def index
    submission_file = SubmissionFile.find_all_by_submission_id(
      params[:submission_id]
    )
    respond_with(submission_file)
  rescue ActiveRecord::RecordNotFound
    rails 'Submission file not found'
  end

  def show
    submission_file = SubmissionFile.find(params[:id])
    respond_with(submission_file)
  rescue ActiveRecord::RecordNotFound
    raise 'Submission file not found'
  end

  def comments
    comments = FileComment.find_all_by_submission_file_id(
      params[:submission_file_id])
    respond_with(comments)
  rescue ActiveRecord::RecordNotFound
    raise 'Submission file\'s comments not found'
  end
end
