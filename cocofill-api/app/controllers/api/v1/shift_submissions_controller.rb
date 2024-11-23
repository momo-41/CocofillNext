class Api::V1::ShiftSubmissionsController < ApplicationController
  def index
    @shift_submissions = ShiftSubmission.all
    render json: @shift_submissions
  end

  def show
    @shift_submission = ShiftSubmission.find(params[:id])
    render json: @shift_submission
  end

  def create
    @shift_submission = ShiftSubmission.new(shift_submission_params)
    if @shift_submission.save
      render json: @shift_submission, status: :created
    else
      render json: @shift_submission.errors, status: :unprocessable_entity
    end
  end

  def update
    @shift_submission = ShiftSubmission.find(params[:id])
    if @shift_submission.update(shift_submission_params)
      render json: @shift_submission
    else
      render json: @shift_submission.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @shift_submission = ShiftSubmission.find(params[:id])
    @shift_submission.destroy
    head :no_content
  end

  private

  def shift_submission_params
    params.require(:shift_submission).permit(:date, :shift_request, :employee_id) # dateの型は"YYYY-MM-DD"形式
  end
end
