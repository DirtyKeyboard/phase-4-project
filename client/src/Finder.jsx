import React, { useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'

const Beats = () => {
    const RAP = [
        "Eminem",
        "Kendrick Lamar",
        "Lil Wayne",
        "Nas",
        "Jay-Z",
        "Ice Cube",
        "Drake",
        "Tupac",
        "Kanye West",
        "Snoop Dogg",
        "J. Cole",
        "Andre 3000",
        "50 Cent",
        "DMX",
        "21 Savage",
        "Future",
        "Dr. Dre",
        "Rakim",
        "Wu-Tang Clan",
        "Method Man",
        "Pusha T",
        "Busta Rhymes",
        "Gucci Mane",
        "Rick Ross",
        "Pop Smoke",
    ]

    const COUNTRY = [
        "Morgan Wallen",
        "Luke Combs",
        "Chris Stapleton",
        "Walker Hayes",
        "Zach Bryan",
        "Kane Brown",
        "Jason Aldean",
        "Bailey Zimmerman",
        "Cody Johnson",
        "Carrie Underwood",
        "Cole Swindell",
        "Jordan Davis",
        "Jon Pardi",
        "Luke Bryan",
        "Blake Shelton",
        "Gabby Barrett",
        "HARDY",
        "Miranda Lambert",
        "Thomas Rhett",
        "Lee Brice",
        "Sam Hunt",
        "Zac Brown Band",
        "Tim McGraw",
        "Tyler Childers",
        "Dustin Lynch",
    ]

    const RB = [
        "Marvin Gaye",
        "Stevie Wonder",
        "Mary J. Bilge",
        "Whitney Houston",
        "Michael Jackson",
        "Smokey Robinson",
        "Usher",
        "Alicia Keys",
        "Beyonce",
        "Mariah Carey",
        "Lionel Richie",
        "James Brown",
        "Luther Vandross",
        "Diana Ross",
        "AI Green",
        "Sam Cooke",
        "Curtis Mayfield",
        "Barry White",
        "The Weeknd",
        "Prince",
        "Etta James",
        "Jill Scott",
        "Maxwell",
        "Tina Turner",
        "Anita Baker",
    ]

    const EDM = [
        "Tiesto",
        "Skrillex",
        "David Guetta",
        "Marshmello",
        "Calvin Harris",
        "Martin Garrix",
        "The Chainsmokers",
        "Deadmau5",
        "Armin Van Buuren",
        "Hardwell",
        "Avicii",
        "Diplo",
        "Afrojack",
        "Kaskade",
        "Steve Aoki",
        "Alesso",
        "Kygo",
        "Zedd",
        "Daft Punk",
        "Porter Robinson",
        "Alan Walker",
        "DJ Snake",
        "Above & Beyond",
        "Dimitri Vegas & Like Mike",
        "Swedish House Music",
    ]

    const ROCK = [
        "Glass Animals",
        "Imagine Dragons",
        "Zach Bryan",
        "Steve Lacy",
        "Kate Bush",
        "Machine Gun Kelly",
        "Fleetwood Mac",
        "The Beatles",
        "Elton John",
        "Queen",
        "Metallica",
        "Nirvana",
        "Guns N' Roses",
        "Creedence Clearwater Revival",
        "Maneskin",
        "Jelly Roll",
        "Elvis Presley",
        "Red Hot Chili Peppers",
        "Journey",
        "Tom Petty And The Heartbreaker",
        "AC/DC",
        "Arctic Monkeys",
        "Stephen Sanchez",
        "Foo Fighters",
        "The Walters",
    ]

    const LOFI = [
        "Joji",
        "Mac DeMarco",
        "Car Seat Headrest",
        "TV Girl",
        "Keshi",
        "The Microphones",
        "Unknown Mortal Orchestra",
        "Guided By Voices",
        "Beach Fossils",
        "Surf Curse",
        "Real Estate",
        "Best Coast",
        "Teen Suicide",
        "Wavves",
        "Salva Palth",
        "Lofi Fruits Music",
        "Purrple Cat",
        "Mount Eerie",
        "Ariel Pink",
        "John Maus",
        "BoyWithUke",
        "Yot Club",
        "Khai Dreams",
        "Daniel Johnston",
        "SALES",
    ]

    const POP = [
        "Justin Bieber",
        "Adele",
        "Drake",
        "The Weeknd",
        "Taylor Swift",
        "Twenty One Pilots",
        "Selena Gomez",
        "One Direction",
        "Shawn Mendes",
        "Meghan Trainor",
        "Ellie Goulding",
        "Rachel Platten",
        "Fetty Wap",
        "Fall Out Boy",
        "Charlie Puth",
        "Demi Lovato",
        "Ariana Grande",
        "Panic! At the Disco",
        "Ed Sheeran",
        "Alessia Cara",
        "Elle King",
        "Sam Smith",
        "Coldplay",
        "Jason Derulo",
        "Maroon 5",
    ]

    const JAZZ = [
        "Louis Armstrong",
        "Miles Davis",
        "Duke Ellington",
        "John Coltrane",
        "Ella Fitzgerald",
        "Billie Holiday",
        "Charlie Parker",
        "Thelonious Monk",
        "Dizzy Gillespie",
        "Dave Brubeck",
        "Herbie Hancock",
        "Oscar Peterson",
        "Sarah Vaughan",
        "Count Basie",
        "Stan Getz",
        "Charles Mingus",
        "Art Blakey",
        "Chick Corea",
        "Wes Montgomery",
        "Ella Fitzgerald",
        "Chet Baker",
        "Sonny Rollins",
        "Ahmad Jamal",
        "Coleman Hawkins",
        "Clifford Brown",
    ]
    const [curSong, setCurSong] = useState(null)
    const [disabledButton, setDisabledButton] = useState(false)

    async function getSong() {
        //RAP, COUNTRY, RB, EDM, ROCK, LOFI, POP, JAZZ
        const r = await axios.get('/api/check_session')
        const userGenre = r.data.genre.name.toLowerCase()
        let artistToSearch = ""
        const rand = Math.floor(Math.random() * 25);
        console.log(userGenre)
        switch (userGenre) {
            case "rap": artistToSearch = RAP[rand]; break;
            case "country": artistToSearch = COUNTRY[rand]; break;
            case "r&b": artistToSearch = RB[rand]; break;
            case "edm": artistToSearch = EDM[rand]; break;
            case "rock": artistToSearch = ROCK[rand]; break;
            case "lo-fi": artistToSearch = LOFI[rand]; break;
            case "pop": artistToSearch = POP[rand]; break;
            case "jazz": artistToSearch = JAZZ[rand]; break;
        }
        const options = {
            method: 'GET',
            url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
            params: { q: artistToSearch },
            headers: {
                'X-RapidAPI-Key': '9e0c0ccf07msh5034fcd9c9e8340p12555cjsn516087d377c1',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const rand = Math.floor(Math.random() * response.data.data.length);
            const song = response.data.data[rand]
            setCurSong(song)
            setDisabledButton(false)
        } catch (error) {
            console.error(error);
        }
    }
    async function addCurSongToUserSongs() {
        setDisabledButton(true)
        const r = await axios.post('/api/add_song', {
            title: curSong.title,
            artist : curSong.artist.name,
            album: curSong.album.title,
            link: curSong.link,
            album_cover: curSong.album.cover
        })
    }
    return (
        <>
            <NavBar />
            <div className="container">
                <h1 className="text-white text-6xl">Beat Finder</h1>
                <button className='btn-default mt-8' onClick={getSong}>Find A Song!</button>
                {curSong ? 
                <div className='flex items-center gap-4 flex-col mt-12'>
                    <iframe title="Song Widget"
                    src={`https://widget.deezer.com/widget/dark/track/${curSong.link.substring(curSong.link.lastIndexOf('/')+1)}`}
                    width="400px"
                    height="400px"
                    allowtransparency="true"
                    allow="encrypted-media; clipboard-write" />
                    <button className='btn-default' onClick={addCurSongToUserSongs} disabled={disabledButton}>Add To My Beats</button>
                </div>
                :
                null
                }
                    

            </div>
        </>
    )
}

export default Beats