# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171101132645) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string "title", null: false
    t.string "topic"
    t.string "purpose"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "space_id", null: false
    t.boolean "is_direct", default: false
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "collection_id", null: false
    t.boolean "is_admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_pending", default: true
    t.string "collection_type", null: false
    t.index ["user_id", "collection_id"], name: "index_memberships_on_user_id_and_collection_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "content", null: false
    t.string "context_type", null: false
    t.boolean "read", default: false
    t.integer "user_id", null: false
    t.integer "context_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spaces", force: :cascade do |t|
    t.string "title", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
