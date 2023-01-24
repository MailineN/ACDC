import DataCollection from '../../model/dataCollection';
import { Params } from 'react-router-dom';

export function getDataCollection(
  id: Readonly<Params<string>>
): Promise<DataCollection> {
  //TODO: Adapt to back end
  return fetch(`/api/dataCollection/${id}`).then((response) => response.json());
}

export function getAllDataCollections(): Promise<DataCollection[]> {
  return fetch('/api/dataCollection').then((response) => response.json());
}

export function createDataCollection(
  dataCollection: DataCollection
): Promise<DataCollection> {
  return fetch('/api/dataCollection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataCollection),
  }).then((response) => response.json());
}

export function updateDataCollection(
  dataCollection: DataCollection
): Promise<DataCollection> {
  return fetch(`/api/dataCollection/${dataCollection.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataCollection),
  }).then((response) => response.json());
}

export function getDataCollectionRows(id: string): Promise<any[]> {
  const rows: any[] = [];
  fetch('/api/dataCollection')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((dataCollection: DataCollection) => {
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
