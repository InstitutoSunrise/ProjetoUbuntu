import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
const storage = getStorage();

// export async function upload(file, currentUser) {
//     const fileRef = ref(storage, currentUser.uid + '.png');
    
//     const snapshot = await uploadBytes(fileRef, file);
//     const photoURL = await getDownloadURL(fileRef);
  
//     updateProfile(currentUser, {photoURL});

//     alert("Uploaded file!");
//   }
  
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
  
    const fileRef = ref(getStorage(), userId);
    const result = await uploadBytes(fileRef, blob);
    const photoURL = getDownloadURL(fileRef); 
  
    console.log(photoURL.result);
    const [urlImgPerfil, setUrilImgPerfil ] = useState(photoURL.result);
    // setUrilImgPerfil(photoURL.result)
    console.log(urlImgPerfil)
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      photoURL: urlImgPerfil
      //   photoURL: uploadedImageLink
    })
    
    // We're done with the blob, close and release it
    // // blob.close();
    // updateProfile(auth.currentUser, {
    //   photoURL: uploadedImageLink
    // })
    return await getDownloadURL(fileRef);
  }