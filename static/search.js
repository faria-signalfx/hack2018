var tabs = new Array();
tabs.push('searchResults-product');
tabs.push('searchResults-video');
tabs.push('searchResults-blog');

var resultsForAllTab = new Array();
var MAX_RESULTS = 5;

//---------------------------------------------//
//credit: https://www.w3schools.com/howto/howto_js_tabs.asp
function showTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
//---------------------------------------------//
function getResults()
{
  getDocumentationResults();
  getVideoResults();
  getBlogResults();
  $('.tab').show();


}
//---------------------------------------------//
function getDocumentationResults()
{
  $.ajaxSetup({ traditional: "true" }); //required else multi parameters go with [] after parm name
  var term = $('#autocomplete').val();

  var request = $.get('https://api.swiftype.com/api/v1/public/engines/search?engine_key=Uo-nNU7DVc5j98u4RAMf', {
    'q': term
  });
  //----------------------//
  request.fail (function (jqXHR, textStatus , errorThrown){
    console.log('error in getting search results: ', textStatus, errorThrown);
  });
  //----------------------//
  request.done (function(data) {
    console.log('data is ', data);
    displayResultsDocumentation(data);
    displayAllTab();
    $('#searchResultsTab-all').click();
    // $('#searchResultsTab-product').click();//FIXME: adding this line causing JS error
  });
  //----------------------//
  request.always (function() {});
  //----------------------//
}
//---------------------------------------------//
function getVideoResults()
{
  $.ajaxSetup({ traditional: "true" }); //required else multi parameters go with [] after parm name
  var term = $('#autocomplete').val();

  var request = $.get('https://api.swiftype.com/api/v1/public/engines/search?engine_key=Q9h_KJ8_Yoq1exwq71Pz', {
    'q': term
  });
  //----------------------//
  request.fail (function (jqXHR, textStatus , errorThrown){
    console.log('error in getting video search results: ', textStatus, errorThrown);
  });
  //----------------------//
  request.done (function(data) {
    console.log('video data is ', data);
    displayResultsVideo(data);
  });
  //----------------------//
  request.always (function() {});
  //----------------------//
}
//---------------------------------------------//
function getBlogResults()
{
  $.ajaxSetup({ traditional: "true" }); //required else multi parameters go with [] after parm name
  var term = $('#autocomplete').val();

  var request = $.get('https://api.swiftype.com/api/v1/public/engines/search?engine_key=F6z6yA81LmhVykmYGYAa', {
    'q': term
  });
  //----------------------//
  request.fail (function (jqXHR, textStatus , errorThrown){
    console.log('error in getting blog search results: ', textStatus, errorThrown);
  });
  //----------------------//
  request.done (function(data) {
    console.log('video data is ', data);
    displayResultsBlog(data);
  });
  //----------------------//
  request.always (function() {});
  //----------------------//
}

