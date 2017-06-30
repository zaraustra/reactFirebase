import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Button } from 'react-bootstrap';
import Moment from 'moment';

import Header from './header'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.fbLogin = this.fbLogin.bind(this);
        this.addPost = this.addPost.bind(this);
    }

    componentDidMount() {
        this.dbRef = firebase.database().ref().child('posts');
        this.dbRef.on('value', snap => {
            console.log(snap.val());
            this.setState({posts: snap.val()});
        });

        this.setState({height: document.body.clientHeight, width: document.body.clientWidth});
        this.provider = new firebase.auth.FacebookAuthProvider();
    }

    fbLogin() {
        firebase.auth().signInWithPopup(this.provider).then((result) => {
            let token = result.credential.accessToken;
            let user = result.user;
            this.setState({user: user, token: token});
            console.log('signed in!', token, user);
        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            console.log('Error:', errorMessage, credential);
        });
    }

    addPost() {
        let posts = firebase.database().ref().child('posts');
        let newContent = {
            text: document.getElementById('newPost').value,
            author: this.state.user.displayName,
            photo: this.state.user.photoURL,
            date: new Date()
        };

        posts.push(newContent);

        document.getElementById('newPost').value = '';
    }

    render() {
        let { state } = this;
        return (
            <div className="App">
                <Header/>
                {state.user ?
                    <div className="welcome">
                        <h2>Welcome {state.user.displayName}!</h2>
                        <a href={'http://www.facebook.com/' + state.user.providerData[0].uid}><img src={state.user.photoURL} alt="Profile picture"/></a>
                    </div>
                : null}
                <div className="posts">
                    {state.posts ? Object.keys(state.posts).map(postKey => {
                        return <div className="post" key={postKey}>
                            <img src={state.posts[postKey].photo} alt="Profile picture"/> {state.posts[postKey].author}, {Moment(state.posts[postKey].date).format('DD ddd MMM, YYYY')}<br/>
                            {state.posts[postKey].text}
                        </div>
                    }) : null}
                </div>

                {state.user ?
                    <div className="insertMessage">
                        <input type="textarea" id="newPost"/>
                        <Button onClick={this.addPost}>Add Post</Button>
                    </div>
                : <Button onClick={this.fbLogin}> FB Login </Button>}
            </div>
        );
    }
}