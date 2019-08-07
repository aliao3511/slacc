class Api::UsersController < ApplicationController

    AVATARS = ['avatar_1.png', 'avatar_2.png']

    def create
        @user = User.new(user_params)
        @user.avatar_url = AVATARS[rand(0..1)]
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def index
        if (params[:channelId]) 
            @users = Channel.find(params[:channelId]).members
        else 
            @users = User.all
        end
        render :index
    end

    def show
        @user = User.where(id: params[:id]).first
        render :show
    end

    def get_users
        @users = params[:userIds].map {|userId| User.find_by_id(userId)}
        render :index 
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :username)
    end

end