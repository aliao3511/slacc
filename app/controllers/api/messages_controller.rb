class Api::MessagesController < ApplicationController

    before_action :ensure_logged_in

    def create
        @message = Message.new(message_params)
        if @message.save
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        message = current_user.messages.find_by(id: params[:id])
        if message
            @message = message
            message.destroy
            render :show
        else
            render json: ['Not authorized to delete message'], status: 401
        end
    end

    def update
        @message = current_user.messages.find_by(id: params[:id])
        if @message.update(message_params)
            render :show
        else
            render json: ['Not authorized to edit message'], status: 422
        end
    end

    private
    def message_params
        params.require(:message).permit(:body)
    end
end