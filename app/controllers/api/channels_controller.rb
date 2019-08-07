class Api::ChannelsController < ApplicationController

    before_action :ensure_logged_in
    
    def index
        if params[:userId]
            @channels = User.find(params[:userId]).channels.includes(:members).includes(:messages)
        else
            @channels = Channel.all.includes(:members).includes(:messages)
        end
        render :index
    end

    def create
        @channel = Channel.new(channel_params)
        @channel.owner_id = current_user.id
        @channel.member_ids <<= @channel.owner_id
        if @channel.save
            render :show
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def add_channel
        @channel = Channel.find_by(id: params[:channel_id])
        params[:userIds].each do |userId|
            @channel.member_ids <<= userId unless @channel.member_ids.include?(params[:userId])
        end
        render :show
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
        @channel = current_user.owned_channels.find_by(id: params[:id])
        if @channel.update(channel_params)
            render :show
        else
            render json: ["Invalid channel"], status: 422
        end
    end

    def destroy
        channel = current_user.owned_channels.find_by(id: params[:id])
        if channel 
            @channel = channel
            channel.destroy
            render :show
        else
            render json: ["Not authorized to delete channel"], status: 401
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :is_private, :purpose)
    end

end