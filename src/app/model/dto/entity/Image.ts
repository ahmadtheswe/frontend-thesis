export interface Image {
  id?: string;
  uploaderId?: string;
  title?: string;
  mediaType?: string;
  filename?: string;
  originalImageDir?: string;
  createdAt?: number;
  latestAccess?: number;
  isPublic?: boolean;
}
