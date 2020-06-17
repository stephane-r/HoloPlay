import { useState } from 'react';
import downloadFile from '../utils/downloadFile';
import { DownloadFileParams } from '../utils/downloadFile';
import { actions } from '../store';

interface UseDownloadFileHook {
  loading: boolean;
  downloadVideo: (params: DownloadFileParams) => Promise<any>;
}

const useDownloadFile = (): UseDownloadFileHook => {
  const [loading, setLoading] = useState(false);

  const downloadVideo = async (params: DownloadFileParams): Promise<any> => {
    try {
      setLoading(true);
      await downloadFile(params);
      actions.setFlashMessage(`${params.fileName} has been donwload.`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    downloadVideo
  };
};

export default useDownloadFile;
