//Exercise 4
Array.prototype.map = function(projectionFunction) {
	var results = [];
	this.forEach(function(itemInArray) {
    results.push(projectionFunction(itemInArray));
	});

	return results;
};

//Exercise 7
Array.prototype.filter = function(predicateFunction) {
	var results = [];
	this.forEach(function(itemInArray) {
    if (predicateFunction(itemInArray) === true) {
      results.push(itemInArray);
    }
	});

	return results;
};

//Exercise 10
Array.prototype.concatAll = function() {
	var results = [];
	this.forEach(function(subArray) {
		subArray.forEach(function(element){
			results.push(element);
		});
	});
	return results;
};

//Exercise 13
Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	return this.
		map(function(item) {
      return projectionFunctionThatReturnsArray(item);

		}).
		concatAll();
};


//Exercise 17
Array.prototype.reduce = function(combiner, initialValue) {
	var counter,
		accumulatedValue;

	// If the array is empty, do nothing
	if (this.length === 0) {
		return this;
	}
	else {
		// If the user didn't pass an initial value, use the first item.
		if (arguments.length === 1) {
			counter = 1;
			accumulatedValue = this[0];
		}
		else if (arguments.length >= 2) {
			counter = 0;
			accumulatedValue = initialValue;
		}
		else {
			throw "Invalid arguments.";
		}

		// Loop through the array, feeding the current value and the result of
		// the previous computation back into the combiner function until
		// we've exhausted the entire array and are left with only one value.
		while(counter < this.length) {
			accumulatedValue = combiner(accumulatedValue, this[counter]);
			counter++;
		}

		return [accumulatedValue];
	}
};


//Exercise 22
Array.zip = function(left, right, combinerFunction) {
	var counter,
		results = [];

	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
		// Add code here to apply the combinerFunction to the left and right-hand items in the respective arrays
		   results.push( combinerFunction(left[counter],right[counter]));
	}

	return results;
};





	// Build this structure
  //Note: please make sure when creating objects (both lists and videos) that you add properties in the same order as above. This doesn't impact the correctness of your code, but the verifier expects properties to be created in this order.
// [
// 	{
// 		"name": "New Releases",
// 		"videos": [
// 			{
// 				"id": 65432445,
// 				"title": "The Chamber"
// 			},
// 			{
// 				"id": 675465,
// 				"title": "Fracture"
// 			}
// 		]
// 	},
// 	{
// 		"name": "Thrillers",
// 		"videos": [
// 			{
// 				"id": 70111470,
// 				"title": "Die Hard"
// 			},
// 			{
// 				"id": 654356453,
// 				"title": "Bad Boys"
// 			}
// 		]
// 	}
// ]


function Ex25() {
	var lists = [
			{
				"id": 5434364,
				"name": "New Releases"
			},
			{
				"id": 65456475,
				"name": "Thrillers"
			}
		],
		videos = [
			{
				"listId": 5434364,
				"id": 65432445,
				"title": "The Chamber"
			},
			{
				"listId": 5434364,
				"id": 675465,
				"title": "Fracture"
			},
			{
				"listId": 65456475,
				"id": 70111470,
				"title": "Die Hard"
			},
			{
				"listId": 65456475,
				"id": 654356453,
				"title": "Bad Boys"
			}
		];

	return lists.concatMap(function(elements){
		var list_types = elements.name;
		var video_info = videos.map(function(items){
			return {id: items.id, title: items.title}
		});
		return Array.zip(
			// Array left
			list_types,
			//Array right
			video_info,
			//Callback function
			function (left,right) {
				return {name: list_types, videos:right}
			}
		)
	}) // complete this expression
}

console.log(Ex25());
