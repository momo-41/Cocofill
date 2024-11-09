class Employee < ApplicationRecord
  has_many :shift_submissions, dependent: :destroy
end
