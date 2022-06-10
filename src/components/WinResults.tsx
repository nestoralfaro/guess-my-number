import { Component } from 'react';
import { GameState } from '../App';
import './WinResults.css';

interface WinResultsProps {
  totalGuesses: number;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  secret?: string;
}

interface WinResultsState {
  gameIs: GameState;
}

export default class WinResults extends Component <WinResultsProps, WinResultsState> {
  state = {
    gameIs: this.props.gameState,
  }

  setGameState = () => this.setState({gameIs: GameState.New}, () => this.props.setGameState(this.state.gameIs))

  render() {
    return (
      <form
      onSubmit={(e) => {
        e.preventDefault();
        this.setState({gameIs: this.state.gameIs}, this.setGameState);
      }}
      className='win-results'
      >
        {this.props.gameState == GameState.Won ? (
          <p className='won-game'>You won in {this.props.totalGuesses} guesses!</p>

        ) : (
          <div className='lost-game'>
            <p>You lost :(</p>
            <p>The number was {this.props.secret}</p>
          </div>
        )}
        <button type="submit" autoFocus>Play again</button>
      </form>
    )
  }
}
