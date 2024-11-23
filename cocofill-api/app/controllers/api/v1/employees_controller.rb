class Api::V1::EmployeesController < ApplicationController
  # すべての従業員情報を取得する
  def index
    @employees = Employee.all # model名がemployeeのためインスタンス変数もそれに依存
    render json: @employees
  end

  # 特定の従業員情報を取得する
  def show
    @employee = Employee.find(params[:id]) # idで従業員を特定
    render json: @employee
  end

  # 新しい従業員情報を追加する
  def create
    @employee = Employee.new(employee_params) # employee_paramsはストロングパラメータで、下で定義している
    if @employee.save
      render json: @employee, status: :created # 保存が成功したら201(OK)のステータスを返す
    else
      render json: @employee.errors, status: :unprocessable_entity # 成功しなかったら422のステータスを返す
    end
  end

  # 既存の従業員情報を更新する
  def update 
    @employee = Employee.find(params[:id])
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # 特定の従業員情報を削除する
  def destroy 
    @employee = Employee.find(params[:id])
    @employee.destroy
    head :no_content # 204(No Content)を返す
  end

  private # 下記の関数はこのファイルでしか使用できない

  def employee_params
    params.require(:employee).permit(:name, :role, :work_style_week, :weekday_off_requests, :weekend_off_requests)
  end
end
