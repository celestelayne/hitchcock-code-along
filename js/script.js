console.log('Sanity Check: script.js is working!');

// Hard Coded JSON 
// ------------------------------------------------

var films = [
	{
		"id": 1,
		"title": "Marnie",
		"year": 1964,
		"location": {
			"lat": 37.7737293,
			"lng": -122.387741
			},
		"actors": ["Sean Connery", "Tippi Hedren", "Gary Oldman"],
		"image": "http://the.hitchcock.zone/files/gallery/org/6589.jpg",
		"production_company": "Universal Pictures",
		"director": "Alfred Hitchcock"
	},
	{
		"id": 2,
		"title": "The Birds",
		"year": 1963,
		"location": {
			"lat": 37.7873946,
			"lng": -122.4104338
			},
		"actors": ["Evan Hunter", "Tippi Hedren", "Suzanne Pleshette"],
		"image": "http://www.theimaginativeconservative.org/wp-content/uploads/2015/05/Tippi-Hedren.jpg",
		"production_company": "Universal Pictures",
		"director": "Alfred Hitchcock"
	},
	{
		"id": 3,
		"title": "Vertigo",
		"year": 1958,
		"location": {
			"lat": 37.8028993,
			"lng": -122.4509625
			},
		"actors": ["James Stewart", "Kim Novak", "Alec Coppel"],
		"image": "http://ww2.kqed.org/news/wp-content/uploads/sites/10/2013/02/apartmentthen.jpg",
		"production_company": "Alfred J. Hitchcock Productions",
		"director": "Alfred Hitchcock"
	},
	{
		"id": 4,
		"title": "Family Plot",
		"year": 1976,
		"location": {
			"lat": 37.7918345,
			"lng": -122.4155322
			},
		"actors": ["Bruce Dern", "Ernest Lehman", "Barbara Harris"],
		"image": "http://images6.fanpop.com/image/photos/33400000/Family-Plot-alfred-hitchcock-33469114-1280-800.jpg",
		"production_company": "Universal Pictures",
		"director": "Alfred Hitchcock"
	}
];

// Setup
// ------------------------------------------------

// the only element on the html page you're modifying is the ul
// when you append list items to it
var filmList = document.querySelector('.film-list');

var map;
// var markers = [];

// Functions
// ------------------------------------------------

	function initMap() {
		var coordinates = new google.maps.LatLng(37.7841393, -122.3957547);
		
		var mapOptions = {
			center: coordinates,
			scrollwheel: false,
			// control the position of the zoom
			zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    	},
    	// control the location of the 'little google man'
    	streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
    	},
			zoom: 13
		};

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		// var infoWindow = new google.maps.InfoWindow();

	  // for (var i = 0; i < films.length; i++) {
	  //   createMarker(i);
	  // }

	  films.forEach(createMarker);
	  
	}

	function createMarker(data){
		console.log(data);
		var myLatLng = new google.maps.LatLng(data.location.lat, data.location.lng);
		
    var marker = new google.maps.Marker({
        map: map,
        image: data.image,
        title: data.title,
        position: myLatLng
    });
    // console.log(marker.image)
    createLine(data);
	}

	function createLine(result) {
		// make sure you're passing in the data you think you are
		console.log(result);
		// create the elements 
		var li = document.createElement('li');
		var p = document.createElement("p");
		var img = document.createElement("img");
		// dynamically add the bootstrap panel class to the list item
		li.classList.add('panel');
		// dynamically set the img src attribute 
		img.setAttribute('src', result.image);
		// console.log(img);

		// set the innerHTML of the p tag with the content from the json
		p.innerHTML = 'Movie Name: ' + result.title + '<br>' +  'Movie Year: ' + result.year + '<br>' + 'Produced by: ' + result.production_company + '<br>' + 'Starring: ' + result.actors;

		// append the p and img tags to the list item
		// append the list item to the ul class filmList
		li.appendChild(p);
		li.appendChild(img)
		filmList.appendChild(li);
	}
