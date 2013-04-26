require "sinatra"

get "*" do
  path = request.fullpath.gsub('/','')

  if File.exists?("public/views/calculators/#{path}.ejs") && File.exists?("public/js/calculators/#{path}.js")
    erb :index, :locals => {
      :calc => "/js/calculators/#{path}.js",
      :name => path
    }
  end
end
