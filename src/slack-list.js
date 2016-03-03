import Inferno from 'inferno';
import { Component } from 'inferno-component';
import Item from './item';
import includes from 'lodash.includes';

export default class SlackList extends Component {
  constructor(props) {
    super(props);
    this.state = { teams: [], search: '' };
  }

  componentDidMount() {
    console.log('a')
    fetch('/slack-list-ja/teams.json')
      .then(res => res.json())
      .then(teams => this.setState({ teams }))
      .catch(e => console.log('parsing failed', e));
  }

  onKeyDown({ target: { value } }) {
    this.setState({ search: value });
  }

  renderItems() {
    console.log(this.state.teams.length)
    return this.state.teams.map(team => {
      if (!JSON.stringify(team).match(new RegExp(this.state.search))) return <span />;
      return (
        <div className="column">
          <Item
             name={ team.name }
             url={ team.url }
             description={ team.description }
             tag={ team.tag }
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <section className="hero animated fadeIn">
          <div className="hero-content">
            <div className="container">
              <h1 className="title">
                <img src="./logo.png" className="logo" />
              </h1>
              <h2 className="subtitle">
                A handpicked selection of top Slack communities in japan
              </h2>
              <p className="control">
                <input
                   onKeyDown={ ::this.onKeyDown }
                   className="input is-medium"
                   type="text"
                   placeholder="Find a team" />
              </p>
            </div>
          </div>
        </section>
        <div className="items">
          <div className="columns is-multiline ">
            { this.renderItems() }
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="content is-centered">
              <p>
                Created by <strong>bokuweb</strong>. inspired <a href="http://www.slacklist.info/">slack list</a>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
