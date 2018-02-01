import React, { Component } from 'react';
import helpers from 'helpers.js'
import { Grid, Segment, Container } from 'semantic-ui-react';
import { WindowResizeListener } from 'react-window-resize-listener'

class Viewpoet extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	user : null
    }
  }
	
	componentDidMount() {
		this.initViewport();
	}

	initViewport() {
		var box_data = [
		  {
		    "origin": [
		      -0.9493143529813757,
		      -0.6801228033529476,
		      0.5
		    ],
		    "dimensions": [
		      1,
		      1,
		      1
		    ],
		    "axis": [
		      0,
		      0,
		      -1
		    ],
		    "reference": [
		      0,
		      1,
		      0
		    ],
		    "primitive": "block",
		    "units": {
		      "dimensions": "feet",
		      "origin": "feet"
		    }
		  }
		]
		console.log(this.props)
			var viewport = new FluxViewport(document.querySelector("#view"))
			viewport.setupDefaultLighting()
			viewport.setGeometryEntity(box_data)
	}

  render() {
  	return (
  		<Container
  		style = {{
  			height: '100%'
  		}}>
  		<Grid celled>
		    <Grid.Row>
		      <Grid.Column width={12}>
		      	<div id = 'view' style = {{height: '600px' }}></div>
		      </Grid.Column>
		      <Grid.Column width={4}>
		      	<div>Hello</div>
		      </Grid.Column>
		    </Grid.Row>
	  	</Grid>
  		</Container>

  	)
  }
}

export default Viewpoet;