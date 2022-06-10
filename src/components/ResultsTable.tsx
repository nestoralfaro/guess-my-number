import { Component } from 'react';
import './ResultsTable.css';

interface ResultsTableProps {
  results: any[];
}

export default class ResultsTable extends Component<ResultsTableProps> {
  render() {
    return (
      <table>
        {
          this.props.results.map(({guess, result}, index) => 
            <tr className={result}>
              <td>{index + 1}.</td>
              <td>{guess}</td>
              <td>
              {
              result.replace(/(^|-)(\w)/g, (a: string, b: string, c: string) => ((b && ' ') + c.toUpperCase()))
              }
              </td>
            </tr>
          )
        }
      </table>
    )
  }
}
