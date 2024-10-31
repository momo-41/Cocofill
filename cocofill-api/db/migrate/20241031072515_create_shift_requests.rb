class CreateShiftRequests < ActiveRecord::Migration[7.2]
  def change
    create_table :shift_requests do |t|
      t.integer :user_id
      t.date :date
      t.string :tasks

      t.timestamps
    end
  end
end
