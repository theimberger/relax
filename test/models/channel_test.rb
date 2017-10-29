# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  topic      :string
#  purpose    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  space_id   :integer          not null
#  is_direct  :boolean          default(FALSE)
#

require 'test_helper'

class ChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
