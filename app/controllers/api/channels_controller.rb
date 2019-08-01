class Api::ChannelsController < ApplicationController

    before_action :ensure_logged_in
    
    def index
        @channels = Channel.all.includes(:members).includes(:messages)
        render :index
    end

    def create
        @channel = current_user.channels.new(channel_params)
        if @channel.save
            render :show
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def show
        @channel = Channel.find_by(id: params[:id])
        if @channel
            render :show
        else
            render json: ["Channel not found"], status: 404
        end
    end

    def update
        @channel = Channel.find_by(id: params[:id])
        if @channel.update(channel_params)
            render :show
        else
            render json: ["Invalid channel"], status: 422
        end
    end

    def destroy
        channel = current_user.channels.find_by(id: params[:id])
        if channel 
            channel.destroy!
            render :show
        else
            render json: ["Not authorized to delete channel"], status: 401
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :is_private)
    end

    def filter
        params[:current_user]
    end

end