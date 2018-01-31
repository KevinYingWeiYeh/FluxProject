import React from 'react'
import helpers from 'helpers.js'
import { render } from 'react-dom'
import { Button, Container, Header, Icon, Segment} from 'semantic-ui-react'

class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	authenticated: false
	  };
	  this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		helpers.storeFluxUser()
	    .then(() => helpers.isLoggedIn())
	    .then((isLoggedIn) => {
	      if (isLoggedIn === true) {
	      	this.setState({ authenticated : true });
	      } else {
	      	this.setState({ authenticated : false });
	      }
	    })
	}

	login() {
		console.log('login');
		helpers.redirectToFluxLogin();
	}
	logout() {
		console.log('logout')
		this.setState({ authenticated : false });
	}

  render () {
  	var { authenticated} = this.state
  	return (
		  <Container>
		   	<Segment clearing>
		  		<Header as='h1' floated='left'>
	  			  <Icon name='plug' />
				    <Header.Content>
				      FLUX project
				    </Header.Content>
			   	</Header>
			   	<Header as='h2' floated='right'>
				    {
				    	this.state.authenticated ?
				    		<Button 
				    			primary 
				    			size ='huge'
				    			content = 'Log-out'
				    			onClick = {this.logout}
				    			/>
				    		:
				    		<Button 
				    			primary 
				    			size ='huge'
				    			content = 'Log-in'
				    			onClick = {this.login}
				    		/>
				    }
			   	</Header>
			  </Segment>
		  </Container>
  	)
  }
}

render(<App />, document.getElementById('root'))
