class Api::ChannelMembersController < ApplicationController

    before_action :ensure_logged_in

    def destroy
        channel_member = Channel.where(id: params[:channel_id])[0].channel_members.where(user_id: current_user.id)[0]
        if channel_member
            @channel_member = channel_member
            channel_member.destroy
            render :show
        else
            render json: ["Channel membership not found"], status: 404 
        end
    end

end