import DataCollectionApi from '../../model/dataCollectionApi';
import DataCollection from '../../model/dataCollection';
import { Params } from 'react-router-dom';

export function getDataCollection(
  id: Readonly<Params<string>>
): Promise<DataCollectionApi> {
  return fetch(
    import.meta.env.VITE_API_BASE_URL + `api/data-collections/${id}`
  ).then((response) => response.json());
}

export async function getAllDataCollections(): Promise<DataCollectionApi[]> {
  const res = await fetch(
    import.meta.env.VITE_API_BASE_URL + 'api/data-collections'
  );
  return res.json();
}

export function createDataCollection(
  dataCollectionApi: DataCollectionApi
): Promise<DataCollectionApi> {
  return fetch(import.meta.env.VITE_API_BASE_URL + 'api/data-collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataCollectionApi),
  }).then((response) => response.json());
}

export function updateDataCollection(
  dataCollectionApi: DataCollectionApi
): Promise<DataCollectionApi> {
  return fetch(
    import.meta.env.VITE_API_BASE_URL +
      `api/data-collections/${dataCollectionApi.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataCollectionApi),
    }
  ).then((response) => response.json());
}

export async function getDataCollectionRows(): Promise<any[]> {
  let rows: any[] = [];
  fetch(import.meta.env.VITE_API_BASE_URL + 'api/data-collections').then(
    async (response) => {
      const data: DataCollectionApi[] = await response.json();
      data.forEach((dataCollectionApi: DataCollectionApi) => {
        const dataCollection: DataCollection = dataCollectionApi.json;
        rows = [
          ...rows,
          {
            id: dataCollection.id,
            label: dataCollection.label,
            version: dataCollection.version,
            versionDate: dataCollection.versionDate,
            action: dataCollection,
          },
        ];
        console.log(rows);
      });
    }
  );
  return rows;
}
