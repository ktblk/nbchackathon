$(function(){
  var nbc = new NBC;

  var articleOpts = {
    url: 'https://api.nbcuni.com:443/news-content/content/articles',
    data: {
      filters: 'breakingNews:true',
      size: 5
    }
  };
  nbc.getArticles(articleOpts);
  // -----------------------------------------
  var videos = {
    url: 'https://api.nbcuni.com:443/news-content/content/videos',
    firstLoad: true,
    size: 5
  }
  nbc.getVideos(videos);
  // -----------------------------------------
})

$(document).on('shown.bs.tab', 'a[data-toggle="tab"]' , function (e) {
  var nbc = new NBC;
  var target = $(e.target).attr("href") // activated tab
  if (!target.includes("all")) {
    $(target).find('.card-columns').empty();
  }
  if (target.includes("video")) {
    var url = 'https://api.nbcuni.com:443/news-content/content/videos',
      size = 5,
      value = $(".search-input-text").val();
    var q = "";
    if ($(".search-input-text").val().length > 0) {
      url   = 'https://api.nbcuni.com:443/news-content/content/videos/search',
      size  = 15,
      q     = value;
    }

    var videos = {
      url: url,
      size: size,
      q: q
    }
    nbc.getVideos(videos);
  }
  if (target.includes("article")) {

    var url = 'https://api.nbcuni.com:443/news-content/content/articles',
       size = 30,
      value = $(".search-input-text").val();
    var q = "";
    if (value.length > 0) {
      url = 'https://api.nbcuni.com:443/news-content/content/articles/search',
      size = 15,
      q    = value;
    }

    var articleOpts = {
      url: url,
      fromTab: true,
      data: {
        size: size,
        q: q
      }
    }
    nbc.getArticles(articleOpts);
  }
});

$(document).on("submit", '#form_1', function(e){
  e.preventDefault();
  var value = $(this).find(".search-input-text").val();
  if (value.length === 0) {
    return false;
  }
  var articleOpts = {
    url: 'https://api.nbcuni.com:443/news-content/content/articles/search',
    searching: true,
    data: {
      size: 15,
      q: value
    }
  }
  var nbc = new NBC;
  nbc.getArticles(articleOpts);
  return false;
})


