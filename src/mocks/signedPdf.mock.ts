import {PdfSigned} from '../interfaces/Pdf';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const signedPdfMock: PdfSigned[] = [
  {
    id: uuidv4(),
    name: 'Teste File Signed',
    path: 'this/is/a/fake/path/doc.pdf',
    signedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Teste File Signed',
    path: 'this/is/a/fake/path/doc.pdf',
    signedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Teste File Signed',
    path: 'this/is/a/fake/path/doc.pdf',
    signedAt: new Date(),
  },
];