//---------------------------------------------//
function displayResultsDocumentation(data)
{
  var counter = 0;
  var pages = data['records']['page'];
  var countOfPages = Object.keys(pages).length;
  var container = $('#searchResults-product');
  //first clear out the container
  container.empty();
  for (key in pages)
  {
    var page = pages[key];
    var pageUrl = page['url'];
    var pageTitle = page['title'];
    var updatedDate = page['updated_at'];
    var body = page['highlight']['body']; //get only the first 50 words or so
    //replace string
    // body = body.replace(/<em>/g,'ASDF');
    var content = "<a class='resultTitle' href='"+pageUrl+"'>"+pageTitle+"</a>";
    // content += "<br /><p class='resultBody'>"+body.substring(0,200)+"...</p>";
    content += "<br /><p class='resultBody'>"+body+"...</p>";
    $('<p>', {html: content, class: 'resultRow'}).appendTo(container);
    if(counter < MAX_RESULTS)
    {
      page.category = 'searchResults-all-product';
      resultsForAllTab.push(page);
      counter++;
    }
  }
}
//---------------------------------------------//
function displayResultsVideo(data)
{
  var counter = 0;
  var pages = data['records']['page'];
  var countOfPages = Object.keys(pages).length;
  var container = $('#searchResults-video');
  //first clear out the container
  container.empty();
  for (key in pages)
  {
    var page = pages[key];
    var pageUrl = page['url'];
    var pageTitle = page['title'];
    var updatedDate = page['updated_at'];
    var body = page['highlight']['body']; //get only the first 50 words or so
    var content = "<a class='resultTitle' href='"+pageUrl+"'>"+pageTitle+"</a>";
    content += "<br /><p class='resultBody'>"+body+"...</p>";
    $('<p>', {html: content, class: 'resultRow'}).appendTo(container);
    if(counter < MAX_RESULTS)
    {
      page.category = 'searchResults-all-video';
      resultsForAllTab.push(page);
      counter++;
    }
  }
}
//---------------------------------------------//
function displayResultsBlog(data)
{
  var counter = 0;
  var pages = data['records']['page'];
  var countOfPages = Object.keys(pages).length;
  var container = $('#searchResults-blog');
  //first clear out the container
  container.empty();
  for (key in pages)
  {
    var page = pages[key];
    var pageUrl = page['url'];
    var pageTitle = page['title'];
    var updatedDate = page['updated_at'];
    var body = page['highlight']['body']; //get only the first 50 words or so
    var content = "<a class='resultTitle' href='"+pageUrl+"'>"+pageTitle+"</a>";
    content += "<br /><p class='resultBody'>"+body+"...</p>";
    $('<p>', {html: content, class: 'resultRow'}).appendTo(container);
    if(counter < MAX_RESULTS)
    {
      page.category = 'searchResults-all-blog';
      resultsForAllTab.push(page);
      counter++;
    }
  }
}
//---------------------------------------------//
function displayAllTab()
{
  var containerProduct = $('#searchResults-all-product');
  var containerVideo = $('#searchResults-all-video');
  var containerBlog = $('#searchResults-all-blog');

  containerProduct.empty();
  containerVideo.empty();
  containerBlog.empty();

  var icount = resultsForAllTab.length;
  for (var i=0;i<icount;i++)
  {
    // console.log('PAGE now is ', resultsForAllTab[i]);
    var pageTitle = resultsForAllTab[i]['title'];
    var pageUrl = resultsForAllTab[i]['url'];
    var body = resultsForAllTab[i]['highlight']['body'];
    var content = "<a class='resultTitle' href='"+pageUrl+"'>"+pageTitle+"</a>";
    content += "<br /><p class='resultBody'>"+body+"...</p>";
    var contentType = resultsForAllTab[i]['category'].toString();
    // console.log('CONTENT TYPS IS ', contentType);
    if(contentType == 'searchResults-all-product')
    {
      // console.log('MATCHED');
      $('<p>', {html: content, class: 'resultRow'}).appendTo(containerProduct);
    }
    else if (contentType == 'searchResults-all-video')
    {
      $('<p>', {html: content, class: 'resultRow'}).appendTo(containerVideo);
    }
    else if (contentType == 'searchResults-all-blog')
    {
      $('<p>', {html: content, class: 'resultRow'}).appendTo(containerBlog);      
    }

    // console.log(resultsForAllTab[i]);
  }
}
//---------------------------------------------//
function getAutocompleteResults(term)
{
  var formattedData = [];
  var docsData = getAutocompleteResultsFromDocumentation(term);
  var formattedDataDocs = docsData.then(formatAutocompleteResultsDocumentation, promiseErrorHandler);

  var videoData = getAutocompleteResultsFromVideo(term);
  var formattedDataVideo = videoData.then(formatAutocompleteResultsVideo, promiseErrorHandler);

  formattedData.push(formattedDataDocs);
  formattedData.push(formattedDataVideo);
  // console.log('docsdata  is ', docsData);
  // console.log('formattedData is now ', formattedData);
  return formattedData;
}
//---------------------------------------------//
function promiseErrorHandler()
{
  console.log('error from promise: DUH');
}
//---------------------------------------------//
function formatAutocompleteResultsDocumentation(data)
{
  // var formattedList = [];
  // var returnValue = {};


  // var pages = [];
  // pages.push(data['records']['page'][0]);
  // pages.push(data['records']['page'][1]);
  //
  // var icount = pages.length;
  // for (var i=0;i<icount; i++)
  // {
  //   var page = pages[i];
  //   var pageUrl = page['url'];
  //   var pageTitle = page['title'];
  //   var pageValue = pageTitle;
  //   formattedList.push (
  //     {"value": pageValue, "data": {pageUrl, "category": "Product Documents"} }
  //   );
  // }

  var formattedList = [];
  var returnValue = {};
  // console.log('data from promise is ', data);
  var pages = data['records']['page'];
  for (key in pages)
  {
    var page = pages[key];
    var pageUrl = page['url'];
    var pageTitle = page['title'];
    // var pageValue = '<a href="'+pageUrl+'">'+pageTitle+'</a>';
    var pageValue = pageTitle;
    formattedList.push(
      {"value":pageValue, "data": {pageUrl, "category": "Product Documents"} }
    );
    // var body = page['highlight']['body'];
  }
  returnValue.suggestions=formattedList;
  // console.log('formatted value is ', formattedList);
  // console.log('suggestion list is ', returnValue);
  return returnValue;
}
//---------------------------------------------//
function formatAutocompleteResultsVideo(data)
{
  var formattedList = [];
  var returnValue = {};
  // console.log('data from promise is ', data);
  var pages = data['records']['page'];
  for (key in pages)
  {
    var page = pages[key];
    var pageUrl = page['url'];
    var pageTitle = page['title'];
    // var pageValue = '<a href="'+pageUrl+'">'+pageTitle+'</a>';
    var pageValue = pageTitle;
    formattedList.push(
      {"value":pageValue, "data": {pageUrl, "category": "Papers / Webinars / Case Studies"} }
    );
    // var body = page['highlight']['body'];
  }
  returnValue.suggestions=formattedList;
  // console.log('formatted value is ', formattedList);
  // console.log('suggestion list is ', returnValue);
  return returnValue;
  //-------------------------------------------//
  // var formattedList = [];
  // var returnValue = {};
  // var pages = [];
  //
  // pages.push(data['records']['page'][0]);
  // pages.push(data['records']['page'][1]);
  //
  // var icount = pages.length;
  // for (var i=0;i<icount; i++)
  // {
  //   var page = pages[i];
  //   var pageUrl = page['url'];
  //   var pageTitle = page['title'];
  //   var pageValue = pageTitle;
  //   formattedList.push (
  //     {"value": pageValue, "data": {pageUrl, "category": "Papers / Webinars / Case Studies"} }
  //   );
  // }
  // returnValue.suggestions=formattedList;
  //
  // return returnValue;
}

