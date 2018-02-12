import React from 'react'
import helpers from 'helpers.js'
import { render } from 'react-dom'
import { Button, Container, Header, Icon, Segment, Loader, Dimmer, Menu, Dropdown, Label} from 'semantic-ui-react'
import Login from 'login'
import Viewport from 'viewport'

class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	authenticated: null,
	  	projects: null,
	  	cells: null,
	  	selectedCell: null
	  };
	  this.logout = this.logout.bind(this);
	  this.selectCell = this.selectCell.bind(this);
	  this.clean = this.clean.bind(this);
	}

	componentWillMount() {
		this.check();
	}

	/*
			Checking if a user already loging or not first.
	*/
	check() {
		helpers.storeFluxUser()
	    .then(() => helpers.isLoggedIn())
	    .then((isLoggedIn) => {
	      if (isLoggedIn === true) {
	      	this.fetchData();
	      } else {
	      	this.setState({ authenticated : false });
	      }
	    })
	}

	/*
			Fetching a users projects/cell data table information from flux server
	*/
	fetchData() {
		helpers.getUser().listProjects().then(projects => {
			var projectEntries = projects.entities.map(project => helpers.getUser().getDataTable(project.id).listCells())
			Promise.all(projectEntries).then(projectEntries => {
				var cells = projectEntries.map(cell => cell.entities)
				this.setState({cells: cells, authenticated: true, projects: projects.entities})
			})
		})
	}

	/*
			Cleaning the viewport display
	*/
	clean() {
		this.setState({selectedCell : null});
	}

	/*
			Fetching a users projects/cell data table information from flux server
	*/
	selectCell(projectId,cellId) {
		this.setState({ selectedCell : {projectId : projectId,cellId : cellId }})
	}

	/*
			Log-in to flux server to get user authentication 
	*/
	login() {
		helpers.redirectToFluxLogin();
		this.setState({ authenticated : true });
	}

	/*
			Log-out and erasing all of user projects data in the memory
	*/
	logout() {
		this.setState({logoutPage: true })
		helpers.logout();
		this.setState({ authenticated : false, selectCell: null, projects: null, cells: null });
	}

  render () {
  	var { authenticated } = this.state
  	var { selectedCell } = this.state
  	var { logoutPage } = this.state
  	return (
  		<div>
		    <Menu fixed='top' color={'teal'} inverted>
		      <Menu.Item style={{'marginLeft' : '50px'}} >
		        <h1>Flux Project</h1>
		        </Menu.Item>
		        <Dropdown item simple text='Projects'>
		          <Dropdown.Menu>
		          {
		          	this.state.projects && this.state.cells ? 
		          		this.state.projects.map((project,index)=> {
		          			return (
		          				<Dropdown.Item key={project.name}>
		          					{project.name}
		          					<i className='dropdown icon' />
		          						<Dropdown.Menu>
		          						{
		          							this.state.cells[index] ?
						              	this.state.cells[index].map(cell => {
						              		return <Dropdown.Item key={cell.label} onClick = {this.selectCell.bind(this,project.id,cell.id)}>{cell.label}</Dropdown.Item>
						              	})
						              	:
						              	null
		          						}
						              </Dropdown.Menu>
		          				</Dropdown.Item>
		          			)
		          		})
		          		:
		          		null
		          }
		         </Dropdown.Menu>
		        </Dropdown>
		        <Menu.Item onClick={this.clean.bind(this)}>
		        	Clean
		        </Menu.Item>
				    {
				    	authenticated === true ?
				    		<Menu.Item 
				    			name = 'Log-out'
				    			onClick = {this.logout}
				    			position='right'
				    			active = {true}
				    			>
				    		</Menu.Item>
				    		: 
				    		authenticated === false ?
					    		<Menu.Item 
					    			name = 'Log-in'
					    			onClick = {this.login}
					    			position='right'
				    				active = {true}
					    		>
					    	</Menu.Item>
					    	:
					    		null
				    }
		    </Menu>
			  	{
			  		authenticated  ? 
			  			selectedCell ?
			  				<Viewport selectedItem = {selectedCell} />
			  				:
			  				<Login/>
			  		:
			  			authenticated !== null ? 
			  				<h1 style={{'marginTop': '7em', 'textAlign': 'center'}}>
			  				Please Login...
			  				</h1>
			  				:
			  				<div>
				  				<Dimmer active inverted>
						        <Loader inverted>Loading</Loader>
						      </Dimmer>
						    </div>
			  	}
			</div>
  	)
  }
}

render(<App />, document.getElementById('root'))
