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


// This time we have 4 separate arrays each containing lists, videos, boxarts, and bookmarks respectively. Each object has a parent id, indicating its parent. We want to build an array of list objects, each with a name and a videos array. The videos array will contain the video's id, title, bookmark time, and smallest boxart url. In other words we want to build the following structure:

// [
// 	{
// 		"name": "New Releases",
// 		"videos": [
// 			{
// 				"id": 65432445,
// 				"title": "The Chamber",
// 				"time": 32432,
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
// 			},
// 			{
// 				"id": 675465,
// 				"title": "Fracture",
// 				"time": 3534543,
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"
// 			}
// 		]
// 	},
// 	{
// 		"name": "Thrillers",
// 		"videos": [
// 			{
// 				"id": 70111470,
// 				"title": "Die Hard",
// 				"time": 645243,
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
// 			},
// 			{
// 				"id": 654356453,
// 				"title": "Bad Boys",
// 				"time": 984934,
// 				"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"
// 			}
// 		]
// 	}
// ]

// Note: please make sure when creating objects (both lists and videos) that you add properties in the same order as above. This doesn't impact the correctness of your code, but the verifier expects properties to be created in this order.




function Ex26() {
	var lists = [
			{
				"id": 5434364,
				"name": "New Releases"
			},
			{
				"id": 65456475,
				name: "Thrillers"
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
		],
		boxarts = [
			{ videoId: 65432445, width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
			{ videoId: 65432445, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" },
			{ videoId: 675465, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
			{ videoId: 675465, width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
			{ videoId: 675465, width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
			{ videoId: 70111470, width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
			{ videoId: 70111470, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" },
			{ videoId: 654356453, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
			{ videoId: 654356453, width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }
		],
		bookmarks = [
			{ videoId: 65432445, time: 32432 },
			{ videoId: 675465, time: 3534543 },
			{ videoId: 70111470, time: 645243 },
			{ videoId: 654356453, time: 984934 }
		];

	return lists.map(function(genres){

		//Videos

		matched_videos = videos.filter(function(list_match){
			return list_match.listId === genres.id;
		});

		//Boxarts
		min_boxarts = boxarts.reduce(function(prev,curr) {
			return (prev.width * prev.height) < (curr.width * curr.height) ? prev : curr;
		}).filter(function(vid_match){
			return vid_match.videoId === matched_videos.id;
		});

		//Bookmarks
		matching_bookmarks = bookmarks.filter(function(video_match){
			return video_match.id === matched_videos.id;
		});

		var match_obj = {
			id: matched_videos,
			title: matched_videos.title,
			time: matching_bookmarks.time,
			boxart: min_boxarts.url
		};

		return {name: genres.name, videos: [match_obj]};
  });

}


console.log(Ex26()[0].videos);
