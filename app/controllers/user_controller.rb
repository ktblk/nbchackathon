class UserController < ApplicationController
  require 'streamio-ffmpeg'
  require "base64"

  def new
  end

  def index
  end

  def generate_video
    urls = params[:urls]
    slideshow_transcoder = ""
    # i = 0
    # while i < urls.length
    #   slideshow_transcoder = FFMPEG::Transcoder.new(
    #     '',
    #     'text.mp4',
    #     { resolution: "1920x1080" },
    #     input: urls[i],
    #     input_options: { framerate: '1/5' }
    #   )
    #   i += 1
    # end

    slideshow_transcoder = FFMPEG::Transcoder.new(
      '',
      'slideshow.mp4',
      { resolution: "320x240" },
      input: "img-%d.jpg",
      input_options: { framerate: '1/5' }
    )
    slideshow = slideshow_transcoder.run
    # logger.debug(Cloudinary::Uploader.upload('slideshow.mp4', :resource_type => :video))
    respond_to do |format|
      format.json slideshow
    end

  end
end