var NBC = function() {
  this.key = $("#token_nbc").val();

  this.getArticles = function(opts) {
    var url = opts.url,
       data = opts.data;

    var size  = data.size ? data.size : '',
      filters = data.filters ? data.filters : '',
            q = data.q ? data.q : '';

    var ajaxOptions = {
      size: size,
      q: q,
    }

    if (filters.length > 0) {
      ajaxOptions.filters = filters;
    }

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      headers: {"Content-Type": "application/json", api_key: this.key },
      data: ajaxOptions
    })
    .done(function(data) {
      var filteredData = data._embedded["nbcng:article"].filter(function(data){
          return data.url != null && data._embedded['nbcng:mainImage'] != null;
      })

      if (opts.searching) {
        $("#all").find('.card-columns').empty();
      }

      $.each(filteredData, function(index, val) {
        // FOR ARTICLE
        var headline    = val.headline,
            description = val.description,
            postType    = "Article",
            readMoreUrl = val.url;
        var articleStore = { headline,description,postType,readMoreUrl };

        // FOR IMAGE
        var  _embedded     = val._embedded['nbcng:mainImage'],
            imageUrl       = _embedded.url,
            imgageHeadline = _embedded.headline,
            imagecaption   = _embedded.caption,
            postType       = "Article";
            readMoreUrl    = val.url;

        var imageStore = { imageUrl, imgageHeadline, imagecaption, postType, readMoreUrl };

        if (opts.fromTab) {
          $("#articles").find('.card-columns').append(NbcHtml.article({articleStore: articleStore, imageStore: imageStore}));
        }else {
          $("#all").find('.card-columns').append(NbcHtml.article({articleStore: articleStore, imageStore: imageStore}));
        }

      });
      $('.truncate_me').truncate({
        lines: 2
      });
      searchingText();
    });
  };

  this.getVideos = function(opts){
    var url = opts.url,
          q = opts.q,
       size = opts.size;

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      headers: {"Content-Type": "application/json", api_key: this.key },
      data: { q: '', assetType: 'OnceURL', size: size , q: q}
    })
    .done(function(data) {
      $.each(data._embedded["nbcng:video"], function(index, val) {
        var urlPicture = val._embedded["nbcng:mainImage"].url,
            headline = val.headline,
            description = val.description,
            postType = "Video",
            readMoreUrl = val.url;
        var urlVideo = val.availableAssets[0].url;
        // debugger;
        if (urlVideo.includes("?mbr=true")) {
          urlVideo = urlVideo.replace("?mbr=true", "")
        }
        urlVideo += '?format=redirect&formats=MPEG4';


        var video = `<video width="320" height="240" controls>
          <source src="${urlVideo}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;

        var store = { urlPicture, headline, description, postType, readMoreUrl, urlVideo, video };

        if (opts.firstLoad) {
          $("#all").find('.card-columns').append(NbcHtml.video({data: store}));
        }else {
          $("#video").find('.card-columns').append(NbcHtml.video({data: store}));
        }
        
        $('.truncate_me').truncate({
          lines: 2
        });
        searchingText();

      });
    });
  }
}


var NbcHtml = {
  article: function(opts){
    // var imageStore = { imageUrl, imgageHeadline, imagecaption };
    // var articleStore = { headline, description, postType, readMoreUrl };
    var store = opts.imageStore;
    var articleStore = opts.articleStore;
    return `<div class="card custom-card">
          <img class="card-img-top img-fluid" src="${store.imageUrl}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title font-18 dark-blue-color text-uppercase">${articleStore.postType}</h4>
            <p class="card-text red-color font-22 truncate_me">${articleStore.headline}</p>
          </div>

        <div class="list-group text-center text-uppercase options-block">
          <a href="#" class="list-group-item blue-color option-btn font-18 ">Options</a>
          <a href="#" class="list-group-item blue-color font-18 read-btn" data-url="${store.imageUrl}" data-type="${articleStore.postType}" data-title="${articleStore.headline}">Add to video</a>
          <a href="${articleStore.readMoreUrl}" target="_blank" class="list-group-item blue-color font-18">Read More</a>
          <a href="#" class="list-group-item blue-color font-18">Find more like this</a>
        </div>
      </div>
    `
  },
  video: function (opts){
    // var store = { urlPicture,headline,description,postType,readMoreUrl, urlVideo, video };
    var data = opts.data;
    // ${data.video}
    return `<div class="card custom-card">
          <img class="card-img-top img-fluid" src="${data.urlPicture}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title font-18 dark-blue-color text-uppercase">${data.postType}</h4>
            <p class="card-text red-color font-22 truncate_me">${data.headline}</p>
          </div>

        <div class="list-group text-center text-uppercase options-block">
          <a href="#" class="list-group-item blue-color option-btn font-18 ">Options</a>
          <a href="#" class="list-group-item blue-color font-18 read-btn" data-url="${data.urlPicture}" data-type="${data.postType}" data-video-url="${data.urlVideo}" data-title="${data.headline}">Add to video</a>
          <a href="${data.readMoreUrl}" target="_blank" class="list-group-item blue-color font-18">Read More</a>
          <a href="#" class="list-group-item blue-color font-18">Find more like this</a>
        </div>
      </div>
    `
  }
}

function isBreakingNews(value) {
  console.log(value);
}


function truncateString(title, length){
  return jQuery.trim(title).substring(0, length) .trim(this) + "...";jQuery.trim(title).substring(0, length).trim(this) + "...";
}

function searchingText() {
  if( $('.search-input-text').val() == "" ) {
    var text = "The Lastest Content"
  } else {
    var text = "Showing Results for " + $('.search-input-text').val();
  }
  $('.searching-text').text( text )
}
