import React, { useState, useEffect } from 'react';
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

function TextImporter({ addVideos, showImporter }) {
	const [error, setError] = useState(false);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				if (addVideos(deserializeData(e.target.playlisturls.value.split('\n')))) {
					showImporter();
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
			<button className="right button-primary">Add to Playlist</button>
		</form>
	);
}

const initializeVideoData = () => {
	console.log("initializing video data");
	const lData = localStorage.getItem('videos');
	console.log(lData);
	const videosData = JSON.parse(lData);
	if (videosData) return videosData;
	return [];
};

function App() {
	const darkMode = useDarkMode(false);
	const [videos, setVideos] = useState(() => initializeVideoData());
	const [currentVideo, setCurrentVideo] = useState(videos[0]);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(videos.length > 0 ? 0 : undefined);
	const [showImporterMode, setShowImporterMode] = useState(false);
	const [showSideBar, setSidebar] = useState(true);

	const addVideos = urls => {
		let newUrls = videos.concat(urls);
		localStorage.setItem('videos', JSON.stringify(newUrls));
		setVideos(newUrls);
		return true;
	};

	const showImporter = () => {
		setShowImporterMode(!showImporterMode);
	};

	const previousVideoCallback = () => {
		setCurrentVideoIndex((curIndex) => {
			if (curIndex !== undefined) {
				let newIndex = curIndex;
				newIndex--;
				if (newIndex < 0) {
					newIndex = videos.length - 1;
				}
				return newIndex;
			}
			return undefined;
		});
	}

	const nextVideoCallback = () => {
		setCurrentVideoIndex((curIndex) => {
			if (curIndex !== undefined) {
				let newIndex = curIndex;
				newIndex++;
				if (newIndex >= videos.length) {
					newIndex = 0;
				}
				return newIndex;
			}
			return undefined;
		});
	}

	const setVideoByIndex = (newIndex) => {
		console.log("setting video to index " + newIndex);
		setCurrentVideoIndex((curIndex) => newIndex);
	}

	useEffect(() => {
		setCurrentVideo(() =>
			currentVideoIndex !== undefined ? videos[currentVideoIndex] : undefined);
	}, [currentVideoIndex, videos]);

	return (
		<div className="App d-flex">
			{showSideBar && (
				<div className="sidebar">
					<div className="right">
						<div data-tip="Add to Playlist" className="round-button" onClick={() => showImporter()}>
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
					{showImporterMode && (
						<TextImporter
							addVideos={(urls) => addVideos(urls)}
							showImporter={() => showImporter()}
						/>
					)}

					<PlayList
						videos={videos}
						currentVideo={currentVideo}
						setVideoByIndex={setVideoByIndex}
						setVideos={setVideos}
					/>
				</div>
			)}

			<div className="video-panel-section">
				<Toolbar toggle={darkMode.toggle} setSidebar={setSidebar} showSideBar={showSideBar} />
				<div className="grow d-flex center">
					<div className="w-100">
						<VideoPlayer
							currentVideo={currentVideo}
							previousVideoCallback={() => (previousVideoCallback())}
							nextVideoCallback={() => (nextVideoCallback())}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
