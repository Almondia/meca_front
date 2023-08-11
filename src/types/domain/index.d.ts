export interface PreloadedThumbnailImage {
  blurDataURL?: string;
  src?: string;
  width: number;
  height: number;
}

export interface TimestampedEntity {
  createdAt: string;
}

interface CursorPaginationBase {
  hasNext?: string | null;
  pageSize?: number;
}

export interface CursorPaginationRequest extends CursorPaginationBase {
  containTitle?: string;
}

export interface CursorPaginationResponse extends Required<CursorPaginationBase> {
  sortOrder?: 'DESC' | 'ASC';
}

export type ImageExtension = 'jpg' | 'jpeg' | 'gif' | 'png' | 'webp';
export type ImageUploadPurpose = 'thumbnail' | 'card' | 'profile';

export interface ImageUploadRequest {
  purpose: ImageUploadPurpose;
  extension: ImageExtension;
  fileName: string;
}

export interface ExtractedKeywordsResponse {
  keywords: {
    [key: string]: number;
  };
}
