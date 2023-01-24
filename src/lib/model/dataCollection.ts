import CollectionEvent from './collectionEvents';
export default interface DataCollection {
  id: string;
  agency: string;
  statisticalProgram: string;
  programCycle: string;
  version: number;
  versionDate: string;
  label: any[];
  description: any[];
  collectionEvents?: CollectionEvent[];
}
