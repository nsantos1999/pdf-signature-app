import {Realm} from '@infra/Realm';
import {useCallback} from 'react';

export function useRepository<T>(repositoryName: string) {
  const getRealm = useCallback(async () => {
    return await Realm.getRealm();
  }, []);

  const create = useCallback(
    async (data: T) => {
      const realm = await getRealm();
      realm.write(() => {
        realm.create<T>(repositoryName, data);
      });
    },
    [repositoryName, getRealm],
  );

  const find = useCallback(async () => {
    const realm = await getRealm();

    return realm.objects<T>(repositoryName);
  }, [repositoryName, getRealm]);

  return {
    create,
    find,
  };
}
