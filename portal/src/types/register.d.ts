declare type UploadInfo = {
  fileName: string;
  timestamp: number;
};

declare type Register = {
  email: string;
  select: string;
  multiSelect: string[];
  text: string;
  file?: UploadInfo; 
};
