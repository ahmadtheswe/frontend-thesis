import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-example',
  templateUrl: './map-example.component.html',
  styleUrls: ['./map-example.component.scss']
})
export class MapExampleComponent implements OnInit {
  private map!: L.Map;
  private centroid: L.LatLngExpression = [-6.902278284324366, 107.61844183138646]; // Default center of the map
  clickedLatLong: L.LatLng = new L.LatLng(-6.902278284324366, 107.61844183138646);

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3
    });

    tiles.addTo(this.map);

    this.map.on('click', (e) => {
      this.clickedLatLong = e.latlng;
      // alert(`Latitude: ${this.clickedLatLong.lat}, Longitude: ${this.clickedLatLong.lng}`);
      // You can also perform other actions here like placing a marker or sending the coordinates to a server
    });
  }
}
