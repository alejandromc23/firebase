import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from '../../../firebase-key.json';

class FirestoreClientFactory {
    static createClient() {
        initializeApp({
            credential: cert(serviceAccount as ServiceAccount)
        });

        const db = getFirestore();

        return db;
    }
}

export default {
    firestore: FirestoreClientFactory.createClient
};
