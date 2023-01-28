/* eslint-disable @typescript-eslint/no-unsafe-return */
const nameAppConfigFile = process.env.REACT_APP_NAME_APP_CONFIG_FILE
  ? process.env.REACT_APP_NAME_APP_CONFIG_FILE
  : 'configuration.json';
const getConfigFile = async (): Promise<unknown> => {
  try {
    const config = await fetch(nameAppConfigFile, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response) => {
      console.log(response);
      return response.json();
    });
    return config;
  } catch (err) {
    return console.log('Impossible de récupérer la configuration');
  }
};

export default getConfigFile;
