import { useSnackbar } from "../providers/Snackbar";
import downloadFile, { DownloadFileParams } from "../utils/downloadFile";
import { useState } from "react";

interface UseDownloadFileHook {
  loading: boolean;
  downloadVideo: (params: DownloadFileParams) => Promise<any>;
}

const useDownloadFile = (): UseDownloadFileHook => {
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const downloadVideo = async (params: DownloadFileParams): Promise<any> => {
    try {
      setLoading(true);
      await downloadFile(params);
      snackbar.show(`${params.fileName} has been donwload.`);
    } catch (error) {
      snackbar.show(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    downloadVideo,
  };
};

export default useDownloadFile;
