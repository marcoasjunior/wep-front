import axios from 'axios';
// import { mapActions } from 'vuex'

export default async function uploadUrl(file){
    const fd = new FormData();
    fd.append('photo', file);

    await axios.post(process.env.VUE_APP_UPLOAD_URL + '/upload/image', fd)
    .then(resp => {
        console.log("UPLOAD FEITO")
        return resp.data
    })
}