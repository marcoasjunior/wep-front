import axios from './axios'

export default async function uploadCloudinary(file) {

    const formData = new FormData()

    formData.append('upload_preset', "xxfccfmq")
    formData.append('tags', "unsigned upload, xxfccfmq")
    formData.append('file', file)

    return await axios.post('https://api.cloudinary.com/v1_1/dxblalpv2/upload', formData)
}