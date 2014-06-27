var mobileDemo = { 'center': '57.7973333,12.0502107', 'zoom': 10 };
//$('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('directions_map');
////////////////////////////////////////////////////////////

$('#page-gps').live('pageinit', function () {
    $('#map_canvas_1').gmap({
        'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI': true, 'callback': function () {
            var self = this;
            self.set('getCurrentPosition', function () {
                self.refresh();
                self.getCurrentPosition(function (position, status) {
                    if (status === 'OK') {
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        self.get('map').panTo(latlng);
                    }
                    else
                        alert('Unable to get current position');
                });
            });
        }
    });
});