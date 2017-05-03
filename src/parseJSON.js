// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  if (json === undefined) {
  	debugger;
  }
  // debugger;
  var trimedJson = json.trim();
  // boolean true false
  if (trimedJson === "true") {
  	return true;
  }
  else if (trimedJson === "false") {
  	return false;
  }
  // number
  else if (!isNaN(Number(trimedJson))) {
  	return Number(trimedJson);
  }
  // string
  else if (trimedJson[0] === "\"") {
  	return trimedJson.substring(1,trimedJson.length - 1);
  }
  // null
  else if (trimedJson === "null") {
  	return null;
  }
  // array
  else if (trimedJson[0] === "[") {
  	if (trimedJson[1] === "]") {
  		return [];
  	}
  	if (trimedJson[trimedJson.length - 1] !== "]") {

  	}
  	if (trimedJson[trimedJson.length - 1] === "]"){
	  	var list = trimedJson.substring(1,trimedJson.length - 1).split(',');
	  	for (var i = 0; i < list.length; i++) {
	  		list[i] = parseJSON(list[i]);
	  	}
	  	return list;
  	}
  	return undefined;
  }
  // object
  else {
  	var object = {};
  	if (trimedJson[1] === "}") {
  		return object;
  	}
  	// "{ "a   "  :  1   , "b " :  " a b" }" to remove {}
  	trimedJson = trimedJson.substring(1,trimedJson.length - 1);
  	//" "a   "  :  1   , "b " :  " a b" " to remove extra spaces
  	trimedJson = trimedJson.trim();
  	//"a   "  :  1   , "b " :  " a b"

  	//[""a   "  :  1   ", " "b " :  " a b""]
   	var listOfJson = trimedJson.split(/,(?= *")/g);
   	for (var i = 0; i < listOfJson.length; i++) {
   
   		var pair = listOfJson[i].split(/:(.*)/);
   		pair[0] = pair[0].trim();
   		pair[0] = pair[0].substring(1, pair[0].length - 1);
   		//reduce extra spaces into single space for the key string
   		var key = pair[0].replace(/ +/g," ");
   		var value = pair[1];
   		value = parseJSON(value);
   		object[key] = value;
   	}
   	return object;
  }
};
