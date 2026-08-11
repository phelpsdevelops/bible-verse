const VERSE_STORAGE_KEY = "verseOfTheDay"

getVerseOfTheDay()

function getVerseOfTheDay(){

    const today = new Date().toDateString()
    const cached = JSON.parse(localStorage.getItem(VERSE_STORAGE_KEY))

    if(cached && cached.date === today){
        console.log("using cached verse", cached.data)
        renderVerse(cached.data)
        return
    }

    const url=`https://quotes.rest/bible/vod.json?api_key=${API_KEY}`

        fetch(url)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            localStorage.setItem(VERSE_STORAGE_KEY, JSON.stringify({ date: today, data }))
            renderVerse(data)

        })
        .catch(err =>{
            console.log(`error ${err}`)
        });

}

function renderVerse(data){
    document.querySelector('h1').innerText+=" "+
    document.querySelector('h2').innerText
}
