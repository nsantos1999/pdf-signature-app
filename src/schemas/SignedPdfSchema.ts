export interface ISignedPdfSchema {
  id: string;
  url: string;
  pdfWithoutSignatureUrl: string;
  title: string;
  signedAt: Date;
}

export class SignedPdfSchema {
  static schema = {
    name: 'SignedPdf',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      url: 'string',
      pdfWithoutSignatureUrl: 'string',
      title: 'string',
      signedAt: 'date',
    },
  };
}
