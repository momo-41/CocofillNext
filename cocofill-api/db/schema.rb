# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_11_12_063100) do
  create_table "confirmed_shifts", force: :cascade do |t|
    t.integer "employee_id", null: false
    t.date "date"
    t.string "shift_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_confirmed_shifts_on_employee_id"
  end

  create_table "employees", force: :cascade do |t|
    t.string "name"
    t.string "role"
    t.integer "work_style_week"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "weekday_off_requests", default: 0, null: false
    t.integer "weekend_off_requests", default: 0, null: false
  end

  create_table "shift_submissions", force: :cascade do |t|
    t.integer "employee_id", null: false
    t.date "date"
    t.string "shift_request"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_shift_submissions_on_employee_id"
  end

  add_foreign_key "confirmed_shifts", "employees"
  add_foreign_key "shift_submissions", "employees"
end
