import ModeOfCollection from './modeOfCollection';
import InstrumentReference from './instrumentReference';

export default interface CollectionEvent {
  agency: string;
  version: number;
  versionDate: string;
  label: Map<string, string>;
  dataCollectionDate: Map<string, string>;
  modeOfCollection: ModeOfCollection[];
  instrumentReference: InstrumentReference[];
}
