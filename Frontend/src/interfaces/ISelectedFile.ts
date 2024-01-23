export type UploadingStatus = "pending" | "uploading" | "failed" | "success";

export interface ISelectedFile {
  file: File;
  percentage: number;
  status: UploadingStatus;
}