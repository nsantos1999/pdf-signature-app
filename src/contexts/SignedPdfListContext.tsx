import React, {useContext} from 'react';
import {useRepository} from '@hooks/useRepository';
import {ISignedPdfSchema} from '@schemas/SignedPdfSchema';
import {ToastUtil} from '@utils/ToastUtil';
import {createContext, useCallback, useEffect, useState} from 'react';
import {Typography} from '@components/Typography';

type SignedPdfListProviderParams = {
  children: React.ReactNode;
};

type ISignedPdfListContext = {
  signedPdfs: ISignedPdfSchema[];
};

const SignedPdfListContext = createContext({} as ISignedPdfListContext);

function SignedPdfListProvider({children}: SignedPdfListProviderParams) {
  const [signedPdfs, setSignedPdfs] = useState<ISignedPdfSchema[]>(
    [] as ISignedPdfSchema[],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signedPdfRepository = useRepository<ISignedPdfSchema>('SignedPdf');

  const handleLoadSignedPdfs = useCallback(async () => {
    try {
      setIsLoading(true);
      const signedPdfsList = await signedPdfRepository.find();
      console.log('SignedPdfList', signedPdfsList);
      setSignedPdfs(
        signedPdfsList.map(signedPdf => ({
          id: signedPdf.id,
          pdfWithoutSignatureUrl: signedPdf.pdfWithoutSignatureUrl,
          signedAt: signedPdf.signedAt,
          title: signedPdf.title,
          url: signedPdf.url,
        })),
      );
    } catch (err) {
      ToastUtil.show({
        type: 'error',
        title: 'Opa!',
        content: 'Não foi possivel carregar pdfs... Tente novamente',
      });
    } finally {
      console.log('SignedPdfList', 'End Promise');
      setIsLoading(false);
    }
  }, [signedPdfRepository]);

  useEffect(() => {
    handleLoadSignedPdfs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SignedPdfListContext.Provider
      value={{
        signedPdfs,
      }}>
      {isLoading ? <Typography>Loading...</Typography> : children}
    </SignedPdfListContext.Provider>
  );
}

function useSignedPdfList() {
  const signedPdfListContext = useContext(SignedPdfListContext);

  return signedPdfListContext;
}

export {useSignedPdfList, SignedPdfListProvider};
