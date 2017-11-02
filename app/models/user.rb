# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :session_token, :password_digest, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  # associatations
  has_many :memberships,
    class_name: :Membership,
    foreign_key: :user_id

  has_many :spaces,
    through: :memberships,
    source: :collection,
    source_type: :Space

  has_many :channels,
    through: :memberships,
    source: :collection,
    source_type: :Channel

  has_many :messages,
    class_name: :Message,
    foreign_key: :user_id

  # auth methods
  after_initialize :ensure_session_token

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  # class methods

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  private
  attr_reader :password

end
