/*

	viewport component 

*/

import React, { Component } from 'react';
import helpers from 'helpers.js';
import { Grid, Segment, Container, Icon, Checkbox, Accordion, Divider } from 'semantic-ui-react';

class Viewport extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	shadow : false,
    	helper : false,
    	activeIndex: 0
    }
    this.shadow = this.shadow.bind(this);
    this.helper = this.helper.bind(this);
  }
	
  // componentDidUpdate(){
  // 	this.fetch();
  // }

	componentDidMount() {
		this.fetch();
	}

	fetch() {
		if(this.props) {
			var viewport = new FluxViewport(document.querySelector("#view"))
 			helpers.getUser().getDataTable(this.props.selectedItem.projectId).getCell(this.props.selectedItem.cellId).fetch()
 				.then((data) => {
 					this.setState({data:data, viewport:viewport})
					viewport.setGeometryEntity([data.value])
 				})
		}
	}

	/*
			Dropdown munu for sidebar 
  */
	handleClick = (e, titleProps) => {
    var { index } = titleProps
    var { activeIndex } = this.state
    var newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  /*
			shadow & helper are two functions for sidebar checkbox useage
  */
	shadow() {
		this.setState({shadow: !this.state.shadow})
		if(this.state.shadow) {
			this.state.viewport.deactivateShadows()
		} else {
			this.state.viewport.activateShadows()
		}
		this.state.viewport.render();
	}

	helper() {
		this.setState({helper: !this.state.helper})
		this.state.viewport.setHelpersVisible(this.state.helper)
		this.state.viewport.render();
	}

  render() {
  	const { activeIndex } = this.state
  	return (
  		<Container
  		style = {{
  			height: '100%',
  			'marginTop': '7em', 
  			padding: 'none', 
  			border: 'none' 
  		}}>
  		<Grid celled>
		    <Grid.Row >
		      <Grid.Column width={12}>
		      {
		      	this.props ?
  	      	  	<div id = 'view' style = {{height: '600px', padding: 'none', border: 'none' }}></div>
  	      	  :
		      		<div style = {{height: '600px'}}>
			  				<Dimmer active inverted>
					        <Loader inverted>Loading</Loader>
					      </Dimmer>
					    </div>
		      }
		      </Grid.Column>
		      <Grid.Column width={4}>
		      	<Accordion >
			        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
			          <Icon name='dropdown' />
			          Options
			        </Accordion.Title>
			        <Accordion.Content active={activeIndex === 0}>
			        	<Grid.Row  >
					        <Grid.Column>
					        	<Checkbox slider label={{children:'Shadow'}} onClick = {this.shadow}/>
					        </Grid.Column>
					      </Grid.Row>
					      <Divider />
					      <Grid.Row  >
					        <Grid.Column>
					        	<Checkbox slider defaultChecked label={{children:'Map Helper'}} onClick = {this.helper}/>
					        </Grid.Column>
					      </Grid.Row>
			        </Accordion.Content>
				      <Divider />
			        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
			          <Icon name='dropdown' />
			          Information
			        </Accordion.Title>
			        <Accordion.Content active={activeIndex === 1}>
			        <Segment>
			 					<Icon color='teal' name='user'/>
			 					Author:
			 					<br/>
			 					{
			 						this.state.data ?
			 							this.state.data.authorName
			 							:
			 							null
			 					}
			 					<br/>
			 					<br/>
			 					<Icon color='teal' name='id card'/>
			 					Customer:
			 					<br/>
			 					{
			 						this.state.data ?
			 							this.state.data.clientName
			 							:
			 							null
			 					}
			 					<br/>
			 					<br/>
			 					<Icon color='teal' name='protect'/>
			 					CellName:
			 					<br/>
								{
			 						this.state.data ?
			 							this.state.data.label
			 							:
			 							null
			 					}
			 					<br/>
			 					<br/>
			 					<Icon color='teal' name='bookmark'/>
			 					Description:
			 					<br/>
								{
			 						this.state.data ?
			 							this.state.data.description
			 							:
			 							null
			 					}
			 					</Segment>
			        </Accordion.Content>
			      </Accordion>
		      </Grid.Column>
		    </Grid.Row>
	  	</Grid>
  		</Container>
  	)
  }
}

export default Viewport;