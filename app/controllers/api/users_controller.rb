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
            @users = Channel.find(params[:channelId]).members.includes(:channels, :dms)
        else 
            @users = User.all.includes(:channels, :dms)
        end
        render :index
    end

    def show
        @user = User.includes(:channels, :dms).where(id: params[:id]).first
        render :show
    end

    def get_users
        if (params[:userIds]) 
            @users = params[:userIds].map {|userId| User.includes(:channels, :dms).find(userId)}
            render :index 
        else
            render json: {}
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :username)
    end

end