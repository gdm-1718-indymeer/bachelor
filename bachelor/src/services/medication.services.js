import axios from "axios"

const medicineApi = 'https://api.fda.gov';
const recogniseUrl = 'http://localhost:5000/recognise/'; 

export const getMedicineDetails = async (name) => {
    let data 
    await axios.get(medicineApi + `/drug/label.json?search=${name}`)
    .then(res => {
        console.log(res.data)

      data = res.data.results[0];
    })

    return data
}

export const recognisePicture = async (picture) => {
    let data 
    // const formData = new FormData();
    // formData.append('file',picture)
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     },
    //     mode: 'no-cors'
    // }
    // console.log(formData)
    // await post(recogniseUrl, picture,config)
    // .then(res => {
    //     console.log(res.data)

    //   data = res.data.results[0];
    // })   
    console.log(picture)
    await axios.post(recogniseUrl , {
        method:"POST",
        cache: "no-cache",
        data: picture,
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        })
    .then(res => {
        console.log(res.data)

      data = res.data.results[0];
    })

    return data
}