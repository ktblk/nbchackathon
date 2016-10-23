// $(document).ready(function(){
// 	$('.search-button').click(function(event) {
// 		/* Act on the event */
// 		var $this = $(this),
// 			$parent = $this.closest('form');
//
// 		$parent.find('input').addClass('show-text')
// 	});
//
// })

$(function(){
  videoClip();
  article();
  // mediaGallery();
  ranking();
  // brand();
})

function article() {

  var description = "";
  var photo = "";
  var readmore = "";
  var type = "";

  $.ajax({
    url: 'http://stage-api.nbcuni.com/telemundo/v1/content/article?limit=5',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': document.getElementById('token').value }
  })
  .done(function(data) {
    $.each(data, function(index, value){
      // console.log(value);
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
    url: 'http://stage-api.nbcuni.com/telemundo/v1/content/video_clip?limit=5',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': document.getElementById('token').value }
  })
  .done(function(data) {
    $.each(data, function(index, value){
      // console.log(value);
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
    url: 'http://stage-api.nbcuni.com/telemundo/v1/content/media_gallery?limit=5',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': document.getElementById('token').value }
  })
  .done(function(data) {
    $.each(data, function(index, value){
      $.each(data, function(index, value){
        // console.log(value);
        description = value.title;
          photo = value.cover_image.url;
          readmore = value.url;
          type = value.type;
          console.log(description, photo, readmore, type);
      })
    })
  });

}



function ranking() {

  var description = "";
    var photo = "";
    var readmore = "";
    var personofinterest = "";

  $.ajax({
    url: 'http://stage-api.nbcuni.com/telemundo/v1/ranking/?limit=5&sort=latest',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': document.getElementById('token').value }
  })
  .done(function(data) {
    $.each(data, function(index, value){
      $.each(value, function(index, value){
        // console.log(value);
        description = value.title;
        photo = value.photo.url;
        readmore = value.url;
        personofinterest = value.photo.title;
        console.log(description, photo, readmore, personofinterest);
      })
    })
  });

}

// function brand() {
//
//   var description = "";
//     var photo = "";
//     var readmore = "";
//     var personofinterest = "";
//
//   $.ajax({
//     url: 'http://stage-api.nbcuni.com/telemundo/v1/content/brand',
//     type: 'GET',
//     dataType: 'JSON',
//     headers: {'api_key': document.getElementById('token').value }
//   })
//   .done(function(data) {
//     $.each(data, function(index, value){
//         console.log(value);
//     })
//   });
//
// }
