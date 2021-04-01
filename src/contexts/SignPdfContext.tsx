import {PdfLocalFile, SignatureLocation} from '@interfaces/Pdf';
import {SignatureService} from '@services/SignatureService';
import {ToastUtil} from '@utils/ToastUtil';
import React, {createContext, useCallback, useContext, useState} from 'react';

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
  signPdf: (signatureLocation: SignatureLocation) => void;
  setSignature: (signature: Signature) => void;
  handleResetPdfSigned: () => void;
};

const SignPdfContext = createContext<ISignPdfContext>({} as ISignPdfContext);

function SignPdfProvider({children}: SignPdfProviderParams) {
  const [pdf, setPdf] = useState<PdfLocalFile>();
  const [signature, setSignature] = useState<Signature>();
  const [pdfSignedUrl, setPdfSignedUrl] = useState<string>('');

  const handleResetPdfSigned = useCallback(() => {
    setPdfSignedUrl('');
  }, []);
  // const [
  //   signatureLocation,
  //   setSignatureLocation,
  // ] = useState<SignatureLocation>();

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

  return (
    <SignPdfContext.Provider
      value={{
        pdf,
        pdfSignedUrl,
        // signatureLocation,
        signature,
        setPdf,
        signPdf,
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
