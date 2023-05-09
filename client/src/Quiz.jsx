import React, {useState} from 'react'

const Quiz = () => {
    const questions = ["Which of the following best describes the type of music you listen to?",
                        "Which of these acvitities best first your music?", 
                        "How would you describe the singers in your music?", 
                        "How would someone else describe your music?",
                        "Pick your favorite out of these artists",
                        "Pick your favorite song",
                        "",
                        "",
                        "",
                        ""]
// 1	Rap XXXX
// 2	Country XXXX
// 3	R&B XXXX
// 4	EDM XXXX
// 5	Rock XXXX
// 6	Lo-fi XXXX
    const answers = [
        [
            "Heavy Hitting", "Relaxing", "Radio Music", "Trap"
        ],
        [
            "Working Out", "Sleeping", "Dancing At A Club", "Working On A Farm"
        ],
        [
            "What Singers?", "Autotuned And Upbeat", "Slow And Clear", "Rhythmic"
        ],
        [
            "Background Music", "Angry", "Meaningful", "Radio Music"
        ],
        [
            "Drake", "Luke Bryan", "The Weeknd", "Marshmello"
        ],
        [
            "Bubbly - Young Thug", "KAIVON - All I Wanted", "3 Days Grace - Never Too Late", "Lilac - Honey and Lemon"
        ],
        [
            "", "", "", ""
        ],
        [
            "", "", "", ""
        ],
        [
            "", "", "", ""
        ],
        [
            "", "", "", ""
        ]
    ]
    const completed = []
    const [question, setQuestion] = useState(questions[0])
    const curQ = questions.indexOf(question)+1
    const questionClass = 'border rounded text-white w-80 h-40 hover:bg-white hover:text-black transition hover:font-bold duration-150 ease-in-out';
    function handleClick(e) {
        completed.push(e.target.innerText)
        setQuestion(questions[curQ])
    }
    
    return (
        <div className='flex items-center mt-12 flex-col gap-10'>
            <h1 className='text-white text-6xl'>Quiz</h1>
            <h1 className='text-white text-4xl'>Question {curQ}</h1>
            <h1 className='text-white text-4xl'>{question}</h1>
            <div className='flex justify-center gap-4 flex-wrap w-[50vw]'>
                <button className={questionClass} onClick={handleClick}>{answers[curQ-1][0]}</button>
                <button className={questionClass} onClick={handleClick}>{answers[curQ-1][1]}</button>
                <button className={questionClass} onClick={handleClick}>{answers[curQ-1][2]}</button>
                <button className={questionClass} onClick={handleClick}>{answers[curQ-1][3]}</button>
            </div>
        </div>
        )
}

export default Quiz