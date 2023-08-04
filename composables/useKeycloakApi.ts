import { Group } from 'types/groups.model';
import { UserInfo } from 'types/userInfo.model';

export const useKeycloakApi = () => {
  const config = useRuntimeConfig();

  const fetchKeycloak = <T>(url: string) => {
    const { data } = useAuth();

    const accessToken = (data.value?.user as any)?.access_token as
      | string
      | undefined;
    return useFetch<T>(url, {
      // server: false,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + accessToken,
      },
    });
  };

  const fetchUserInfo = () =>
    fetchKeycloak<UserInfo>(
      `${config.public.AUTH_ISSUER}/protocol/openid-connect/userinfo`
    );

  const fetchUserGroups = async (userId: string) =>
    fetchKeycloak<Group[]>(
      `${config.public.KEYCLOAK_ADMIN_API}/users/${userId}/groups`
    );

  const fetchGroups = async (groupId: string) =>
    fetchKeycloak<Group>(
      `${config.public.KEYCLOAK_ADMIN_API}/groups/${groupId}`
    );

  // const fetchUserGroups = (userId: string) =>
  //   useAsyncData(`user:${userId}:groups`, () => {
  //     const headers = getHeaders();
  //     return $fetch<Group[]>(`/api/user/${userId}/groups`, {
  //       headers,
  //     });
  //   });

  // const canUserViewGroups = (user: UserInfo) =>
  //   user.resource_access?.account?.roles?.includes('view-groups') ?? false;

  // const getUserInfo = () => {
  //   if (store.userInfo) return store.userInfo;

  //   return useAsyncData('userInfo', async () => {
  //     const data = await fetchUserInfo();
  //     store.userInfo = data;
  //     return data;
  //   });
  // };

  // const getUserGroups = async () => {
  //   const userId = store.userId;
  //   if (!userId) {
  //     console.error('no user id');
  //     return;
  //   }

  //   return useAsyncData(`user:${userId}:groups`, async () => {
  //     const data = await fetchUserGroups(userId);
  //     return data;
  //   });
  // };

  return { fetchUserInfo, fetchUserGroups, fetchGroups };
};
