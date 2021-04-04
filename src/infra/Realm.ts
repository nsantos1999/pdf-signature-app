import realm from 'realm';
import {SignedPdfSchema} from 'schemas/SignedPdfSchema';

export class Realm {
  static getRealm() {
    return realm.open({
      schemaVersion: 2,
      schema: [SignedPdfSchema],
    });
  }
}
