class Employee < ApplicationRecord
  has_many :shift_submissions, dependent: :destroy # 従業員情報を削除したらシフト情報も削除される(dependent: :destroy)
end
