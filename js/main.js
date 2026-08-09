
getVerseOfTheDay()

 function getVerseOfTheDay(){
  
    
    const url=`https://quotes.rest/bible/vod.json?api_key=${API_KEY}`

        fetch(url)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            

        })
        .catch(err =>{
            console.log(`error ${err}`)
        });

}
