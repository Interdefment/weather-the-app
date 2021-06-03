import {
	collection,
  doc,
	getDocs,
	Query,
	DocumentSnapshot,
	QuerySnapshot,
	DocumentReference,
	onSnapshot,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../config.firebase';
import { dataFromSnapshot } from '../helpers/firebase';
import { Entity, User } from '../types';

export const getSnapshot = async () => {
	const querySnapshot = await getDocs<User>(collection(db, 'users'));
	querySnapshot.forEach((doc) => {});
};

const getDocReference = (collection: string, id: string) => {
  return doc(db, collection, id);
}

const getCollectionReference = (collection: string, id: string) => {
  return doc(db, collection, id);
}

interface FirebaseHookHandlers {
	subscribe?: () => void;
	error?: (error: Error) => void;
	unsubscribe?: () => void;
}

interface CollectionHandlers<T> extends FirebaseHookHandlers {
	data: (data: Entity<T>[]) => void;
}

interface DocHandlers<T> extends FirebaseHookHandlers {
	data: (data: Entity<T> | undefined) => void;
}

export const useDoc = <T>(
	getDocReference: () => DocumentReference,
	handlers?: DocHandlers<T>,
	deps?: any[]
): void => {
	useEffect(() => {
		if (handlers?.subscribe) {
			handlers.subscribe();
		}
		const unsubscribeFromDoc = onSnapshot<T>(getDocReference(), (doc) => {
			console.log(`${doc.id} =>`, doc.data());
		});

		return () => {
      if (handlers?.unsubscribe) {
        handlers.unsubscribe();
      }
			unsubscribeFromDoc();
		};
	}, [getDocReference, handlers, deps?.join()]);
};

export const useCollection = <T>(
  query: () => Query,
  handlers: CollectionHandlers<T>,
  deps: any[],
): void => {
  useEffect(() => {
		if (handlers?.subscribe) {
			handlers.subscribe();
		}
    const unsubscribeFromQuery = onSnapshot(
      query(),
      (snapshot: QuerySnapshot) => {
        const docs: Entity<T>[] = snapshot.docs
          .map((doc) => dataFromSnapshot<T>(doc))
          .filter((item) => item !== undefined && item !== null);
        handlers.data(docs);
      },
      (error: Error) => {
        if (handlers?.error) {
          handlers.error(error);
        }
      }
    );
    return () => {
      if (handlers?.unsubscribe) {
        handlers.unsubscribe();
      }
      unsubscribeFromQuery();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
