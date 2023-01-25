import DataCollectionApi from '../../model/dataCollectionApi';
import DataCollection from '../../model/dataCollection';
import { Params } from 'react-router-dom';

export function getDataCollection(
  id: Readonly<Params<string>>
): Promise<DataCollectionApi> {
  //TODO: Adapt to back end
  return fetch(`/api/dataCollection/${id}`).then((response) => response.json());
}

export function getAllDataCollections(): Promise<DataCollectionApi[]> {
  return fetch('/api/dataCollection').then((response) => response.json());
}

export function createDataCollection(
  dataCollectionApi: DataCollectionApi
): Promise<DataCollectionApi> {
  return fetch('/api/dataCollection', {
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
  return fetch(`/api/dataCollection/${dataCollectionApi.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataCollectionApi),
  }).then((response) => response.json());
}

export function getDataCollectionRows(): Promise<any[]> {
  const rows: any[] = [];
  fetch('/api/dataCollection')
    .then((response) => response.json())
    .then((data) => {
      data.json.forEach((dataCollection: DataCollection) => {
        rows.push({
          id: dataCollection.id,
          label: dataCollection.label,
          version: dataCollection.version,
          versionDate: dataCollection.versionDate,
          action: dataCollection,
        });
      });
    });
  return Promise.resolve(rows);
}
