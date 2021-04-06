import React, {useContext} from 'react';
import {useRepository} from '@hooks/useRepository';
import {ISignedPdfSchema} from '@schemas/SignedPdfSchema';
import {ToastUtil} from '@utils/ToastUtil';
import {createContext, useCallback, useState} from 'react';

type SignedPdfListProviderParams = {
  children: React.ReactNode;
};

type ISignedPdfListContext = {
  signedPdfs: ISignedPdfSchema[];
  isLoading: boolean;
  handleLoadSignedPdfs: () => Promise<void>;
  addSignedPdf: (newSignedPdf: ISignedPdfSchema) => void;
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
      setIsLoading(false);
    }
  }, [signedPdfRepository]);

  const addSignedPdf = useCallback(
    (newSignedPdf: ISignedPdfSchema) => {
      setSignedPdfs([...signedPdfs, newSignedPdf]);
    },
    [signedPdfs],
  );

  // useEffect(() => {
  //   handleLoadSignedPdfs();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <SignedPdfListContext.Provider
      value={{
        signedPdfs,
        isLoading,

        handleLoadSignedPdfs,
        addSignedPdf,
      }}>
      {children}
    </SignedPdfListContext.Provider>
  );
}

function useSignedPdfList() {
  const signedPdfListContext = useContext(SignedPdfListContext);

  return signedPdfListContext;
}

export {useSignedPdfList, SignedPdfListProvider};
