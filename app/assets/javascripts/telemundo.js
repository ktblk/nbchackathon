$(function(){

  $.ajax({
    url: 'http://stage-api.nbcuni.com/telemundo/v1/ranking/?limit=10&sort=newest',
    type: 'GET',
    dataType: 'JSON',
    headers: {'api_key': '3skg7sqckwerht69jufrqjus'}
  })
  .done(function(data) {
    $.each(data, function(index, value){
      $.each(value, function(index, value){
      console.log(value.description, value.photo.url);
      })
    })
  });
})
