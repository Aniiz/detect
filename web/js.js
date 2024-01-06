const fileSelector = document.getElementById("file-selector");
const send = document.getElementById("send");
const myDiv = document.getElementById('my-div');
const url = 'http://127.0.0.1:5000/';
// const url = 'https://homo-srv-cicatribio-ia-rec.herokuapp.com/';
// const url = 'https://recognition-app-fw7ua.ondigitalocean.app/'
//request
send.addEventListener('click', async (event) => {
    event.preventDefault();
    const img = fileSelector.files[0];
    const b64Image = await tob64(img);
    const resp = await imgPost(b64Image);
    console.log(resp)
    const imgSrc = 'data:image/jpeg;base64,' + resp.imgPred
    myDiv.innerHTML = `<img class="img" src="${imgSrc}">`;
});

//to B64
tob64 = async (file) => {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64 = reader.result.split(",")[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


imgPost = async (b64Img) => {
    const resp = await fetch(`${url}detImg`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: b64Img })
    });
    const data = await resp.json();
    return data;
};
