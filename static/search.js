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
  });
  //----------------------//
  request.always (function() {});
  //----------------------//

}
