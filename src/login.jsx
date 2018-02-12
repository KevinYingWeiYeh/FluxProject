import React from 'react';
import { Button, Container, Header, Icon, Segment, Loader, Dimmer, Menu, Dropdown, Label, Transition} from 'semantic-ui-react'

class Login extends React.Component {
	state = {visible: false};

  componentDidMount() {
    this.setState({
      visible: true
    })
  }	
	render() {
    return (
      <Transition style={{'marginTop': '7em'}} visible={this.state.visible} animation='fade up' duration={1500}>
        <Segment textAlign='center' vertical style={{ minHeight: 700, padding: '1em 0em', border: 'none' }}>
          <Container text>
              <Header
                as='h1'
                content='Revit 3D Viewer'
                style={{ fontSize: '4em', marginBottom: 0, marginTop: '3em' }}
              />
              <Header
                as='h2'
                content='Please click on "Projects" button to show your project!!'
                style={{ fontSize: '1.7em'}}
                color={'blue'}
              />
          </Container>
        </Segment>
      </Transition>)
  }
}


export default Login;