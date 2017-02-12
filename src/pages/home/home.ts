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
  loc;

  constructor() {
    this.loc = [
        { id: '0', title: 'Boys Hostel 8', latitude: '30.7493628', longitude: '76.759254'   },
        { id: '1', title: 'Girls Hostel 3', latitude: '30.757250', longitude: '76.765439'   },
        { id: '2', title: 'UIET', latitude: '30.748251', longitude: '76.757242'   },
        { id: '3', title: 'Admin Block', latitude: '30.757785', longitude: '76.768035'   },
        { id: '4', title: 'A.C. Joshi Library', latitude: '30.761316', longitude: '76.769977'   },
        { id: '5', title: 'University Buisness School', latitude: '30.762781', longitude: '76.771232'   },
        { id: '6', title: 'Gymnasium Hall', latitude: '30.762155', longitude: '76.765342'   },
        { id: '7', title: 'Law Auditorium', latitude: '30.763611', longitude: '76.770642'   },
        { id: '8', title: 'UILS', latitude: '30.766810', longitude: '76.766877'   },
        { id: '9', title: 'UIAMS', latitude: '30.752981', longitude: '76.762531'   },
        { id: '10', title: 'SBI Bank', latitude: '30.756429', longitude: '76.766587'   },
        { id: '11', title: 'P.U. Dispensary', latitude: '30.756660', longitude: '76.768239'   },
        { id: '12', title: 'Student Center', latitude: '30.762219', longitude: '76.769484'   },
        { id: '13', title: 'Inter. Women Hostel', latitude: '30.752704', longitude: '76.758111'   },
        { id: '14', title: 'PU Gate no. 2', latitude: '30.754779', longitude: '76.768937'   },
        { id: '15', title: 'PU Gate no. 1', latitude: '30.761168', longitude: '76.774022'   },
        { id: '16', title: 'PU Gate no. 3', latitude: '30.755369', longitude: '76.762145'   }
      ];
  }

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
                  for(let i=0;i<this.loc.length;i++)
                  {
                    console.log(i+' - '+this.distance(latLng.lat,latLng.lng,this.loc[i].latitude,this.loc[i].longitude));
                  }
                  //marker.showInfoWindow();
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

  distance(lat1,lng1,lat2,lng2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lng2 - lng1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
}
