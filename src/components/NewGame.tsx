import { Component } from 'react'
import { bind } from './utils';
import './NewGame.css';

interface NewGameState {
  maxRandomNumber: string;
  maxAttempts: string;
  validInput: boolean;
}

interface NewGameProps {
  maxRandomNumber: string;
  maxAttempts?: boolean; 
  startGame: (max: string, maxAttempts?: string) => void;
}

export default class NewGame extends Component <NewGameProps, NewGameState>{

  state = {
    maxRandomNumber: this.props.maxRandomNumber,
    maxAttempts: 'inf',
    validInput: true,
  };

  validateInput = () => (this.state.maxRandomNumber.match(/^\d+$/) && (parseFloat(this.state.maxRandomNumber) >= 10 && parseFloat(this.state.maxRandomNumber) <= 1000000))
  ? this.setState({validInput: true}, () => this.props.startGame(this.state.maxRandomNumber, this.state.maxAttempts))
  : this.setState({validInput: false})

  render() {
    return (
      <form 
          onSubmit={(e) => {
              e.preventDefault();
              this.setState({validInput: this.state.validInput}, this.validateInput);
          }
        }
        className='new-game'
      >
          Maximum Possible Guess:
        <input
          type="text"
          {...bind(this, 'maxRandomNumber')}
          autoFocus
        />

        {
          this.props.maxAttempts && (
            <>
              <br />
              Maximum Attempts:
              <input
                type="text"
                {...bind(this, 'maxAttempts')}
              />
              <br />
            </>
          )
        }
        <div hidden={this.state.validInput} className='error'>
          Maximum must be between 10 and 1,000,000
        </div>
        <button
          type="submit"
        > 
          New Game
        </button>
      </form>
    )
  }
}