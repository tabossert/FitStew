$(document).ready(function(){
	/*$('#classesBlock').hide();
	$('#partnerBlock').hide();*/
	$('#sunday').css("border", "0");


	$('#modalBut').click(
   		function() {
	   		$('#accountModal').modal('show');
   		}
   )

   function mapLoc(addr) {
      map = new GMaps({
        div: '#map',
        zoom: 16,
        lat: -12.043333,
        lng: -77.028333,
        width: 200,
        height: 100
      });
   
   
	   GMaps.geocode({
		  address: addr,
		  callback: function(results, status) {
		    if (status == 'OK') {
		      var latlng = results[0].geometry.location;
		      map.setCenter(latlng.lat(), latlng.lng());
		      map.addMarker({
		        lat: latlng.lat(),
		        lng: latlng.lng()
		      });
		      map.refresh();
		    }
		  }
	   });
	}

	mapLoc('1461 Creekside Dr., Walnut Creek, CA');


});