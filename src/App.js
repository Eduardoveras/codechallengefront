import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './components/info_modal'
import axios from "axios";
import moment from 'moment';
import parse from 'parse-link-header';

class App extends Component {
    constructor(props) {
        super(props);
        let host=''
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        {
            host = 'http://localhost:3000';
        }
        else {
            host= 'http://codechallengebackend.herokuapp.com'
        }
        this.state = {
            value: '',
            host: host,
            possible_values: ['Loading...'],
            tweets: null,
            current_topic_id: null,
            current_page:1,
            parsed_link_header: {
                first: null,
                last: null,
                next: null,
                prev: null,
            },

        };

        this.change = this.change.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        axios.get(this.state.host+`/topics`)
            .then(res => {
                console.log(res.data);
                this.setState({possible_values: res.data});
            });

    }

    change(event) {
        this.setState({value: event.target.value});
        this.getTweetsForId(event.target.value);

    }

    nextPage() {
        this.setState({
            current_page: parseInt(this.state.parsed_link_header.next.page)
            },
            this.getTweetsForId(this.state.value)
        );
        console.log("page changed")
    }

    previousPage() {
        this.setState({
            current_page: parseInt(this.state.parsed_link_header.prev.page)
        },
        this.getTweetsForId(this.state.value)
        );
        console.log("page changed")
    }

    getTweetsForId(id) {
        console.log(`${this.state.host}/social_media_posts?topic_id=${id}&page=${this.state.current_page}`);
        axios.get(`${this.state.host}/social_media_posts?topic_id=${id}&page=${this.state.current_page}`)
            .then(res => {
                this.setState({
                    tweets: res.data,
                    parsed_link_header: parse(res.headers.link)
                },
                    function() { console.log("setState completed", this.state)} );
            });

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Twitter Scanner</h1>
                </header>
                <div className="container">
                    <p className="App-intro">
                        Select the topic from the list to show tweets.
                        <p/>
                        <button type="button" className="btn btn-light" data-toggle="modal"
                                data-target="#exampleModal">
                            Read me
                        </button>
                        <select id="lang" className="custom-select custom-select-lg mb-3" onChange={this.change}
                                value={this.state.value}>
                            <option value="select">Select</option>
                            {this.state.possible_values ? this.state.possible_values.map(function (item) {
                                return (<option value={item[0]}>{item[1]}</option>)
                            }) : ''}
                        </select>
                        <button type="button" onClick={this.previousPage} className="btn btn-primary"
                                disabled={this.state.parsed_link_header.prev == null}>
                            <i className="fas fa-arrow-alt-circle-left"></i>
                        </button>
                        <button type="button" onClick={this.nextPage} className="btn btn-primary"
                                disabled={this.state.parsed_link_header.next == null}>
                            <i className="fas fa-arrow-alt-circle-right"></i>
                        </button>

                        <p/>
                        <div className="card-columns">
                            {this.state.tweets ? this.state.tweets.map(function (item) {
                                return (

                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Tweet:</h5>
                                            <p className="card-text">{item.text_content}</p>
                                            <a href={item.uri}
                                               target="_blank" className="btn btn-primary">Go to tweet</a>
                                        </div>
                                        <div className="card-footer text-muted">
                                            {moment(item.posted_at).fromNow()}
                                        </div>
                                    </div>

                                )
                            }) : ''}
                        </div>
                    </p>
                </div>
<Modal/>

            </div>
        );
    }
}

export default App;
