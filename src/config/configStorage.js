import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

const storage = getStorage();

export async function uploadImageAsync(uri, userId) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), `photoPerfil/${userId}`);
  const result = await uploadBytes(fileRef, blob);
  const photoURL = await getDownloadURL(fileRef);
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    photoURL: photoURL
  })

  // We're done with the blob, close and release it
  // // blob.close();
  return await getDownloadURL(fileRef);
}

export async function uploadImagePost(uri, userId) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  let filename = userId.substring(userId.lastIndexOf('/') + 1);
  const extension = filename.split('.').pop();
  const name = filename.split('.').slice(0, -1).join('.');
  filename = name + Date.now() + '.' + extension

  const fileRef = ref(getStorage(), `postImage/${filename}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  // // blob.close();
  return await getDownloadURL(fileRef);
}