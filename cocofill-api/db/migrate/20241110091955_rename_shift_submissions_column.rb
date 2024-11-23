class RenameShiftSubmissionsColumn < ActiveRecord::Migration[7.2]
  def change
    rename_column :shift_submissions, :shift, :shift_request
  end # rename_columnはカラム名を変更するためのメソッド
end
