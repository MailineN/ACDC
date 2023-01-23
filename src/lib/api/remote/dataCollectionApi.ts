import DataCollection from '../../model/dataCollection';

export function getDataCollection(id: string): Promise<DataCollection> {
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
