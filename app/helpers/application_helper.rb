module ApplicationHelper
  def javascript_exists?(script)
    script = "#{Rails.root}/app/assets/javascripts/#{params[:controller]}.js"
    File.exists?(script) || File.exists?("#{script}.js")
  end

  def stylesheet_exists?(sheet)
    sheet = "#{Rails.root}/app/assets/stylesheets/#{params[:controller]}.css"
    if File.exists?(sheet)
      sheet
    elsif File.exists?("#{sheet}.scss")
      "#{sheet}.scss"
    else
      "#{sheet}.sass"
    end
  end
end
