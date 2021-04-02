import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import ActorCard from './ActorCard';
import Loading from './Loading';

import { LoadActors } from '../actions/actors';

class ActorList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleAll: props.match.params.cast !== undefined ? true : false
		}
	}
	componentDidMount() {
		const { match, LoadActors } = this.props;
		LoadActors(match.params.movie_id);
	}
	showAll = () => {
		const { history, match } = this.props;

		this.setState({
			visibleAll: !this.state.visibleAll
		});

		if(this.state.visibleAll)
			history.push(`/movie/${match.params.movie_id}`);
		else
			history.push(`/movie/${match.params.movie_id}/cast`);
	};

	render() {
		const { actors, isFetched } = this.props;

		let actorsArray = actors;

		if(!this.state.visibleAll)
            actorsArray = actors.slice(0, 4);

        if(!isFetched) {
            return <Loading />;
        }

		return (
			<div className='actor-list'>
				<h2>Top billed cast</h2>
				{actors.length > 4 && (
					<span className={`expand ${this.state.visibleAll ? '-active' : ''}`} onClick={this.showAll}>Show all</span>
				)}
				<SlideDown className='my-dropdown-slidedown'>
					<div className='actors-inline'>
						{actorsArray.map(actor => (
							<ActorCard key={actor.id} actor={actor} />
						))}
					</div>
				</SlideDown>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadActors
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		actors: state.actors.all,
		isFetched: state.actors.isFetched,
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActorList));