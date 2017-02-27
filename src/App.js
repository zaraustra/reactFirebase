import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editContent: false,
            page: {}
        };

        this.showEditContent = this.showEditContent.bind(this);
        this.changeContent = this.changeContent.bind(this);
    }

    componentDidMount() {
        this.dbRef = firebase.database().ref().child('page');
        this.dbRef.on('value', snap => {
            this.setState({page: snap.val()});
        });
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
        return (
            <div className="App">
                <h3>{this.state.page.title}</h3>
                <h4>{this.state.page.subtitle}</h4>
                <p>{this.state.page.content}</p>
                {!this.state.editContent ?
                    <button onClick={this.showEditContent}>Show edit content</button>
                    :
                    <div>
                        <input type="textarea" id="newContent"/>
                        <button onClick={() => this.setState({editContent: false})}>Cancel</button>
                        <button onClick={this.changeContent}>Save</button>
                    </div>
                }
            </div>
        );
    }
}

export default App;