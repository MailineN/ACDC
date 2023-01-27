import InstrumentReference from './instrumentReference';
import TypeOfModeOfCollection from './typeOfModeOfCollection';

export default interface CollectionEvent {
  id: string;
  agency: string;
  version: number;
  collectionEventName: Record<'fr-FR' | 'en-IE' | string, string>;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  description: Record<'fr-FR' | 'en-IE' | string, string>;
  dataCollectionDate: Map<string, string>;
  typeOfModeOfCollection: TypeOfModeOfCollection[];
  instrumentReference: InstrumentReference;
}
