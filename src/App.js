import { useState, useEffect } from 'react'
import './styles/index.css';
import background from "./img/filz.jpg";
import instagram from "./img/Instagram.png";
import SingleCard from './components/SingleCard';
import EmptyFrame from './components/EmptyFrame';

const $ = q => document.querySelector(q)

const cardImages = [

  { "src": "./img/fischli_01.jpg", matched: false },
  { "src": "./img/fischli_02.jpg", matched: false },
  { "src": "./img/fischli_03.jpg", matched: false },
  { "src": "./img/fischli_06.jpg", matched: false },
  { "src": "./img/fischli_05.jpg", matched: false },
  { "src": "./img/fischli_04.jpg", matched: false }
]

function App() {
  const [init, setInit] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [match, setMatch] = useState(0)
  const [scoreTotal, setScoreTotal] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    setInit([])
    $('.card-grid').classList.remove('hide')
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setScoreTotal(0)
    setCards(shuffledCards)
    console.log(cards);
  }

  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    console.log(match)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setMatch(mat => mat + 1);
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setScoreTotal(sco => sco + 1)
    setDisabled(false)
  }



  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <header className="App-header">
        <div className="header">
          <div className="header-inner">
            <h1>fishmemory</h1>

            <div className="highscore">
              <div className="value">{scoreTotal}</div>
              <div className="value"><div className="match">{match}</div> </div>
            </div>
            <button className='button' onClick={shuffleCards}><strong>Play</strong></button>

          </div>
        </div>
        <div className="card-grid">
        {init.map(frame => (
          <EmptyFrame key={Math.random()} />
        ))}
          {cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <div className='score'>
          <a href='https://www.instagram.com/guenther_artist/'><img src={instagram} alt="" width="30px" /></a>
          <a href="https://www.instagram.com/guenther_artist/">&copy; 2023 | Stefan Guenther</a>

          <a href='http://stefan-guenther.net/impressum'>Impressum</a>
        </div>





      </header>
    </div>
  );
}

export default App;
