import {Coordinate} from "../entity/Coordinate";
import {BBox} from "../entity/BBox";

export interface PreOrderResponse {
  id?: string;
  centerCoordinateResponse?: Coordinate;
  bboxResponse?: BBox;
  isActive?: boolean;
  createdAt?: number;
  deliveredAt?: number;
  isPaid?: boolean;
  redirectUrl?: string;
  probeType?: string;
}
