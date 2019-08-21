class Api::DmsController < ApplicationController

    # before_action :ensure_current_user

    def index
        if (params[:user_id].to_i != current_user.id)
            render json: ["Unauthorized user"], status: 401
        else
            @dms = current_user.dms.includes(:members, :messages)
            render :index
        end
    end

    # def get_dm
    #     # @recipient = User.find(params[:recipient])
    #     # @dm = current_user.dms.where(id: params[:id])
    #     @dm = find_dm(params[:recipientId])
    #     if @dm

    #         @dm = Dm.new()
    #     end
    #     render :show
    # end

    def create
        @dm = find_dm(params[:recipientIds]) || Dm.new()
        if (!@dm.persisted?)
            @dm.save
            @dm.dm_members.create({ user_id: current_user.id })
            params[:recipientIds].each {|id| @dm.dm_members.create({ user_id: id.to_i })}
        end
        render :show
    end

    private

    def find_dm(recipient_ids) 
        dms = current_user.dms;
        dms.each do |dm|
            if recipient_ids.all? {|id| dm.member_ids.include?(id.to_i)}
                return dm.includes(:members, :messages)
            end
        end
        nil
    end

end