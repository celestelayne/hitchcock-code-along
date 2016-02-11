# Google Maps Code Along

## Visualizing Hitchcock Mockup
This is what we'll be building:
![Website Mockup](/starter-code/visualizing-hitchcock-mockup.png)

## Step 1
------
#### Set up the HTML document and layout
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
- See [Bootstrap documentation](http://getbootstrap.com/getting-started/#template) for guideance on how to structure your starting document.
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

    <!-- jQuery (necessary for Bootstrap JavaScript plugins) -->
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
- Inside the HTML elements, create a column for the targeted screen size:
    * col-xs < 768px (e.g. smartphones)
    * col-sm ≥ 768px (e.g. tablets)
    * col-md ≥ 992px (e.g. laptops, desktops)
    * col-lg ≥ 1200px (e.g. large desktops, smart TVs)
- For this exercise, we're going to focus on the **first three screen sizes**
- In the **left colum**, we're going to place our Google Map, and in the right column, we're going to render our films.
```sh
<section id="map-canvas" class="col-xs-12 col-sm-6 col-md-8">Left Column</section>
<aside>
    <div class="right col-xs-6 col-md-4">Right Column</div>
</aside>
```
- In desktop view, we'll have 8 columns on the left and 4 columns on the right
- In tablet view, the `<divs>` are still side by side. Google Map takes up 6 columns on the left and the rendered data takes up 6 columns on the right
- In mobile view, the two divs stack on top each other. The left column (Google Map) takes the full width of the screen; while the right column (rendered data) stacks below it.

#### Test the Theory
- In our `stylesheet.css` file, we'll colorblock our elements to make sure our layout looks the way we expect it to.
The HTML will look like this:
```sh
<div class="col-xs-12 col-sm-6 col-md-8">Left Column</div>
<div class="right col-xs-12 col-md-4">Right Column</div>
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

aside {
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
console.log('Sanity Check: app.js is working!');
// global map variable
var map;

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
- We have the json object hard-coded into the top of the script file.
- Loop through the films using a [for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) or a [forEach method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) so that we can apply the function that adds markers to the map, to EACH of the films. Note: this code goes INSIDE the initMap() function.
```sh
// for loop
    for (var i = 0; i < films.length; i++) {
        createMarker(i);
    }
// forEach method
    films.forEach(createMarker);
```
- Now, we write the function that will create and add markers to the map. Use [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/examples/marker-simple) for how to structure this code.
```sh
function createMarker(data){
		console.log(data);
		var myLatLng = new google.maps.LatLng(data.location.lat, data.location.lng);
    var marker = new google.maps.Marker({
        map: map,
        image: data.image,
        title: data.title,
        position: myLatLng
    });
    createLine(data);
}
```

## Step 3
------
#### Append Data to DOM
- In the aside element, we'll add an unordered list (similar to our to-do list example) `<ul>` with a class of '.film-list' This is where the list items will be appended.
```ssh
<ul class="film-list"></ul>
```
- Grab the unordered list and save it to a variable, filmList.
```ssh
var filmList = document.querySelector('.film-list');
```
- Create a `<li>` to hold each of the panels, `<p>` and `<img>` tags. Note: a panel is like a Pinterest card.
- Dynamically create Bootstrap [panels](http://getbootstrap.com/components/#panels);
```ssh
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
```