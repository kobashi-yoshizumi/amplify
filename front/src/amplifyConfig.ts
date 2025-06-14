const amplifyConfig = {
  Auth: {
    Cognito: {
      region: "ap-northeast-1",
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    },
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_APP_SYNC_URL,
      region: "ap-northeast-1",
      defaultAuthMode: GraphQLAuthMode.AMAZON_COGNITO_USER_POOLS,
    },
  },
};

export default amplifyConfig;
