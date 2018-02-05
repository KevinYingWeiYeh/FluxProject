import React from 'react'
import helpers from 'helpers.js'
import { render } from 'react-dom'
import { Button, Container, Header, Icon, Segment, Loader, Dimmer} from 'semantic-ui-react'
import Viewport from 'Viewport'

class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	authenticated: null
	  };
	  this.logout = this.logout.bind(this);
	}

	componentWillMount() {
		this.check();
	}

	check() {
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
		helpers.redirectToFluxLogin();
		this.setState({ authenticated : true });
	}
	logout() {
		helpers.logout();
		this.setState({ authenticated : false });
	}

  render () {
  	var { authenticated } = this.state
  	return (
		  <Container>
		   	<Segment vertical style = {{height : '80px'}}>
				  		<Header as = 'h1' floated = 'left'>
			  			  <Icon name = 'plug' />
						    <Header.Content>
						      FLUX project
						    </Header.Content>
					   	</Header>
					   	<Header as='h2' floated='right'>
						    {
						    	authenticated === true ?
						    		<Button 
						    			primary 
						    			size ='huge'
						    			content = 'Log-out'
						    			onClick = {this.logout}
						    			/>
						    		: 
						    		authenticated === false ?
							    		<Button 
							    			primary 
							    			size ='huge'
							    			content = 'Log-in'
							    			onClick = {this.login}
							    		/>
							    	:
							    		null
						    }
					   	</Header>
			  </Segment>
					  	{
					  		authenticated ? 
					  			<Viewport authenticated = {authenticated} />
					  		:
					  			authenticated !== null ? 
					  				<div>Please Login...</div>
					  			:
					  				<div>
						  				<Dimmer active inverted>
								        <Loader inverted>Loading</Loader>
								      </Dimmer>
								    </div>
					  	}
		  </Container>
  	)
  }
}

render(<App />, document.getElementById('root'))
