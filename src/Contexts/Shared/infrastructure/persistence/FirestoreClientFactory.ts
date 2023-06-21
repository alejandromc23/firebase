import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from '../../../../../firebase-key.json';

export class FirestoreClientFactory {
    static createClient() {
        initializeApp({
            credential: cert(serviceAccount as ServiceAccount)
        });

        const db = getFirestore();

        return db;
    }
}
