import React from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import VideIcon from '@material-ui/icons/PlayCircleOutline';
import ReactTooltip from 'react-tooltip';

const deleteItem = (id, videos, setVideos) => {
	const newList = videos.filter((item, index) => index !== id);
	console.log(newList);
	localStorage.setItem('videos', JSON.stringify(newList));
	setVideos(() => newList);
};

export default function PlayList({ videos, currentVideo, setVideoByIndex, setVideos }) {
	return (
		<>
			<h4 class="playlist-header">Videos in Playlist {videos.length !== 0 ? <div className="playlist-count">{videos.length}</div> : ''}</h4>
			<ul class="playlist-content">
				{videos.length === 0 ? <span className="text-muted">No videos in the Playlist</span> : ''}
				{videos.map((video, index) => {
					let videoName = video.name ? video.name : `Video ${index + 1}`;
					// console.log(video.name);
					return (
						<li key={video.url} className={currentVideo === video ? 'active' : ''} title={videoName}>
							<div onClick={() => setVideoByIndex(index)} href="#" className="d-flex pl-5 nav-video">
								<div className="select-video"><VideIcon fontSize="small" /></div>
								<div className="video-title">
									{videoName}
								</div>
							</div>
							<span className="delete-video" data-tip="Remove Video">
								<ReactTooltip effect="solid" place="right" />
								<DeleteIcon
									onClick={e => {
										deleteItem(index, videos, setVideos);
									}}
								/>
							</span>
						</li>
					);
				})}
			</ul>
		</>
	);
}
