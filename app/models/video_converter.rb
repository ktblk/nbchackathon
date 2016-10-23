class VideoConverter

  attr_accessor :save_path

  def initialize(save_path)
      @save_path = save_path
  end

  def convert(video_path, &block)
    @block = block
    array = video_path.split('/')
    file = array[array.length-1].split('.')
    @video = {path: video_path, name: file[0], format: file[1]}
  end
end