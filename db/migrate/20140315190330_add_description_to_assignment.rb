class AddDescriptionToAssignment < ActiveRecord::Migration
  def change
    add_column :assignments, :description, :text
  end
end
