import {PdfLocalFile, SignatureLocation} from '@interfaces/Pdf';
import React, {createContext, useContext, useState} from 'react';

type SignPdfProviderParams = {
  children: React.ReactNode;
};

type ISignPdfContext = {
  pdf: PdfLocalFile | undefined;
  signatureLocation: SignatureLocation | undefined;

  setPdf: (pdf: PdfLocalFile) => void;
  setSignatureLocation: (signatureLocation: SignatureLocation) => void;
};

const SignPdfContext = createContext<ISignPdfContext>({} as ISignPdfContext);

function SignPdfProvider({children}: SignPdfProviderParams) {
  const [pdf, setPdf] = useState<PdfLocalFile>();
  const [
    signatureLocation,
    setSignatureLocation,
  ] = useState<SignatureLocation>();

  return (
    <SignPdfContext.Provider
      value={{pdf, signatureLocation, setPdf, setSignatureLocation}}>
      {children}
    </SignPdfContext.Provider>
  );
}

function useSignPdf() {
  const singPdfContext = useContext(SignPdfContext);

  return singPdfContext;
}

export {SignPdfProvider, useSignPdf};
