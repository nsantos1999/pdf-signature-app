import {useRepository} from '@hooks/useRepository';
import {PdfLocalFile, SignatureLocation} from '@interfaces/Pdf';
import {ISignedPdfSchema} from '@schemas/SignedPdfSchema';
import {SignatureService} from '@services/SignatureService';
import {ToastUtil} from '@utils/ToastUtil';
import React, {createContext, useCallback, useContext, useState} from 'react';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

type SignPdfProviderParams = {
  children: React.ReactNode;
};

type Signature = {
  pathName: string;
  encoded: string;
};

type ISignPdfContext = {
  pdf: PdfLocalFile | undefined;
  // signatureLocation: SignatureLocation | undefined;
  signature: Signature | undefined;
  pdfSignedUrl: string;
  setPdfSignedUrl: (pdfSignedUrl: string) => void;

  setPdf: (pdf: PdfLocalFile) => void;
  // setSignatureLocation: (signatureLocation: SignatureLocation) => void;
  signPdf: (signatureLocation: SignatureLocation) => Promise<void>;
  setSignature: (signature: Signature) => void;
  handleResetPdfSigned: () => void;
  handleConfirmSignature: () => Promise<void>;
};

const SignPdfContext = createContext<ISignPdfContext>({} as ISignPdfContext);

function SignPdfProvider({children}: SignPdfProviderParams) {
  const [pdf, setPdf] = useState<PdfLocalFile>({} as PdfLocalFile);
  const [signature, setSignature] = useState<Signature>({} as Signature);
  const [pdfSignedUrl, setPdfSignedUrl] = useState<string>('');

  const signedPdfRepository = useRepository<ISignedPdfSchema>('SignedPdf');

  const handleResetPdfSigned = useCallback(() => {
    setPdfSignedUrl('');
  }, []);

  const signPdf = useCallback(
    async (signatureLocation: SignatureLocation) => {
      if (pdf && signature) {
        try {
          const pathToSignedPdf = await SignatureService.sign(
            pdf.uri,
            signature.encoded,
            signatureLocation,
          );

          setPdfSignedUrl(pathToSignedPdf);
        } catch (err) {
          console.error(err);
          ToastUtil.show({
            type: 'error',
            title: 'Eitaa!',
            content: 'Algo deu errado',
          });
        }
      } else {
        ToastUtil.show({
          type: 'error',
          title: 'Opa!',
          content: 'Alguma etapa foi pulada!',
        });
      }
    },
    [pdf, signature],
  );

  const handleConfirmSignature = useCallback(async () => {
    try {
      const newSignedPdf = {
        id: uuidv4(),
        title: 'PDF Signed',
        url: pdfSignedUrl,
        pdfWithoutSignatureUrl: pdf.uri,
        signedAt: new Date(),
      };

      await signedPdfRepository.create(newSignedPdf);
      // addSignedPdf(newSignedPdf);

      ToastUtil.show({
        title: 'Oba!',
        content: 'Pdf assinado com sucesso!',
      });
    } catch (err) {
      console.error(err);
      ToastUtil.show({
        type: 'error',
        title: 'Eitaa!',
        content: 'Algo deu errado',
      });
    }
  }, [pdf, signedPdfRepository, pdfSignedUrl]);

  return (
    <SignPdfContext.Provider
      value={{
        pdf,
        pdfSignedUrl,
        // signatureLocation,
        signature,
        setPdf,
        signPdf,
        handleConfirmSignature,
        // setSignatureLocation,
        setSignature,
        setPdfSignedUrl,
        handleResetPdfSigned,
      }}>
      {children}
    </SignPdfContext.Provider>
  );
}

function useSignPdf() {
  const singPdfContext = useContext(SignPdfContext);

  return singPdfContext;
}

export {SignPdfProvider, useSignPdf};
