class CreateEmployees < ActiveRecord::Migration[7.2]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :role
      t.integer :work_style_week

      t.timestamps
    end
  end
end
