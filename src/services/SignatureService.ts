import {SignatureLocation} from '@interfaces/Pdf';
import {ConverterUtils} from '@utils/ConverterUtill';
import {PDFDocument} from 'pdf-lib';
import {Dimensions, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export class SignatureService {
  private static rootDir =
    Platform.OS === 'android'
      ? RNFS.DocumentDirectoryPath
      : RNFS.MainBundlePath;

  static async sign(
    pdfUrl: string,
    signatureArrayBuffer: string,
    signatureLocation: SignatureLocation,
  ): Promise<string> {
    const pdfToSignBase64 = await RNFS.readFile(pdfUrl, 'base64');
    const pdfToSignArrayBuffer = ConverterUtils.base64ToArrayBuffer(
      pdfToSignBase64,
    );

    const pdfDoc = await PDFDocument.load(pdfToSignArrayBuffer);
    const {pageWidth, pageHeight, x, y, pageNumber} = signatureLocation;

    const pageToSign = pdfDoc.getPage(pageNumber - 1);

    const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);

    const {height, width} = signatureImage.scale(0.5);

    if (Platform.OS === 'ios') {
      pageToSign.drawImage(signatureImage, {
        x: (pageWidth * (x - 12)) / Dimensions.get('window').width,
        y: pageHeight - (pageHeight * (y + 12)) / 540,
        width,
        height,
      });
    } else {
      console.log({
        x: (pageToSign.getWidth() * x) / pageWidth,
        y:
          pageToSign.getHeight() -
          (pageToSign.getHeight() * y) / pageHeight -
          25,
        pageSizeHeight: pageToSign.getHeight(),
        pageSizeWidth: pageToSign.getWidth(),
      });
      pageToSign.drawImage(signatureImage, {
        x: (pageToSign.getWidth() * x) / pageWidth,
        y:
          pageToSign.getHeight() -
          (pageToSign.getHeight() * y) / pageHeight -
          25,
        // x: pageToSign.getWidth() / 2 - width / 2,
        // y: 200,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    const pdfBase64 = ConverterUtils.uint8ToBase64(pdfBytes);
    const path = `${this.rootDir}/${uuidv4()}_${Date.now()}.pdf`;

    return new Promise((resolve, reject) => {
      RNFS.writeFile(path, pdfBase64, 'base64')
        .then(() => {
          resolve(path);
        })
        .catch(reject);
    });
  }
}
