class WelcomeController < ApplicationController
	before_filter :require_login, :only => :secret
  def index
  	@posts = Refinery::Blog::Post.all(:limit => 2)
  	#render :layout => false
  end


  def google30aecb4f32189612
  	render :layout => false
  end

end
