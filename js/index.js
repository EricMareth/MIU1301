// Mobile App
// Eric Mareth
// Mobile Interfaces and Usability 1301

window.addEventListener("DOMContentLoaded", function(){

	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Takes search data and finds it within localStorage.
	function activeSearch(q){
		for(i=0; i < localStorage.length; i++){
			var pull = localStorage.key(i);
			console.log(localStorage.getItem(pull));
		}
	}

	// Validates search field and passes found data to activeSearch().
	function searchValidate(){
		var query = ge('searchField');
		if(query.value === "" ){
			alert("Please let me know what you are looking for.");
		}else if(localStorage.length === 0){
			alert("No characters found yet. Feel free to create one.");
		}else{
			activeSearch(query.value);					// Passes query.value to activeSearch().
		}
	
	}
	
	// Search validation
 	var searchData = ge("searchButton");
	searchButton.addEventListener("click", searchValidate);


});