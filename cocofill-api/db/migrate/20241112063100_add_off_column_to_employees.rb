class AddOffColumnToEmployees < ActiveRecord::Migration[7.2]
  def change
    add_column :employees, :weekday_off_requests, :integer, default: 0, null: false
    add_column :employees, :weekend_off_requests, :integer, default: 0, null: false
  end
end
