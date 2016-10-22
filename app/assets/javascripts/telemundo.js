$(function(){
  videoClip();
  article();
  mediaGallery();
})

function article() {

  var description = "";
  var photo = "";
  var readmore = "";
  var type = "";

  $.ajax({
    url: 'http://stage-api.nbcuni.com/telemundo/v1/content/article?limit=15',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': '3skg7sqckwerht69jufrqjus'}
  })
  .done(function(data) {
    $.each(data, function(index, value){
      // console.log(value.title, value.type, value.url, value.cover_image.url);
        description = value.title;
        photo = value.cover_image.url;
        readmore = value.url;
        type = value.type;
        console.log(description, photo, readmore, type);
    })
  });

}

function videoClip() {

  var description = "";
  var video = "";
  var viewmore = "";
  var type = "";

  $.ajax({
    url: 'http://stage-api.nbcuni.com/telemundo/v1/content/video_clip?limit=15',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': '3skg7sqckwerht69jufrqjus'}
  })
  .done(function(data) {
    $.each(data, function(index, value){
      description = value.title;
      video = value.url;
      type = value.type;

      console.log(description, video, type);
    })
  });

}


function mediaGallery() {

  var description = "";
    var photo = "";
    var readmore = "";
    var type = "";

  $.ajax({
    url: 'http://stage-api.nbcuni.com/telemundo/v1/content/media_gallery?limit=10',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': '3skg7sqckwerht69jufrqjus'}
  })
  .done(function(data) {
    $.each(data, function(index, value){
      $.each(data, function(index, value){
        description = value.title;
          photo = value.cover_image.url;
          readmore = value.url;
          type = value.type;
          console.log(description, photo, readmore, type);
      })
    })
  });

}