//---------------------------------------------//
function displayAutocompleteResults()
{

  $('#autocomplete').autocomplete({
    lookup: function (query, done) {

      results = getAutocompleteResults(query);
      /*
      for (var i=0;i<results.length;i++)
      {
          results[i].then(function(result) {
            // console.log('after getcompleteresults ', result);
            done(result);

          });
      }
      */
      results[0].then(function(result) { done(result); });
      results[1].then(function(result) { done(result); });
    },
    groupBy: 'category',
    onSelect: function(suggestion) {
      // $('#selected_option').html(suggestion.data);
      console.log('selected data is ', suggestion.data);
      window.location.replace(suggestion.data['pageUrl']);
    }


  });


}
//---------------------------------------------//
//FIXME: did not test failure conditions
function getAutocompleteResultsFromDocumentation(term)
{
  var returnValue = new Promise(function (resolve, reject) {
    $.ajaxSetup({ traditional: "true" }); //required else multi parameters go with [] after parm name

    var request = $.get('https://api.swiftype.com/api/v1/public/engines/suggest?engine_key=Uo-nNU7DVc5j98u4RAMf', {
      'q': term
    });
    //----------------------//
    request.fail (function (jqXHR, textStatus , errorThrown){
      console.log('error in getting autocomplete results: ', textStatus, errorThrown);
      reject(textStatus);
    });
    //----------------------//
    request.done (function(data) {
      console.log('raw data from endpoint is ', data);
      resolve(data);
      // returnValue = data;
    });
    //----------------------//
    request.always (function() {});
    //----------------------//
  });

  // console.log('returnValue is ', returnValue);
  return returnValue;
}
//---------------------------------------------//
//TBD
function getAutocompleteResultsFromVideo(term)
{

  var returnValue = new Promise(function (resolve, reject) {
    $.ajaxSetup({ traditional: "true" }); //required else multi parameters go with [] after parm name

    var request = $.get('https://api.swiftype.com/api/v1/public/engines/suggest?engine_key=Q9h_KJ8_Yoq1exwq71Pz', {
      'q': term
    });
    //----------------------//
    request.fail (function (jqXHR, textStatus , errorThrown){
      console.log('error in getting autocomplete results: ', textStatus, errorThrown);
      reject(textStatus);
    });
    //----------------------//
    request.done (function(data) {
      console.log('raw data from endpoint is ', data);
      resolve(data);
      // returnValue = data;
    });
    //----------------------//
    request.always (function() {});
    //----------------------//
  });

  // console.log('returnValue is ', returnValue);
  return returnValue;

}
//---------------------------------------------//
