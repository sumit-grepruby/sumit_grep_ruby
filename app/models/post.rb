class Post < ActiveRecord::Base
	belongs_to :user
  attr_accessible :content, :name, :title
  #validates_presence_of :name
  validates_presence_of :content
  validates_presence_of :title

  #validates :name, :format=>{:with=> /^([a-zA-z]+ ?)*$/, :message =>"only alphabatic characters allowed"}
end
