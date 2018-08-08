var tabs = new Array();
tabs.push('searchResults-product');
tabs.push('searchResults-video');
tabs.push('searchResults-blog');

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
  $.ajaxSetup({ traditional: "true" }); //required else multi parameters go with [] after parm name
  var term = $('#searchBox').val();

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
  });
  //----------------------//
  request.always (function() {});
  //----------------------//

}
//---------------------------------------------//
function displayResultsDocumentation(data)
{
  var pages = data['records']['page'];
  var countOfPages = Object.keys(pages).length;
  var container = $('#searchResults-product');
  for (key in pages)
  {
    var page = pages[key];
    var pageUrl = page['url'];
    var pageTitle = page['title'];
    var updatedDate = page['updated_at'];
    var body = page['body']; //get only the first 50 words or so
    var content = "<a class='resultTitle' href='"+pageUrl+"'>"+pageTitle+"</a>";
    content += "<br /><p class='resultBody'>"+body.substring(1,200)+"...</p>";
    $('<p>', {html: content, class: 'resultRow'}).appendTo(container);

    // console.log ('page is ', page);
  }
  // console.log ('pages is ', countOfPages);
}
//---------------------------------------------//
//---------------------------------------------//
//---------------------------------------------//
