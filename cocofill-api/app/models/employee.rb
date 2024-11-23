class Employee < ApplicationRecord
  has_many :shift_submissions, dependent: :destroy # 従業員情報を削除したらその従業員のシフト情報も削除される(dependent: :destroy)
  has_many :confirmed_shifts, dependent: :destroy # 従業員情報を削除したらその従業員の確定シフト情報も削除される(dependent: :destroy)
end
