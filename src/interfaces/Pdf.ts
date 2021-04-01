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
  pageNumber: number;
  pageWidth: number;
  pageHeight: number;
  x: number;
  y: number;
};
