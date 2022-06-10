import { Component } from 'react'
import { bind } from './utils';
import './GuessForm.css';

interface GuessFormState {
  guess: string;
  validInput: boolean;
}

interface GuessFormProps {
  guess: string;
  minRandomNumber: string;
  maxRandomNumber: string;
  setGuess: (maxRandomNumber: string) => void;
}

export default class GuessForm extends Component <GuessFormProps, GuessFormState>{
  
  state = {
    guess: this.props.guess,
    validInput: true,
  }

  validateInput = () => (this.state.guess.match(/^\d+$/))
  ? this.setState({validInput: true}, () => {this.props.setGuess(this.state.guess); this.setState({guess: ''})})
  : this.setState({validInput: false})

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({validInput: this.state.validInput}, this.validateInput);
        }
      }
      className='guess-form'
      >
          Guess a number between {this.props.minRandomNumber} and {this.props.maxRandomNumber}:
          <input
            type="text"
            {...bind(this, 'guess')}
            autoFocus
          />
          <div hidden={this.state.validInput} className='error'>
            Enter a valid number
          </div>
          <button type="submit">Guess</button>
      </form>
    )
  }
}
