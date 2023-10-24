import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  where,
  query,
  getDocs,
  DocumentData,
  updateDoc,
  UpdateData,
  onSnapshot,
  getDoc,
  DocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";

export const search = async (
  path: string,
  searchParam: string,
  serachData: string,
  setState: React.Dispatch<React.SetStateAction<DocumentData | null>>
) => {
  try {
    const collectionData = collection(db, path);
    const q = query(collectionData, where(searchParam, "==", serachData));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setState(doc.data());
    });
  } catch (error) {
    throw error;
  }
};

export const updateData = async (
  path: string,
  userId: string,
  updatedData: UpdateData<DocumentData>
) => {
  try {
    const docRef = doc(db, path, userId);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    throw error;
  }
};

export const getRealTimeData = async (
  path: string,
  identifire: string,
  setData: React.Dispatch<React.SetStateAction<DocumentData | DocumentData[]>>
) => {
  const docRef = doc(db, path, identifire);
  const unsub = onSnapshot(docRef, (doc) => {
    doc.exists() && setData(doc.data());
  });

  return () => {
    unsub();
  };
};

export const getData = async (
  path: string,
  identifire: string
): Promise<DocumentSnapshot<DocumentData, DocumentData>> => {
  try {
    const docRef = doc(db, path, identifire);
    const res = await getDoc(docRef);

    return res;
  } catch (error) {
    throw error;
  }
};

export const setData = async (
  path: string,
  identifire: string,
  data: WithFieldValue<DocumentData>
): Promise<void> => {
  try {
    const docRef = doc(db, path, identifire);
    await setDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};
