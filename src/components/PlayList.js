import React from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import VideIcon from '@material-ui/icons/PlayCircleOutline';
import ReactTooltip from 'react-tooltip';

const deleteItem = (id, videos, setVideos) => {
	const newList = videos.filter((item, index) => index !== id);
	console.log(newList);
	localStorage.setItem('videos', JSON.stringify(newList));
	setVideos(newList);
};

export default function PlayList({ videos, currentVideo, setCurrentVideo, setVideos }) {
	return (
		<>
			<h4>Playlists {videos.length !== 0 ? <div className="playlist-count">{videos.length}</div> : ''}</h4>
			<ul>
				{videos.length === 0 ? <span className="text-muted">No video's in the Playlist</span> : ''}
				{videos.map((video, index) => {
					// console.log(video.name);
					return (
						<li key={video.url} className={currentVideo === video ? 'active' : ''}>
							<div onClick={() => setCurrentVideo(video)} href="#" className="d-flex pl-5 nav-video">
								<div className="select-video"><VideIcon fontSize="small" /></div>
								<div className="video-title">
									{video.name ? video.name : `Video ${index + 1}`}
								</div>
							<div className="delete-video" data-tip="Remove Video">
								<ReactTooltip effect="solid" place="right" />
								<DeleteIcon
									onClick={e => {
										deleteItem(index, videos, setVideos);
									}}
								/>
							</div>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}
