import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import config from '../config';

import emptySmall from '../assets/imgs/empty-actor.png';

class ActorCard extends React.Component {
	imageLoaded = (e) => {
		e.target.classList.add('-loaded');
	}
	render(){
		const { actor } = this.props;

		return (
			<div className='actor-card'>
				<Link to={`/actor/${actor.id}`} className='actor-image'>
					{actor.profile_path !== null ? (
						<LazyLoadImage 
							src={`${config.API_IMAGE.small}/${actor.profile_path}`}
							onLoad={this.imageLoaded}
							alt={actor.profile_path}
						/>
					) : <LazyLoadImage 
							src={emptySmall}
							onLoad={this.imageLoaded}
							alt='No image'
						/>
					}
				</Link>
				<div className='actor-info'>
					<div className='actor-name'>{actor.name}</div>
					<div className='actor-character'>{actor.character}</div>
				</div>
			</div>
		)
	}
}

export default ActorCard;