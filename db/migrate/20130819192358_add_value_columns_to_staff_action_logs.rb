class AddValueColumnsToStaffActionLogs < ActiveRecord::Migration[4.2]
  def change
    add_column :staff_action_logs, :subject, :text
    add_column :staff_action_logs, :previous_value, :text
    add_column :staff_action_logs, :new_value, :text
  end
end
