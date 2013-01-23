// Mobile App
// Eric Mareth
// Mobile Interfaces and Usability 1301

$('#front').on('pageinit', function(){
	//code needed for home page goes here
});	

var characterBio = function(data){
	console.log(data);
};		

$('#newitem').on('pageinit', function(){

		var basicInfo = $('#basicinfo'),
			errorslink = $('#errorslink')
		;
		basicInfo.validate({
			invalidHandler: function(form, validator) {
				errorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
				};
				$("#charactererrors ul").html(html);
			},
			submitHandler: function() {
				var data = basicInfo.serializeArray();
				characterBio(data); 
			}
		});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};