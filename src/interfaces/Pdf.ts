export type PdfSigned = {
  path: string;
  name: string;
  signedAt: Date;
};

export type PdfLocalFile = {
  uri: string;
  type: string;
  size: number;
  name: string;
};

export type SignatureLocation = {
  page: number;
  x: number;
  y: number;
};
