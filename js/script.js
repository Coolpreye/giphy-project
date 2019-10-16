const seeGif = document.querySelector('#search-form'),
        message = document.querySelector('.message'),
        gifDiv = document.querySelector('.gifs');

const displayGif = e => {
    e.preventDefault();
    removeGifs();
    showGifs();
}

showGifs = () => {
    let searchWord = document.querySelector('#word').value;
    
    if(searchWord === '') {
        message.textContent = `Please put in a word for Gifs`;
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);    
    } else {
        gifApi(searchWord)
            .then(res => {
                const gifs = res.res.data;
                gifsTemplate(gifs);
            })
            .catch(() => {
                message.textContent = `Gifs not found for this word`;
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 5000);
            })
    }
}

removeGifs = e => {
    gifDiv.innerHTML = '';
}

gifApi = async searchWord => {
    const url = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=F2nkr1uCdbH60A6ZfTfm9FLFIrXZQaLf&q=${searchWord}&limit=5&offset=0&rating=G&lang=en`);
    const res = await url.json();
    return {
        res
    }
}

gifsTemplate = gifs => {
    gifs.map(gif => {
        const image = document.createElement('img');
        image.classList.add('responsive-img');
        image.src = gif.images.original.url;
        gifContainer(image);
    })
}

gifContainer = gif => {
    const gifCon = document.createElement('div');
    gifCon.classList.add('col', 's12', 'l3', 'gif-image');
    gifCon.appendChild(gif);
    gifDiv.appendChild(gifCon);
}

seeGif.addEventListener('submit', displayGif);

