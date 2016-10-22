$(function(){

  $.ajax({
    url: 'https://stage-api.nbcuni.com:443/news-content/content/videos',
    type: 'GET',
    dataType: 'JSON',
    headers: {"Content-Type": "application/json", api_key: 'cphjtveuye4xp2dwjvwjnhe8' }
  })
  .done(function(data) {
    console.log(data);
  });
})
