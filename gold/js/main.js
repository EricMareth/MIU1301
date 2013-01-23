// Mobile App
// Eric Mareth
// Mobile Interfaces and Usability 1301

$('#front').on('pageinit', function(){
	//code needed for home page goes here
});	

<<<<<<< HEAD
				
				// Added to remove "Edit to Display" display echo.
				var body = ge('body');
				body.removeChild(ge('items'));
				break;
			default:
				return false;
		}
	}
	
	// Creates and populates the Data page.
	function getData(){
		// turns on Diplay Data page.
		toggleControls("on");
		
		// Added to refresh the checked status due to "Edit to Display" mis-population.
		var radios = document.forms[0].gender;
		radios[1].removeAttribute("checked","checked");
		radios[2].removeAttribute("checked","checked");
		
		// If there is nothing in local storage, this generates characters for you.
		if (localStorage.length === 0){
			alert("There are no characters lurking in the shadows! So some have been conjured for you...");
			autoFillData();
		}
		// Creates 'div' tag, populates it with 'ul' containing data blocks.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement('ol');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "display";
		for( i=0, length=localStorage.length; i<length; i++){
			var makeLi = document.createElement('li');
			makeLi.setAttribute("id","entry");
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);						
			var makeSubList = document.createElement('ol');
			makeLi.appendChild(makeSubList);
			getImage(obj.type[1], makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
				
				// Added to give value to the hidden input attribute.
				ge('charKey').value = key;
			}
			makeItemLinks(localStorage.key(i), linksLi);		// passing key to makeItemLinks function.
		}
	}
	
	// Adds image to display categories.  
	//NOTE: There are only three icons - good, bad, and neutral - but they apply to the sub-categories (i.e. Villain, Sub-Villain, Henchman are all bad.)
	function getImage(typeIcon, makeSubList){					
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/" + typeIcon + ".png");
		imageLi.appendChild(newImg);
	} 
	
	function autoFillData(){									// Auto populates a default character.
		for(var n in json){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}	
	
	// Creates edit and delete links
	function makeItemLinks(key, linksLi){						// KEY is passed from getData function.
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var	editText = "Edit Character";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//var breakTag = document.createElement('br');			// Fashioned my tags with CSS.
		//linksLi.appendChild(breakTag);
		linksLi.setAttribute("id", "charAdjust");
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText ="Delete Character";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grabs data from item in local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Shows the form.
		toggleControls("off");
		
		//populates the form fields with current localStorage values.
		ge('charName').value  = item.name[1];
		ge('taleName').value  = item.story[1];
		ge('land').value  = item.land[1];
		// Checks the field state of 'land' so it knows to populate 'town'.
		if(ge('land').value !== ""){
			ge('town').value  = item.town[1];
			townField();
		}
		//Checks correct radio button for edit.
		var radios = document.forms[0].gender;
		for(i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.gender[1] == "Male"){
				radios[i].setAttribute("checked","checked");
			}else if(radios[i].value == "Female" && item.gender[1] == "Female"){
				radios[i].setAttribute("checked","checked");
			}else if(radios[i].value == "It's Complicated" && item.gender[1] == "It's Complicated"){
				radios[i].setAttribute("checked","checked");
			}
		}
		ge('age').value  = item.age[1];
		// Resets 'age' value display to current value.
		ageNum();
		ge('type').value  = item.type[1];
		ge('details').value  = item.details[1];
		ge('created').value  = item.created[1];
		ge('charKey').value = this.key;
		
		// remove the initial listener from the input 'save contact'
		save.removeEventListener("click", storeData);
		ge('saveChar').value = "Edit Character";
		var editSubmit = ge('saveChar');
		// Save the key value established in this function as a property of the editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to banish this character?"); 
		if(ask){
			localStorage.removeItem(this.key);
			alert("That character has been irrevocably thrown into the void!")
			window.location.reload();
		}else{
			alert("This character has been SPARED! For now...");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var ask = confirm("Are you positive that you want to wipe out your collection?")
			if(ask){
				localStorage.clear();
				alert("All characters have been destroyed!");
				window.location.reload();
				return false;
			}else{
				alert("That was a close one!")
			}
		}
	}
	
	// Validates that the character name and type fileds have been filled out.
	function validate(e){		
		//Define the elements we want to check.
		var getName = ge('charName');
		var getType = ge('type');
		
		errMsg.innerHTML = "";
		getName.style.border = "1px solid black";
		getType.style.border = "1px solid black";
		
		var messageAry = [];
		
		// If name field is empty, return error.
		if(getName.value === ""){
			var nameError = "Please give your character a name.";
			getName.style.border = "1px solid red";
			messageAry.push(nameError);	
		}
		
		// If type is not selected, returns error.
		if(getType.value === "|-Choose Character Type-|"){
			var typeError = "Please select a character type.";
			getType.style.border = "1px solid red";
			messageAry.push(typeError);	
		}
		
		// if there is an error message in the array, display it!
		if(messageAry.length >= 1){
			for(i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
=======
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
>>>>>>> master
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
