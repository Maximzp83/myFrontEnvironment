

function initOfficeMap() {
  var map,
      mapDiv = document.getElementById('officeMap'),
      mapData = mapDiv.dataset;

  var center = { lat: Number(mapData.lat), lng: Number(mapData.lng) };
  var zoom = Number(mapData.zoom);
  map = new google.maps.Map(mapDiv, {
    center: center,
    zoom: zoom
  });

  var marker = new google.maps.Marker({
    position: center,
    map: map,
    // icon: '../img/icons/location-pin.svg'
    // title: mapData.hotelName
  });


  google.maps.event.addDomListener(window, 'resize', function () {
    var documentWidth = document.documentElement.clientWidth;

    setTimeout(function () {
      map.setCenter(center);
      documentWidth < 768 ? map.setZoom(zoom - 2) : map.setZoom(zoom);
    }, 500);
  });
}