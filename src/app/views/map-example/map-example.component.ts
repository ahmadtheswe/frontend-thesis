import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-example',
  templateUrl: './map-example.component.html',
  styleUrls: ['./map-example.component.scss']
})
export class MapExampleComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() mapId: string = 'map';
  @Input() useCoordinateValue: boolean = true;
  @Output() latLongClicked = new EventEmitter<{ lat?: number, lng?: number }>();

  private map!: L.Map;
  private currentMarker?: L.Marker;
  coordinateValue: L.LatLng = new L.LatLng(-6.902278284324366, 107.61844183138646);
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };

  constructor() {
  }

  ngOnInit(): void {
    // if (!this.map)
    //   this.initMap();
  }

  ngAfterViewInit(): void {
    this.initMap()
  }

  private initMap(): void {
    console.log(this.mapId);
    this.map = L.map(this.mapId, {
      center: [this.coordinateValue.lat, this.coordinateValue.lng],
      zoom: 13,
      tap: this.useCoordinateValue,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3
    });

    tiles.addTo(this.map);

    // Add a default marker at the centroid
    this.currentMarker = L.marker([this.coordinateValue.lat, this.coordinateValue.lng], this.markerIcon)
      .addTo(this.map);

    this.map.on('click', (e) => {
      this.coordinateValue = e.latlng;
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }

      this.currentMarker = L.marker([this.coordinateValue.lat, this.coordinateValue.lng], this.markerIcon)
        .addTo(this.map);
      if (this.useCoordinateValue)
        this.latLongClicked.emit({lat: this.coordinateValue.lat, lng: this.coordinateValue.lng});
      else
        this.latLongClicked.emit({lat: undefined, lng: undefined});
    });
  }

  updateMarker(): void {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    this.currentMarker = L.marker([this.coordinateValue.lat, this.coordinateValue.lng], this.markerIcon)
      .addTo(this.map);
    this.map.setView([this.coordinateValue.lat, this.coordinateValue.lng]);
  }

  private handleCoordinateValueChange(): void {
    if (this.map && this.currentMarker) {
      if (this.useCoordinateValue) {
        this.map.addLayer(this.currentMarker);
        this.latLongClicked.emit({ lat: this.coordinateValue.lat, lng: this.coordinateValue.lng });
      } else {
        // this.map.removeLayer(this.currentMarker);
        this.latLongClicked.emit({lat: undefined, lng: undefined});
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['useCoordinateValue']) {
      this.handleCoordinateValueChange();
    }
  }
}
