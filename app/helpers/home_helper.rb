module HomeHelper
  def is_current(text)
    text == params[:action] ? "current" : ""
  end
end
