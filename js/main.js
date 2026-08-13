const VERSE_STORAGE_KEY = "verseOfTheDay"

document.querySelector('#verse-btn').addEventListener('click', getVerseOfTheDay)

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

            if(data && data.contents && data.contents.verse){
                localStorage.setItem(VERSE_STORAGE_KEY, JSON.stringify({ date: today, data }))
            }

            renderVerse(data)

        })
        .catch(err =>{
            console.log(`error ${err}`)
        });

}

function renderVerse(data){
    const contents = data && data.contents

    if(!contents || !contents.verse){
        document.querySelector('#verse-text').textContent = "Sorry, today's verse couldn't be loaded."
        return
    }

    document.querySelector('#verse-text').textContent = contents.verse
    document.querySelector('#verse-reference').textContent =
        [contents.book, contents.chapter].filter(Boolean).join(' ')
}
