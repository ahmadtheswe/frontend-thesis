import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import * as L from "leaflet";
import {ImageService} from "../../service/image-service/image.service";
import {Subscription} from "rxjs";
import {BBox} from "../../model/dto/entity/BBox";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements AfterViewInit, OnDestroy {
  @Input() mapId: string = 'map';
  private map!: L.Map;
  drawnItems: any[] = [];
  drawing = false;
  firstPoint: L.LatLng | null = null;
  secondPoint: L.LatLng | null = null;
  rectangle: any;

  xPixel: number | null = null;
  yPixel: number | null = null;

  selectWithMap: boolean = true;

  minLon?: number;
  minLat?: number;
  maxLon?: number;
  maxLat?: number;
  bboxCoordinates: [number, number, number, number] | null = null;
  EARTH_RADIUS_KM = 6371;
  private bBoxRequest: BBox = {};
  areaInKm?: number;

  private subscription: Subscription = new Subscription();
  private mapInitialized: boolean = false;


  constructor(private imageService: ImageService) {
  }

  ngAfterViewInit() {
    if (this.selectWithMap)
      this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map)
      this.map.remove();
  }

  initMap(): void {
    if (this.mapInitialized) {
      return;
    }
    this.map = L.map('map').setView([51.505, -0.09], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '...'
    }).addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
    this.mapInitialized = true;
  }

  onMapClick(e: L.LeafletMouseEvent): void {
    if (this.drawing) {
      if (!this.firstPoint) {
        this.firstPoint = e.latlng;
      } else if (!this.secondPoint) {
        this.secondPoint = e.latlng;
        this.drawRectangle();
      }
    }
  }

  startDrawing(): void {
    this.drawing = true;
  }

  drawRectangle(): void {
    if (this.firstPoint && this.secondPoint) {
      if (this.rectangle) {
        this.map.removeLayer(this.rectangle);
      }
      const bounds: L.LatLngTuple[] = [
        [this.firstPoint.lat, this.firstPoint.lng],
        [this.secondPoint.lat, this.secondPoint.lng]
      ];
      this.rectangle = L.rectangle(bounds, {
        color: 'red',
        weight: 1
      }).addTo(this.map);
      this.drawnItems.push(this.rectangle);
      this.drawing = false;
      this.firstPoint = null;
      this.secondPoint = null;
    }

    // Calculate and update bbox coordinates
    const northEast = this.rectangle.getBounds().getNorthEast();
    const southWest = this.rectangle.getBounds().getSouthWest();
    this.bboxCoordinates = [southWest.lng, southWest.lat, northEast.lng, northEast.lat];
    this.bBoxRequest = {
      minLongitude: this.bboxCoordinates[0],
      minLatitude: this.bboxCoordinates[1],
      maxLongitude: this.bboxCoordinates[2],
      maxLatitude: this.bboxCoordinates[3],
    }
    this.areaInKm = this.calculateBBoxArea(this.bboxCoordinates);

    this.drawing = false;
    this.firstPoint = null;
    this.secondPoint = null;

    this.calculatePixelDimensions();
  }

  calculateBBoxArea(bbox: number[]): number {
    // Convert degrees to radians
    const minLon = this.degToRad(bbox[0]);
    const minLat = this.degToRad(bbox[1]);
    const maxLon = this.degToRad(bbox[2]);
    const maxLat = this.degToRad(bbox[3]);

    // Calculate the distance between the latitude points
    const latDistance = this.EARTH_RADIUS_KM * (maxLat - minLat);

    // Calculate the distance between the longitude points (considering latitude)
    const avgLat = (minLat + maxLat) / 2;
    const lonDistance = this.EARTH_RADIUS_KM * Math.cos(avgLat) * (maxLon - minLon);

    // Area of the bounding box in square kilometers
    return Math.abs(latDistance * lonDistance);
  }

  calculatePixelDimensions(): void {
    if (this.rectangle) {
      // Get pixel coordinates of the rectangle's corners
      const bounds = this.rectangle.getBounds();
      const topLeft = this.map.latLngToLayerPoint(bounds.getNorthWest());
      const bottomRight = this.map.latLngToLayerPoint(bounds.getSouthEast());

      // Calculate width (X-pixel) and height (Y-pixel) of the rectangle in pixels
      const xPixel = bottomRight.x - topLeft.x;
      const yPixel = bottomRight.y - topLeft.y;

      // Update variables
      this.xPixel = xPixel;
      this.yPixel = yPixel;
    }
  }

  saveRequest() {
    this.subscription.add(this.imageService.requestPreOrder(this.bBoxRequest, this.areaInKm!).subscribe({
      next: data => {
      },
      error: err => {
      }
    }))
  }

  onSelectWithMapChange(): void {
    console.log('selectWithMap changed to:', this.selectWithMap);
    if (this.selectWithMap) {
      setTimeout(() => this.initMap(), 0);
    } else {
      if (this.map) {
        this.map.remove();
        this.mapInitialized = false;
      }
    }
  }

  updateValueOfBBox() {
    this.bboxCoordinates = [this.minLon!, this.minLat!, this.maxLon!, this.maxLat!];
    this.bBoxRequest = {
      minLongitude: this.bboxCoordinates[0],
      minLatitude: this.bboxCoordinates[1],
      maxLongitude: this.bboxCoordinates[2],
      maxLatitude: this.bboxCoordinates[3],
    }
  }

  degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

}
