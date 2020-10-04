import { Instance } from '../types/Api';
import { useState, useEffect } from 'react';
import fetchInvidiousInstances from '../utils/fetchInvidiousInstances';
import { actions } from '../store';
import callApi from '../utils/callApi';
import fetchPlaylists from '../utils/fetchPlaylists';
import { useTranslation } from 'react-i18next';
import stripTrailingSlash from '../utils/stripTrailingSlash';
import useStore from './useStore';

interface UseInvidiousInstancesHook {
  instances: Instance[];
  setInvidiousInstance: (instance: string, callback?: any) => Promise<void>;
  loading: boolean;
}

const useInvidiousInstances = (): UseInvidiousInstancesHook => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { t } = useTranslation();
  const store = useStore();

  const setInvidiousInstance = async (
    instance: string,
    callback?: () => any
  ): Promise<void> => {
    setSubmitLoading(true);

    try {
      await actions.setInstance(stripTrailingSlash(instance));

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.Preferences
        });
        actions.clearData();
        await fetchPlaylists();
      }

      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: t('flashMessage.invidiousInstanceUpdated')
          }),
        500
      );
    } catch (error) {
      console.log(error);

      if (!store.logoutMode) {
        actions.clearData();
      }

      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: t('flashMessage.invidiousInstanceTokenUpdated')
          }),
        500
      );
    } finally {
      if (callback) {
        callback();
      }
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchInvidiousInstances().then((instances) => {
      setInstances(instances);
      setLoading(false);
    });
  }, []);

  return {
    instances,
    setInvidiousInstance,
    loading
  };
};

export default useInvidiousInstances;
