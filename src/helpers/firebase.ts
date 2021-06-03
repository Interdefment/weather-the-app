import { DocumentSnapshot, QueryDocumentSnapshot } from "@firebase/firestore";

export const dataFromSnapshot = <T>(
  snapshot: QueryDocumentSnapshot | DocumentSnapshot
): any | undefined => {
  if (!snapshot.exists) {
    return undefined;
  }

  const data = snapshot.data() as T;
  return {
    data,
    id: snapshot.id,
  };
};

