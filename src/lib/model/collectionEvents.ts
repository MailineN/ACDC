import InstrumentReference from './instrumentReference';
import TypeOfModeOfCollection from './typeOfModeOfCollection';

export default interface CollectionEvent {
  id: string;
  agency: string;
  version: number;
  label: any[];
  description: any[];
  dataCollectionDate: Map<string, string>;
  typeOfModeOfCollection: TypeOfModeOfCollection[];
  instrumentReference: InstrumentReference;
}
