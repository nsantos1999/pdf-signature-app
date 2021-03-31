import {SignatureLocation} from '@interfaces/Pdf';
import {PDFDocument, PDFPage} from 'pdf-lib';

export class SignatureService {
  async sign(
    pdfUrl: string,
    signatureArrayBuffer: string,
    signatureLocation: SignatureLocation,
  ) {
    const pdfDoc = await PDFDocument.load(pdfUrl);

    const pageToSign = pdfDoc.getPage(signatureLocation.page);

    const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);

    pageToSign.drawImage();

    if (Platform.OS === 'ios') {
      pageToSign.drawImage(signatureImage, {
        x:
          (pageWidth * (signatureLocation.x - 12)) /
          Dimensions.get('window').width,
        y: pageHeight - (pageHeight * (y + 12)) / 540,
        width: 50,
        height: 50,
      });
    } else {
      pageToSign.drawImage(signatureImage, {
        x: (pageToSign.getWidth() * signatureLocation.x) / pageWidth,
        y:
          pageToSign.getHeight() -
          (pageToSign.getHeight() * y) / pageHeight -
          25,
        width: 50,
        height: 50,
      });
    }
    const page1 = PDFPage.modify(signatureLocation.page).drawImage({
      x: 150,
      y: 150,
      width: 50,
      height: 50,
    });
  }
}
