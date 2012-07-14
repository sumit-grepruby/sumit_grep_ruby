class WelcomeController < ApplicationController
  def index
  	@posts = Refinery::Blog::Post.all(:limit => 2)
  	#render :layout => false
  end
end
