class User < ApplicationRecord
  validates :session_token, :password_digest, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  # associatations
  has_many :space_memberships,
    class_name: :SpaceMembership,
    foreign_key: :user_id

  has_many :spaces,
    through: :space_memberships,
    source: :space

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
