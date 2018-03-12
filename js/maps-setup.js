// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(37.644825, -113.845963); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "<h1>Camps</h1>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];

// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
var myGeoJSON= {
  "type":"FeatureCollection",
  "features":
  [/*{"type":"Feature",
    "properties":{myColor: 'red'},
    "myColor" : "red",
    "geometry":{"type":"Polygon",
                "coordinates":[[[34.0522,-118.2437],[38.5816,-121.4944],
                                [37.7749,-122.4194],[37.7652,-122.2416],
                                [36.7468,-119.7726]]]}},
   {"type":"Feature",
    "properties":{myColor: 'green'},
    "myColor" : "green",
     "geometry":{"type":"Polygon",
                 "coordinates":[[[-113.203125,58.35563036280967],[-114.78515624999999,51.944264879028765],
                                 [-101.6015625,51.944264879028765],[-112.32421875,58.263287052486035],
                                 [-113.203125,58.35563036280967]]]
                }}*/
              ]};


/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 5,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(41.889444, -121.374722),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: "Tule Lake",
              window_content: "<h3>Tule Lake</h3><p><b>Tule Lake</b> is one of the more well-known War Relocation Centres due to the"+
              " harsher living coniditions.  In addition, after the Loyalty Questionnaire was released, internees in any camp"+
              " who answered 'No' to both questions 27 & 28 were sent here to be punished and potentially deported. Learn more about" +
              " Tule Lake <a href='http://www.tulelake.org'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(36.728333, -118.154444),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Manzanar",
              window_content: "<h3>Manzanar</h3><p><b>Manzanar</b> began as an 'assembly centre' and went on to be closely " +
              "guarded due to the high tensions in the camp.  You can find out more information about it" +
              " <a href='http://www.janm.org/projects/clasc/manzanar.htm'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(33.9875, -114.401111),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Poston",
              window_content: '<h3>Poston</h3><p><b>Poston</b> was the biggest camp geographically and other than Tule Lake,'
              + ' had the highest population.  Check out some more information on Poston' +
              ' <a href="http://www.janm.org/projects/clasc/poston.htm">here</a>.</p>'
             },
             {position: new google.maps.LatLng(33.065083, -111.830528),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Gila River",
              window_content: "<h3>Gila River</h3><p><b>Gila River</b> in Arizona was on an Indian reservation, much like Poston."+
              "  Despite its name, it was on a desert.  You can learn more about it "+
              "<a href='http://www.janm.org/projects/clasc/gila.htm'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(38.049444, -102.328611),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Granada",
              window_content: "<h3>Granada</h3><p><b>Granada</b> had the lowest population of all the camps, yet had the most"+
              " 'yes-yes' (as opposed to no-no) answers. More about Granada can be learned <a href='http://www.janm.org/projects/clasc/granada.htm'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(44.671667, -108.946389),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Heart Mountain",
              window_content: "<h3>Heart Mountain</h3><p><b>Heart Mountain</b> was the site of many hospitalizations due to the"+
              " harsh weather and terrible living conditions. It was known for its duststorms and rattlesnakes."+
              " More information can be accessed <a href='http://www.janm.org/projects/clasc/ht_mt.htm'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(42.679, -114.244),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Minidoka",
              window_content: "<h3>Minidoka</h3><p><b>Minidoka</b> was considered to be the best camp to live in due to kind"+
              " administration and the good morale of the population there.  You can learn more about it"+
              " <a href='http://www.janm.org/projects/clasc/minidoka.htm'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(39.41, -112.77),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Topaz",
              window_content: "<h3>Topaz</h3><p><b>Topaz</b> had some of the harshest weather and living conditions, all the way from"+
              " freezing winters to hot summers with dust storms.  More information can be seen "+
              "<a href='http://www.janm.org/projects/clasc/topaz.htm'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(33.766297, -91.280158),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Rohwer",
              window_content: "<h3>Rohwer</h3><p><b>Rohwer</b> was yet another site with high tensions, and despite the good soil, many"+
              " had difficulty farming here.  You can learn more about Rohwer <a href='http://www.janm.org/projects/clasc/rohwer.htm'>here</a>.</p>"
             },
             {position: new google.maps.LatLng(33.411667, -91.4611119),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Jerome",
              window_content: "<h3>Jerome</h3><p><b>Jerome</b> may have had low security, but its geography ensured that few (if any) would be able "+
              "to escape.  It was also in operation for the shortest amount of time, with many of the internees going to different camps after it "+
              "closed down.  More information can be accessed <a href='http://www.janm.org/projects/clasc/jerome.htm'>here</a>.</p>"
            },
            ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.window_content + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);

  var biggestPopulation = new google.maps.Rectangle({
    strokeColor: '#00FF00',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#00FF00',
    fillOpacity: 0.35,
    // in general, we always have to *set the map* when we
    // add features.
    map: my_map,
    bounds: {
      north: 38.5816,
      south: 37.3382,
      east: -119.7726,
      west: -122.4194
    },

    center: {"lat": 37.9299, "lng":-121.0002},
    radius: 1000
  });
  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// from outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
