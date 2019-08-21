class Api::ChannelsController < ApplicationController

    before_action :ensure_logged_in
    
    def index
        if params[:userId]
            @channels = User.find(params[:userId]).channels.includes(:members, :messages)
        else
            @channels = Channel.all.includes(:members, :messages)
        end
        render :index
    end

    def create
        filtered_channel_params = {
            name: channel_params[:name], 
            purpose: channel_params[:purpose], 
            is_private: channel_params[:is_private]
        }
        @channel = Channel.new(filtered_channel_params)
        @channel.owner_id = current_user.id
        @channel.member_ids <<= @channel.owner_id
        channel_params[:memberIds].each do |id|
            @channel.member_ids <<= id
        end
        if @channel.save
            render :show
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def add_channel
        @channel = Channel.includes(:members, :messages).find(params[:channel_id])
        params[:userIds].each do |userId|
            @channel.member_ids <<= userId unless @channel.member_ids.include?(params[:userId])
        end
        render :show
    end

    def show
        @channel = Channel.includes(:members, :messages).find(params[:id])
        if @channel
            render :show
        else
            render json: ["Channel not found"], status: 404
        end
    end

    def update
        @channel = current_user.owned_channels.includes(:members, :messages).find(params[:id])
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
        params.require(:channel).permit(:name, :is_private, :purpose, :memberIds => [])
    end

end