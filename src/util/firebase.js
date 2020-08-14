import firebase, { storage } from 'firebase';

export default async function uploadImageToFirebase(file){
    
    const storageImage = firebase.storage().ref(`${file.name}`).put(file)
    storageImage.on(`state_changed`, snapshot => {
        // let uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(snapshot)
    },  
    error => {console.log(error.message)},
    ()=> { storageImage.snapshot.ref.getDownloadURL().then((url) => { return url }) })

}