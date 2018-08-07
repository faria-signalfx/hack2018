var tabs = new Array();
tabs.push('searchResults-product');
tabs.push('searchResults-video');
tabs.push('searchResults-blog');

//---------------------------------------------//
function show(name)
{
  // var product = $('#searchResults-product').attr('id');
  // var video = $('#searchResults-video').attr('id');
  // var blog = $('#searchResults-blog');
  //
  // if()
  // console.log('product id', product.attr('id'));

  // var icount = tabs.length;
  // for (var i=0;i<icount;i++)
  // {
  //   var tab = $('#'+tabs[i]).attr('id');
  //   // var tabId = tab.attr('id');
  //   // console.log('tab id is '+tabId);
  //   // var tab = $('#searchResults-product').id;
  //   if(tab = name)
  //   {
  //     console.log('tab is ', tab);
  //     $('#'+tabs[i]).show();
  //   }
  // }
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
