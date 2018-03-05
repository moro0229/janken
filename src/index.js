import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaiseButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import { Tabs, Tab } from 'material-ui/Tabs'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Janken from './Janken'

// import './index.css'

class JankenGamePage extends Component{
	constructor(props){
		super(props)
		this.janken = new Janken()
		this.state = {scores: [], status: {}, tabIndex: 0}
	}

	componentDidMount(){
		this.getResult()
	}

	tabChange(ix){
		this.setState({tabIndex: ix})
		this.getResult()
	}

	getResult(){
		this.setState({scores: this.janken.getScores()})
		this.setState({status: this.janken.getStatuses()})
	}

	pon(te){
		this.janken.pon(te)
		this.getReulst()
	}

	render(){
		return(
				<MuiThemeProvider>
				<div style={{marginLeft: 30}}>
				<Header>じゃんけんぽん</Header>
				<JankenBox actionPon={(te)=>this.pon(te)} />
				<Paper style={{width: 400}} zDepth={2}>
				<Tabs value={this.state.tabIndex} onChange={(ix)=>this.tabChange(ix)}>
				<Tab label="対戦結果" value={0}>
				<ScoreList scores={this.state.scores} />
				</Tab>
				<Tab label="対戦成績" value={1}>
				<StatusBox status={this.state.status} />
				</Tab>
				</Tabs>
				</Paper>
				</div>
				</MuiThemeProvider>
		)
	}
}

const Header = (props) => (<h1>{props.children}</h1>)
Header.propTypes = {
	children: PropTypes.string
}

const StatusBox = (props) => (
		<Table>
		<TableBody displayRowCheckbox={false}>
		<TableRow displayBorder={false}>
		<TableHeaderColumn>勝ち</TableHeaderColumn><TableRowColumn style={judgmentStyle(1)}>{props.status.win}</TableRowColumn>
		</TableRow>
		<TableRow displayBorder={false}>
		<TableHeaderColumn>負け</TableHeaderColumn><TableRowColumn style={judgmentStyle(2)}>{props.status.lose}</TableRowColumn>
		</TableRow>
		<TableRow displayBorder={false}>
		<TableHeaderColumn>引き分け</TableHeaderColumn><TableRowColumn style={judgmentStyle(0)}>{props.status.draw}</TableRowColumn>
		</TableRow>
		</TableBody>
		</Table>
)

StatusBox.propTypes = {
	status: PropTypes.object
}

const JankenBox = (props) => {
	const style = {marginLeft: 20}
	return(
			<div style={{marginTop: 40, marginBotton: 30, marginLeft: 30}}>
			<RaiseButton label="グー" onClick={()=>props.actionPon(0)} style={style} />
			<RaiseButton label="チョキ" onClick={()=>props.actionPon(1)} style={style} />
			<RaiseButton label="パー" onClick={()=>props.actionPon(2)} style={style} />
			</div>
	)
}

JankenBox.propTypes = {
	actionPon: PropTypes.func
}

const ScoreList = (props) => (
		<Table>
		<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
		<TableRow>
		<TableHeaderColumn>時間</TableHeaderColumn><TableHeaderColumn>人間</TableHeaderColumn><TableHeaderColumn>コンピューター</TableHeaderColumn>
		<TableHeaderColumn>結果</TableHeaderColumn>
		</TableRow>
		</TableHeader>
		<TableBody>
		{props.scores.map((score,ix)=><ScoreListItem key={ix} score={score} />)}
	</TableBody>
		</Table>
)

ScoreList.propTypes={
	scores: PropTypes.array
}

const ScoreListItem = (props) => {
	const teString = ["グー", "チョキ", "パー"]
	const judgmentString = ["引き分け", "勝ち", "負け"]
	const dateHHMMSS = (d) => d.toTimeString().substr(0, 8)
	return (
			<TableRow style={judgmentStyle(props.score.judgment)}>
			<TableRowColumn>{dateHHMMSS(props.score.created_at)}</TableRowColumn>
			<TableRowColumn>{teString[props.score.human]}</TableRowColumn>
			<TableRowColumn>{teString[props.score.computer]}</TableRowColumn>
			<TableRowColumn>{judgmentString[props.score.judgment]}</TableRowColumn>
			</TableRow>
	)
}

ScoreListItem.propTypes = {
	score: PropTypes.object
}


const judgmentStyle = (judgment) => ({color: ["#000", "#2979FF", "#FF1744"] [judgment]})

ReactDOM.render(
		<JankenGamePage />,
		document.getElementById('root')
)









