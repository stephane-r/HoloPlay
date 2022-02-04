import AsyncStorage from "@react-native-community/async-storage";

interface Args {
  url: string;
  method?: "POST" | "GET" | "DELETE" | "PATCH";
  body?: {
    [key: string]: string;
  };
  customToken: string;
}

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const callApi = async ({
  url,
  method,
  body,
  customToken,
}: Args): Promise<any> => {
  const [instance, token, logoutMode] = await Promise.all([
    AsyncStorage.getItem("instance"),
    AsyncStorage.getItem("token"),
    AsyncStorage.getItem("logoutMode"),
  ]);

  const params: any = {
    method: method ?? "GET",
    headers: DEFAULT_HEADERS,
  };

  if (!JSON.parse(logoutMode) || customToken) {
    params.headers = {
      ...params.headers,
      Authorization: `Bearer ${token || customToken}`,
    };
  }

  if (body) {
    params.body = JSON.stringify(body);
  }

  if (__DEV__) {
    console.log(
      `${params.method} - ${instance?.replace(/"/g, "")}/api/v1/${url}`
    );
  }

  const request = await fetch(
    `${instance?.replace(/"/g, "")}/api/v1/${url}`,
    params
  );
  const response = await request.json();

  if (
    response.error ||
    (response.statusCode >= 400 && response.statusCode < 500)
  ) {
    throw Error(response.error || response);
  }

  return response;
};

export default callApi;
