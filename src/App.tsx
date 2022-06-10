import { Component, SetStateAction } from 'react';
import './App.css';
import GuessForm from './components/GuessForm';
import MaxAttemptSwitch from './components/MaxAttemptSwitch';
import NewGame from './components/NewGame';
import ResultsTable from './components/ResultsTable';
import WinResults from './components/WinResults';

export enum GameState {
  New,
  Playing,
  Over,
  Won,
}

interface AppProps {
}

export interface AppState {
  minRandomNumber: string;
  maxRandomNumber: string;
  secret: string;
  results: Array<any>;
  gameIs: GameState;
  guess: string;
  guessCounter: number;
  maxAttempts: number | string;
  limitAttempts: boolean;
}

export default class App extends Component<AppProps, AppState> {
  
  state = {
    minRandomNumber: '1',
    maxRandomNumber: '100',
    secret: '',
    results: [],
    gameIs: GameState.New,
    guess: '',
    guessCounter: 0,
    maxAttempts: 'inf',
    limitAttempts: true
  };

  getRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getResult = (guess: string) => {
    if (!isNaN(parseFloat(this.state.maxAttempts)) && this.state.guessCounter >= parseFloat(this.state.maxAttempts)) {
      return parseFloat(guess) == parseFloat(this.state.secret) ? 'correct' : 'lost';
    }
    if (parseFloat(guess) > parseFloat(this.state.secret)) {
      return 'too-high';
    } else if (parseFloat(guess) < parseFloat(this.state.secret)) {
      return 'too-low';
    } else {
      return 'correct';
    }
}
  handleStart = (max: string, maxTrials?: string) => this.setState(
      {
        maxRandomNumber: max,
        secret: (this.getRandomNumber(parseFloat(this.state.minRandomNumber), parseFloat(max))).toString(),
        results: [],
        gameIs: GameState.Playing,
        guess: '',
        guessCounter: 0,
        maxAttempts: maxTrials || this.state.maxAttempts,
      }
    ); 
  handleGuessChange = (guess: string) => this.setState(
      {
        guess: guess,
        results: [...this.state.results, {guess: guess, result: this.getResult(guess)}],
        guessCounter: ++this.state.guessCounter,
        gameIs: this.getResult(guess) == 'correct' ? GameState.Won : (this.getResult(guess) == 'lost' ? GameState.Over : GameState.Playing),
      }, () => console.log(this.state.gameIs)
    );

  handleGameState = (gameIs: GameState) => this.setState ({
    gameIs: gameIs,
  })

  handleLimitAttempt = () => this.setState ({limitAttempts: !this.state.limitAttempts});

  render() {
    let guessesLeft = parseFloat(this.state.maxAttempts) - this.state.guessCounter;
    return (
      <div className="App">
        {
          this.state.gameIs == GameState.New ? (
            <>            
              <MaxAttemptSwitch setMaxAttempts={this.handleLimitAttempt}/>
              <NewGame
                maxRandomNumber={this.state.maxRandomNumber}
                maxAttempts={this.state.limitAttempts}
                startGame={this.handleStart}
              />
            </>

          ) : (
            (this.state.gameIs == GameState.Playing) ? (
              <>
                {
                  !isNaN(parseFloat(this.state.maxAttempts)) && (
                    <p className={`guesses-left ${guessesLeft}`}>
                      <span className={

                        `counter ${
                          (guessesLeft >= 10 ? (
                            'green-counter'
                          ) : (
                            guessesLeft > 3 ? 'yellow-counter' : 'red-counter'
                          ))
                        }`
                        
                        }>{guessesLeft}</span> guesses left</p>
                    // <div className='guesses-left'>You've got {parseFloat(this.state.maxTrials) - this.state.guessCounter} guesses left!</div>
                  )
                }
                <GuessForm guess={this.state.guess}
                minRandomNumber={this.state.minRandomNumber}
                maxRandomNumber={this.state.maxRandomNumber} setGuess={this.handleGuessChange}/>
                <br/>
                <ResultsTable results={this.state.results}/>
              </>
            ) : (
              <>
                <WinResults
                setGameState={this.handleGameState}
                totalGuesses={this.state.guessCounter}
                gameState={this.state.gameIs}
                secret={this.state.secret}
                />
                <br/>
                <ResultsTable results={this.state.results}/>
              </>
            )
          )
        }
      </div>
    );
  }
}