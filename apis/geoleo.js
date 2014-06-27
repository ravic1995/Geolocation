var mobileDemo = { 'center': '57.7973333,12.0502107', 'zoom': 10 };
//$('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('directions_map');
////////////////////////////////////////////////////////////

$('#page-home').live('pageinit', function () {
        $('#map_canvas_1').gmap({
            'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI': true, 'callback': function () {
            var self = this;
            self.set('getCurrentPosition', function () {
                self.refresh();
                self.getCurrentPosition(function (position, status) {
                    if (status === 'OK') {
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        self.get('map').panTo(latlng);
                        self.search({ 'location': latlng }, function (results, status) {
                            if (status === 'OK') {
                                $('#from').val(results[0].formatted_address);
                            }
                        });
                    } else {
                        alert('Unable to get current position');
                    }
                });
            });
            $('#submit').click(function () {
                var waypts = [];
                waypts.push({ location: 'Caseros Norte 726, San Juan, Argentina', stopover: true });
                waypts.push({ location: 'Las Heras Norte 1090, Santa Lucia, San Juan, Argentina', stopover: false });
                var request = {
                    origin: $('#from').val(),
                    destination: $('#to').val(),
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING
                };

                self.displayDirections(request, { 'panel': document.getElementById('directions') }, function (response, status) {
                    (status === 'OK') ? $('#results').show() : $('#results').hide();
                    /*var route = response.routes[0];
                    var summaryPanel = document.getElementById('directions_panel');
                    summaryPanel.innerHTML = '';
                    // For each route, display summary information.
                    for (var i = 0; i < route.legs.length; i++) {
                        var routeSegment = i + 1;
                        summaryPanel.innerHTML += '<b>Ruta Segmento: ' + routeSegment + '</b><br>';
                        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                    }*/
                });
                return false;
            });
        }
    });
});
////////////////////////////////////////////////////////////