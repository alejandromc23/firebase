import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, DocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';

import serviceAccount from '../firebase-key.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
});

const db = getFirestore();

(async () => {
  const snapshot: QuerySnapshot = await db.collection('users').get();
  snapshot.forEach((doc: DocumentSnapshot) => {
    console.log(doc.id, '=>', doc.data());
  });
})();

