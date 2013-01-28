// Mobile App
// Eric Mareth
// Mobile Interfaces and Usability 1301

$('#front').on('pageinit', function(){
	//code needed for home page goes here
});	

var characterBio = function(data){
	console.log(data);
	alert("Your character has come to life!");
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
				storeData(data); 
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
	//if(!key){
		var id			= Math.floor(Math.random()*10000001);
	//}else{
	//	id = key;
	//};
	var item		={};
		item.name		=["Name:", $('#charname').val()];
		item.story		=["Story:", $('#charstory').val()];
		item.land		=["Land:", $('#charland').val()];
		item.town		=["Town:", $('#chartown').val()];
		item.gender		=["Sex:", $('input:radio[name=genderpick]:checked').val()];
		item.age		=["Age:", $('#agerange').val()];
		item.type		=["Character Type:", $('#chartype').val()];
		item.details	=["Details:", $('#otherinfo').val()];
	
	localStorage.setItem(id, JSON.stringify(item));
	console.log(localStorage);
	alert("It's ALIVE!!!!!!!! ALIIIIVE!!!!!");
}; 

var	deleteItem = function (){

};
					
var clearLocal = function(){

};