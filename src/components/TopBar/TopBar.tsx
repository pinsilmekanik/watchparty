import React from 'react';
import { serverPath } from '../../utils';
import { Icon, Popup, Button, Dropdown } from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export class NewRoomButton extends React.Component<{ size?: string }> {
  createRoom = async () => {
    const response = await window.fetch(serverPath + '/createRoom', {
      method: 'POST',
    });
    const data = await response.json();
    const { name } = data;
    window.location.hash = '#' + name;
    window.location.reload();
  };
  render() {
    return (
      <Popup
        content="Create a new room with a random URL that you can share with friends"
        trigger={
          <Button
            color="blue"
            size={this.props.size as any}
            icon
            labelPosition="left"
            onClick={this.createRoom}
            className="toolButton"
          >
            <Icon name="certificate" />
            New Room
          </Button>
        }
      />
    );
  }
}

export class TopBar extends React.Component<{
  user?: any;
  hideNewRoom?: boolean;
  hideSignin?: boolean;
}> {
  facebookSignIn = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    const user = await firebase.auth().signInWithPopup(provider);
    if (process.env.NODE_ENV === 'development') {
      console.log(user);
    }
  };

  googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await firebase.auth().signInWithPopup(provider);
    if (process.env.NODE_ENV === 'development') {
      console.log(user);
    }
  };

  emailSignIn = (email: string, password: string) => {
    firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  signOut = () => {
    firebase.auth().signOut();
    window.location.reload();
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '1em',
            paddingBottom: '0px',
          }}
        >
          <a href="/">

            <img src="https://pilationship.com/logo.png" alt="" />



            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >

            </div>
          </a>
          {/* <div
            style={{
              display: 'flex',
              marginLeft: '10px',
              alignItems: 'center',
            }}
          >
            <a
              href="https://discord.gg/3rYj5HV"
              target="_blank"
              rel="noopener noreferrer"
              className="footerIcon"
              title="Discord"
            >
              <Icon name="discord" size="big" link />
            </a>
            <a
              href="https://github.com/howardchung/watchparty"
              target="_blank"
              rel="noopener noreferrer"
              className="footerIcon"
              title="GitHub"
            >
              <Icon name="github" size="big" link />
            </a>
          </div> */}
          <div
            className="mobileStack"
            style={{
              display: 'flex',
              marginLeft: 'auto',
            }}
          >
            {!this.props.hideNewRoom && <NewRoomButton />}
            {!this.props.hideSignin && !this.props.user && (
              <Popup
                basic
                content="Sign in to automatically set your name and picture"
                trigger={
                  <Dropdown
                    style={{ height: '36px' }}
                    icon="sign in"
                    labeled
                    className="icon"
                    button
                    text="Sign in"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.facebookSignIn}>
                        <Icon name="facebook" />
                        Facebook
                      </Dropdown.Item>
                      <Dropdown.Item onClick={this.googleSignIn}>
                        <Icon name="google" />
                        Google
                      </Dropdown.Item>
                      {/* <Dropdown.Item onClick={this.emailSignIn}>Email</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                }
              />
            )}
            {!this.props.hideSignin && this.props.user && (
              <Button
                style={{ height: '36px' }}
                icon
                labelPosition="left"
                onClick={this.signOut}
              >
                <Icon name="sign out" />
                Sign out
              </Button>
            )}
            {/* <SettingsModal trigger={<Button fluid inverted color="green" size="medium" icon labelPosition="left" className="toolButton"><Icon name="setting" />Settings</Button>} /> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
