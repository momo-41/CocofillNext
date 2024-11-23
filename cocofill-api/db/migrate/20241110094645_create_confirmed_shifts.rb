class CreateConfirmedShifts < ActiveRecord::Migration[7.2]
  def change
    create_table :confirmed_shifts do |t|
      t.references :employee, null: false, foreign_key: true
      t.date :date
      t.string :shift_time

      t.timestamps
    end
  end
end
