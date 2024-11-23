class Api::V1::ConfirmedShiftsController < ApplicationController
  def index
    @confirmed_shifts = ConfirmedShift.all # ConfirmedShiftモデルを使って、データベースのconfirmed_shiftsテーブルからすべてのレコードを取得
    render json: @confirmed_shifts
  end

  def show
    @confirmed_shift = ConfirmedShift.find(params[:id])
    render json: @confirmed_shift
  end

  def create
    @confirmed_shift = ConfirmedShift.new(confirmed_shift_params)
    if @confirmed_shift.save
      render json: @confirmed_shift, status: :created
    else
      render json: @confirmed_shift.error, status: :unprocessable_entity
    end
  end

  def update
    @confirmed_shift = ConfirmedShift.find(params[:id])
    if @confirmed_shift.update(confirmed_shift_params)
      render json: @confirmed_shift
    else
      render json: @confirmed_shift.error, status: :unprocessable_entity
    end
  end

  def destroy
    @confirmed_shift = ConfirmedShift.find(params[:id])
    @confirmed_shift.destroy
    head :no_content
  end

  private

  def confirmed_shift_params
    params.require(:confirmed_shift).permit(:date, :shift_time, :employee_id) # dateの型は"YYYY-MM-DD"形式
  end
end
