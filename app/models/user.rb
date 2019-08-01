# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    validates :username, :email, :password_digest, :session_token, presence: {message: 'must not be blank'} 
    validates :username, :email, uniqueness: {message: 'email already registered'}
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'must be email address' }
    validates :password, length: { minimum: 6, allow_nil: true, message: 'password must be greater than 6 characters' }

    after_initialize :ensure_session_token

    has_many :channels

    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        user
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end
    
end
