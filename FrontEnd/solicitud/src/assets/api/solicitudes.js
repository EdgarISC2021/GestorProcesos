import axios from 'axios'

const solicitidesApi = axios.create({
    baseURL : "http://127.0.0.1:8000/api/solicitudes/"

})

export const getSolicitudes = () => solicitidesApi.get()
export const updateSolicitudStatus = () => solicitidesApi.put()