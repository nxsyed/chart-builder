import React, { Component } from 'react';
import './App.css';
import PubNubReact from 'pubnub-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import Chart from 'eon-react';
import {
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  card: {
    minWidth: 275,
    width: 600,
    float: 'left',
    margin: 20
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  information: {
    float: 'right',
    padding: 20
  }
});

class App extends Component {
  
  constructor(props){
    super(props)
    this.pubnub  =  new PubNubReact({
      subscribeKey:  'sub-c-6af8440e-4890-11e8-a3a7-d29c801c92ae'
    });
    this.pubnub.init(this);
    this.state = {
      type: 'area'
    };
  }

  handleChange = (event) => {
    this.setState({ type: event.target.value });
    console.log(Chart);
  };


  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.card}>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="chart-type">Chart Type</InputLabel>
              <Select
                value={this.state.type}
                onChange={this.handleChange}
                inputProps={{
                  name: 'type',
                  id: 'chart-type',
                }} >
                <MenuItem value={'spline'}>
                  <em>Spline</em>
                </MenuItem>
                <MenuItem value={'line'}>Line</MenuItem>
                <MenuItem value={'area'}>Area</MenuItem>
                <MenuItem value={'step'}>Step</MenuItem>
                <MenuItem value={'donut'}>donut</MenuItem>
                <MenuItem value={'area-step'}>area-step</MenuItem>
                <MenuItem value={'bar'}>bar</MenuItem>
              </Select>
            </FormControl>
          </form>

          <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Choose your graph type above
              </Typography>
              <Chart
                pubnub={this.pubnub}
                channels={['eon-components']}
                type={this.state.type} />
            </CardContent>
          </Card>
        </div>

        <div className={classes.information}>
          
          <h3> Live Code for chart shown on left! </h3>
           <SyntaxHighlighter language='javascript' style={docco}>{

`import PubNubReact from 'pubnub-react';
import Chart from 'eon-react';

class App extends Component {

  constructor(props){
    super(props)
    this.pubnub  =  new PubNubReact({
      subscribeKey:  'sub-c-6af8440e-4890-11e8-a3a7-d29c801c92ae' // Your sub key
    });
    this.pubnub.init(this);
  }

  render() {
    return ( 
      <Chart
        pubnub={this.pubnub}
        channels={['eon-components']} /** Enter your channel name **/
        type='${this.state.type}' />
    );
  }
}`
          }</SyntaxHighlighter>
        </div>      
      </div>
    );
  }
}

export default withStyles(styles)(App);
