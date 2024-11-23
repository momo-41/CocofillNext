class CreateShiftSubmissions < ActiveRecord::Migration[7.2]
  def change
    create_table :shift_submissions do |t|
      t.references :employee, null: false, foreign_key: true
      t.date :date
      t.string :shift

      t.timestamps
    end
  end
end
