class Api::ChannelsController < ApplicationController

    before_action :ensure_logged_in

    def destroy
        @channel_member = Channel.find(id: params[:channel_id]).channel_members.where(user_id: current_user.id)
        if @channel_member
            @channel_member.destroy
        else
            
        end
    end

end