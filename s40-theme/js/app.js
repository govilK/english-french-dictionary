window.onload = function(){
	init();
};

function refreshPageContent() {
	init();
}

function init() {
	jQuery('#word-input').val('');
	$("#word-meaning-wrapper").hide();
	$("#language-from").html(language_from);
	$("#language-to").html(language_to);
	$("#loading").hide();	
	$("#no-result").hide();
}

function getMeaning(){
	
	$("#no-result").hide();
	$("#word-meaning-wrapper").hide();	

	var word = $("#word-input").val();

	if(word == ""){
 		$("#no-result").show();
 		return;
	}
	
	// remove spaces
	word = word.replace(/\s+/g, '');

	$("#loading").show();

	getMeaningAsync(word, function(response){		
		if (response.status == 0) {
	 		init();
			$("#no-result").show();
		} else {
			$("#word").html(word);
			$("#word-meaning").html(response.meaning);
			
			// render
			$("#loading").hide();
			$("#word-meaning-wrapper").show();
		}
	});
}

function getMeaningAsync(word, callbackFunction) {

	$.ajax({
		type: 'GET',
	 	url: ajax_url + "?word=" + word,
	    contentType: "application/json",
	    dataType: 'jsonp',
	 	success:function(result){
	 		callbackFunction(result);
  		},
	 	error:function(e){
	 		init();
	 		$("#no-result").show();
	 	}
  	});
}
