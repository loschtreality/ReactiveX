// Nearly every time we flatten a tree we chain map() and concatAll(). Sometimes, if we're dealing with a tree several levels deep, we'll repeat this combination many times in our code. To save on typing, let's create a concatMap function that's just a map operation, followed by a concatAll.

Array.prototype.concatAll = function() {
	var results = [];
	this.forEach(function(subArray) {
    	subArray.forEach(function(element){
			results.push(element);
		});

	});
	return results;
};


Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	return this.
		map(function(item) {
			// ------------   INSERT CODE HERE!  ----------------------------
			// Apply the projection function to each item. The projection
			// function will return an new child array. This will create a
			// two-dimensional array.
			// ------------   INSERT CODE HERE!  ----------------------------
      return projectionFunctionThatReturnsArray(item);

		}).
		// apply the concatAll function to flatten the two-dimensional array
		concatAll();
};


	var spanishFrenchEnglishWords = [ ["cero","rien","zero"], ["uno","un","one"], ["dos","deux","two"] ];
	// collect all the words for each number, in every language, in a single, flat list
	var allWords = [0,1,2].
		concatMap(function(index) {
			return spanishFrenchEnglishWords[index];
		});

    console.log(allWords);

//	return JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]';
