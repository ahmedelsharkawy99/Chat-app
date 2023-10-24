import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImage = async (
  path: string,
  file: File,
  setProgress?: React.Dispatch<React.SetStateAction<number | undefined>>
): Promise<string> => {
  return new Promise(async (resolve) => {
    try {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress?.(progress);
        },
        (error) => {
          throw error;
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    } catch (error) {
      throw error;
    }
  });
};
