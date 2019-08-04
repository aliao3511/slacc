class Api::UsersController < ApplicationController

    AVATARS = []

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def index
        @users = Channel.find(params[:channel_id]).members
        render :index
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :username)
    end

end