# Google Maps Code Along

## Step 1
------
#### Set up base HTML document
- In your blank `index.html` file, set up the bones for what will be your project.
```sh
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Visualizing Hitchcock</title>
</head>
<body>
	
</body>
</html>
```
#### Add [Twitter Bootstrap](https://getbootstrap.com). 
- For this exercise, we'll be using the Bootstrap CDN (content delivery network). In the `<head>` you'll add the stylesheet `<links>` and `<meta>` tags.
- Just above the closing `</body>` tag, you'll add the javascript files (starting with jquery), which bootstrap relies on to function and finally the javascript file that you'll be creating for your project.
```sh
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- ensure proper rendering and touch zooming on mobile devices, mobile first -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags **MUST** come first in the head; any other head content must come **AFTER** these tags -->
	<title>Visualizing Hitchcock</title>
	<!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- YOUR CSS STYLESHEET GOES HERE -->
</head>
<body>
    // code goes here

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <!-- YOUR JAVASCRIPT FILE GOES HERE -->
</body>
```
#### Start with the basic layout of the page 
Include a <header>, <section>, <aside> and <footer>. These elements go inside the body tags.
```sh
<header></header>
<section></section>
<aside></aside>
<footer></footer>
```
#### Make it RESPONSIVE
- Add the row class to each of the elements on the page; and in the section tag, we'll add the map-canvas id because that's where we're going to place our Google Map.
```sh
<header class="row"></header>
<section id="map-canvas"></section>
<aside class="row"></aside>
<footer class="row"></footer>
```
- Inside the row, create a column for the targeted screen size
    * col-xs < 768px (e.g. smartphones)
    * col-sm ≥ 768px (e.g. tablets)
    * col-md ≥ 992px (e.g. laptops, desktops)
    * col-lg ≥ 1200px (e.g. large desktops, smart TVs)
- For this exercise, we're going to focus on the **first three screen sizes**
- In the **left colum**, we're going to place our Google Map, and in the right column, we're going to render our data. See the Bootstrap section on [grid offset](http://getbootstrap.com/css/#grid-offsetting) to see how to attain the look of the aside. 
```sh
<section id="map-canvas" class="col-xs-12 col-sm-6 col-md-8">Left Column</section>
<aside class="row">
    <div class="right col-xs-6 col-md-4 col-md-offset-6">Right Column</div>
</aside>
```
- In web view, we'll have 8 columns on the left and 4 columns on the right
- In tablet view, the `<divs>` are still side by side. Google Map takes up 6 columns on the left and the rendered data takes up 6 columns on the right
- In mobile view, the two divs stack on top each other. The left column (Google Map) takes the full width of the screen; while the right column (rendered data) takes up half the screen (6 columns)

#### Test the Theory
- In our `stylesheet.css` file, we'll colorblock our elements to make sure our layout looks the way we expect it to.
The HTML will look like this:
```sh
<div id="left" class="col-xs-12 col-sm-6 col-md-8">Left Column</div>
<div id="right" class="col-xs-6 col-md-4">Right Column</div>
```
The CSS will look like this:
```sh
header {
	height: 10%;
	background: pink;	
}
section {
	height: 80%;
}

footer {
	height: 10%;
	background: red;	
}
```
- Now drag your window back and forth to see the breakpoints in action and make sure that you're getting the desired outcome.


## Step 2
------
#### Get Google Maps API Key
- Go to the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/)
- Get your [API Key](https://developers.google.com/maps/documentation/javascript/get-api-key). The JavaScript API will only work with a Browser key.
- Add the script to the bottom of your file, along with the other `<script>` tags
```sh
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  type="text/javascript"></script>
```
- Replace YOUR_API_KEY with the one you were just assigned.

#### Initialize Google Maps
- In the script.js file, we initialize the map with the function `initMap()` and add the function that sets the coordinates and zoom level. Use the [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/examples/map-simple) for guidance on how to structure the function.
```sh
  $(document).ready(function(){
    console.log('Sanity Check: app.js is working!');
    initMap();
  });
  
var map, marker;

function initMap() {
    var coordinates = new google.maps.LatLng(37.7841393, -122.3957547);
    var mapOptions = {
			center: coordinates,
			scrollwheel: false,
			zoom: 13
		};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
```

#### Add Markers to the Map
- We have the json object hard-coded into the script file.
- Loop through the films using a [for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) so that we can apply the function that adds markers to the map, to EACH of the films.
```sh
for (var i = 0; i < films.length; i++) {
	    createMarker(i);
	  }
```
- Now, we write the function that will create and add markers to the map. Use [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/examples/marker-simple) for how to structure this code.
```sh
function createMarker(){
	var data = films[i];
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
```

## Step 3
------
#### Append Data to DOM
- In the right column, we'll add a `<div>` with an id of #results-list
```ssh
<ul id="results-list" class="col-xs-12"></ul>
```
- Grab the list item and save it to the variable, resultsList.
```ssh
var resultsList = document.querySelector('#results-list');
```
- Create a `<li>` to hold each of the panels
- Dynamically create Bootstrap [cards](http://v4-alpha.getbootstrap.com/components/card/#example);
```ssh
function createLine(result) {
		// make sure you're passing in the data you think you are
		// console.log(data);
		// create the elements 
		var li = document.createElement('li');
		var p = document.createElement("p");
		var img = document.createElement("img");
		
		// dynamically add the bootstrap panel class to the list item
		li.classList.add('panel');
		// dynamically set the img src attribute 
		img.setAttribute('src', data.image);
		// console.log(img);

		// set the innerHTML of the p tag with the content from the json
		p.innerHTML = 'Movie Name: ' + data.title + '<br>' +  'Movie Year: ' + data.year + '<br>' + 'Produced by: ' + data.production_company + '<br>' + 'Starring: ' + data.actors;

		// append the p and img tags to the list item
		// append the list item to the ul class filmList
		li.appendChild(p);
		li.appendChild(img)
		filmList.appendChild(li);
}
```



