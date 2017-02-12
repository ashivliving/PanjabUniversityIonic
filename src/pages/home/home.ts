import {Component} from "@angular/core";
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  GoogleMapsMarker,
  Geolocation
} from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _latitude: number;
  private _longitude: number;

  constructor() {}

  ngAfterViewInit() {
    let map = new GoogleMap(document.getElementById('map'));
    //let marker: GoogleMapsMarker;

    // when the map is ready
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      Geolocation.getCurrentPosition().then(pos => {
        this._latitude = pos.coords.latitude;
        this._longitude = pos.coords.longitude;

        // move the camera
        map.moveCamera({
          target: new GoogleMapsLatLng(this._latitude, this._longitude),
          zoom: 18,
          tilt: 30
        }).then(() => {

          // add a marker
          map.addMarker({
            position: new GoogleMapsLatLng(this._latitude, this._longitude),
            title: 'You are here!'
          })

            // show marker info
          .then((marker: GoogleMapsMarker) => {
            marker.showInfoWindow();

            // listen to all available events
            map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
              (latLng) => {
                map.clear();
                 map.addMarker({
                  position: new GoogleMapsLatLng(latLng.lat,latLng.lng),
                  title: 'Click to Know More!',
                  draggable : true
                }).then((marker: GoogleMapsMarker) => {
                  marker.showInfoWindow();
                });
                //alert('MAP_CLICK - '+latLng.toUrlValue());
              });
            
            map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe(
              (latLng) => {
                //alert('MAP_LONG_CLICK - '+latLng.coords.latitude);
                console.log('Latitude - ',latLng.lat);
                //console.log('Longitude - ',latLng.coords.longitude);
              });
          /*
            map.on(GoogleMapsEvent.MY_LOCATION_CHANGE).subscribe(
              () => {
                alert('MY_LOCATION_CHANGE');
              });

            map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(
              () => {
                alert('MY_LOCATION_BUTTON_CLICK');
              });

            map.on(GoogleMapsEvent.INDOOR_BUILDING_FOCUSED).subscribe(
              () => {
                alert('INDOOR_BUILDING_FOCUSED');
              });

            map.on(GoogleMapsEvent.INDOOR_LEVEL_ACTIVATED).subscribe(
              () => {
                alert('INDOOR_LEVEL_ACTIVATED');
              });

            map.on(GoogleMapsEvent.CAMERA_CHANGE).subscribe(
              () => {
                alert('CAMERA_CHANGE');
              });

            map.on(GoogleMapsEvent.CAMERA_IDLE).subscribe(
              () => {
                alert('CAMERA_IDLE');
              });

            map.on(GoogleMapsEvent.MAP_READY).subscribe(
              () => {
                alert('MAP_READY');
              });

            map.on(GoogleMapsEvent.MAP_LOADED).subscribe(
              () => {
                alert('MAP_LOADED');
              });

            map.on(GoogleMapsEvent.MAP_WILL_MOVE).subscribe(
              () => {
                alert('MAP_WILL_MOVE');
              });

            map.on(GoogleMapsEvent.MAP_CLOSE).subscribe(
              () => {
                alert('MAP_CLOSE');
              });

            map.on(GoogleMapsEvent.MARKER_CLICK).subscribe(
              () => {
                alert('MARKER_CLICK');
              });

            map.on(GoogleMapsEvent.OVERLAY_CLICK).subscribe(
              () => {
                alert('OVERLAY_CLICK');
              });

            map.on(GoogleMapsEvent.INFO_CLICK).subscribe(
              () => {
                alert('INFO_CLICK');
              });

            map.on(GoogleMapsEvent.MARKER_DRAG).subscribe(
              () => {
                alert('MARKER_DRAG');
              });

            map.on(GoogleMapsEvent.MARKER_DRAG_START).subscribe(
              () => {
                alert('MARKER_DRAG_START');
              });

            map.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(
              () => {
                alert('MARKER_DRAG_END');
              });
            */
          });
        });
      });
    });
  }
}
