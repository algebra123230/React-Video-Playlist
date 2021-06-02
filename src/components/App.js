import React, { useState } from 'react';
import useDarkMode from 'use-dark-mode';
import ReactTooltip from 'react-tooltip';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ClearAllIcon from '@material-ui/icons/ClearAllOutlined';
import { validURL } from './helpers/validUrl';
import VideoPlayer from './VideoPlayer';
import Toolbar from './Toolbar';
import PlayList from './PlayList';

const deserializeData = data => {
	let urls = [];
	data.forEach(l => {
		let line = l.trim();
		let i = line.indexOf(' ');
		let url, name;
		if (i >= 0) {
			url = line.slice(0, i);
			name = line.slice(i+1);
		} else {
			url = line;
		}
		if (validURL(url)) {
			urls.push({ url, name });
		}
	});
	return urls;
}

const handlePlaylist = (value, videos, setVideos) => {
	const lines = value.split('\n');

	const storeVideos = urlList => {
		let newUrlList = videos.concat(urlList);
		localStorage.setItem('videos', JSON.stringify(newUrlList));
		setVideos(newUrlList);
	};

	let urls = deserializeData(lines);
	storeVideos(urls);

	return true;
};

const videosInitialData = () => {
	const lData = localStorage.getItem('videos');
	console.log(lData);
	const videosData = JSON.parse(lData);
	if (videosData) return videosData;
	return [];
};

function App() {
	const darkMode = useDarkMode(false);
	const [videos, setVideos] = useState(videosInitialData());
	const [currentVideo, setCurrentVideo] = useState(videos[0]);
	const [showListMode, setShowListMode] = useState(false);
	const [showSideBar, setSidebar] = useState(true);
	const [error, setError] = useState(false);

	const showList = () => {
		setShowListMode(!showListMode);
	};

	return (
		<div className="App d-flex">
			{showSideBar && (
				<div className="sidebar">
					<div className="right">
						<div data-tip="Add Playlist" className="round-button" onClick={() => showList()}>
							<ReactTooltip effect="solid" place="right" />
							<PlaylistAddIcon />
						</div>

						<div
							data-tip="Clear Playlist"
							className="round-button"
							onClick={() => {
								setVideos([]);
								localStorage.removeItem('videos');
							}}
						>
							<ReactTooltip effect="solid" place="right" />
							<ClearAllIcon fontSize="small" />
						</div>
					</div>
					{showListMode && (
						<form
							onSubmit={e => {
								e.preventDefault();
								if (handlePlaylist(e.target.playlisturls.value, videos, setVideos)) {
									showList();
									setError();
								} else setError('URL List contains invalid URL');
							}}
							className="playlist-form"
						>
							{error && <div className="alert-error">{error}</div>}
							<textarea
								name="playlisturls"
								required
								placeholder="Add videos to playlist (separated by newline). You can add custom name to videos (separated by space) Eg: VideoURL NAME."
							/>
							<button className="right button-primary">Save Playlist</button>
						</form>
					)}

					<PlayList
						videos={videos}
						currentVideo={currentVideo}
						setCurrentVideo={setCurrentVideo}
						setVideos={setVideos}
					/>
				</div>
			)}

			<div className="video-player-section">
				<Toolbar toggle={darkMode.toggle} setSidebar={setSidebar} showSideBar={showSideBar} />
				<div className="grow d-flex center">
					<div className="w-100">
						<VideoPlayer currentVideo={currentVideo} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
