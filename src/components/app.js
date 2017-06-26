import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Button } from 'react-bootstrap';

import Header from './header'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editContent: false,
            page: {}
        };

        this.showEditContent = this.showEditContent.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.dbRef = firebase.database().ref().child('page');
        this.dbRef.on('value', snap => {
            this.setState({page: snap.val()});
        });

        this.setState({height: document.body.clientHeight, width: document.body.clientWidth});
        window.addEventListener('resize', this.updateDimensions)

    }

    updateDimensions() {
        this.setState({height: document.body.clientHeight, width: document.body.clientWidth});
    }

    changeContent() {
        let dbContent = firebase.database().ref().child('page').child('content');
        let newContent = document.getElementById('newContent').value;
        dbContent.set(newContent);
        this.setState({editContent: false});
    }

    showEditContent() {
        this.setState({editContent: true});
    }

    render() {
        let state = this.state;
        return (
            <div className="App">
                <Header/>

                <div className="parallax">
                    <div className="parallax__layer parallax__layer__0">
                        <img src="http://s.cdpn.io/3/kiwi.svg"/>
                    </div>
                    <div className="parallax__layer parallax__layer__1">
                        <img src="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"/>
                    </div>
                    <div className="parallax__layer parallax__layer__2">
                        <img src="http://info.sonicretro.org/images/f/f0/Classic_sonic_run3.svg"/>
                    </div>
                    <div className="parallax__layer parallax__layer__3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Littlebluedog.svg/2000px-Littlebluedog.svg.png"/>
                    </div>
                    <div className="parallax__cover">
                        <h1>LALALAL LAL ALALAL DJFLAE JFOEFOANEFOHAOEF AEO</h1>
                    </div>
                </div>

                <h3>{this.state.page.title}</h3>
                <h4>{this.state.page.subtitle}</h4>
                <p>{this.state.page.content}</p>
                {!this.state.editContent ?
                    <Button onClick={this.showEditContent}>Show edit content</Button>
                    :
                    <div>
                        <input type="textarea" id="newContent"/>
                        <Button onClick={() => this.setState({editContent: false})}>Cancel</Button>
                        <Button onClick={this.changeContent}>Save</Button>
                    </div>
                }
            </div>
        );
    }
}