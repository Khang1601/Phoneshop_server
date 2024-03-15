import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



//congif firebase
const firebaseConfig = {
    apiKey: "AIzaSyAR6BvrpowsVvKi1P4ctVJ-pTmoWOfsfFo",
    authDomain: "md5-save-image.firebaseapp.com",
    projectId: "md5-save-image",
    storageBucket: "md5-save-image.appspot.com",
    messagingSenderId: "24598478302",
    appId: "1:24598478302:web:4af99756cfc1866bfbf14f",
    measurementId: "G-9BJ2LBWVFE"
  };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFileToStorage(file:any, folderName:string, bufferData = undefined) {
    console.log("file",file)
    // nếu file là null thì không làm gì hết
    if (!file) {
        return false
    }

    let fileRef:any;
    let metadata:any;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + Math.random() * Date.now() + "."  + file.mimetype.split('/')[1]);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + `${Date.now() * Math.ceil(Math.random())}` + file.originalname);
        metadata = {
            contentType: file.mimetype,
        };
    }
    let url:any;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, file).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }

    return url
}