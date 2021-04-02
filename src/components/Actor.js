import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import config from '../config';

import { LoadActor } from '../actions/actor';
import { LoadGenres } from '../actions/genres';

import Loading from './Loading';
import Starring from './Starring';

import emptySmall from '../assets/imgs/empty-actor.png';

class Actor extends React.Component {
	componentDidMount() {
		const { match, LoadActor, LoadGenres } = this.props;
		LoadGenres();
		LoadActor(match.params.actor_id);
	}
	componentWillReceiveProps(nextProps) {
		const { match, LoadActor } = this.props;
		if(match.params.actor_id !== nextProps.match.params.actor_id) {
			LoadActor(nextProps.match.params.actor_id);
		}
    }
	imageLoaded = (e) => {
		e.target.classList.add('-loaded');
	}
	render() {
		const { actor, isFetched } = this.props;

		if(!isFetched) {
            return <Loading />;
        }

		return (
			<div>
				<Helmet>
					<title>{actor.name} | Movies</title>
				</Helmet>
				<div className='content'>
					<div className='actor'>
						<div className='column -left'>
							<div className='actor-image'>
								{actor.profile_path !== null ? (
									<LazyLoadImage 
										src={`${config.API_IMAGE.medium}/${actor.profile_path}`}
										onLoad={this.imageLoaded}
										alt={actor.profile_path}
									/>
								) : <LazyLoadImage 
										src={emptySmall}
										onLoad={this.imageLoaded}
										alt='No image'
									/>
								}
							</div>
						</div>
						<div className='column -right'>
							<h1>{actor.name}</h1>
							{actor.birthday && (
								<div className='actor-detail'>
									<div className='detail'>Birthday</div>
									<div className='value'>{actor.birthday}</div>
								</div>
							)}
							{actor.place_of_birth && (
								<div className='actor-detail'>
									<div className='detail'>Place of birth</div>
									<div className='value'>{actor.place_of_birth}</div>
								</div>
							)}
							{actor.biography && (
								<div className='actor-bio'>
									<h2>Biography</h2>
									<div className='bio'>{actor.biography}</div>
								</div>
							)}
						</div>
					</div>
					<Starring />
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadActor,
		LoadGenres
	}, dispatch
)

const mapStateToProps = (state) => {
	return {
		actor: state.actor.data,
		isFetched: state.actor.isFetched,
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Actor));