import React, { useState, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import ReactTooltip from 'react-tooltip';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAllOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { validURL } from './helpers/validUrl';
import EditableTextField from './EditableTextField';
import VideoPlayer from './VideoPlayer';
import Toolbar from './Toolbar';
import PlayList from './PlayList';

const serializeVideos = videos => {
	return videos.map(video => video.url + " " + video.name).join('\n');
};

const deserializeData = data => {
	let videos = [];
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
			videos.push({ url, name });
		}
	});
	return videos;
};

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
				placeholder="Add videos to playlist, 1 per line. You can add a custom name to videos (separated by space) E.g.: VideoURL NAME."
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
	const [showClearPlaylistDialog, setShowClearPlaylistDialog] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState("");

	const updateVideos = updatedVideos => {
		localStorage.setItem('videos', JSON.stringify(updatedVideos));
		setVideos(() => updatedVideos);
	}

	const addVideos = newVideos => {
		updateVideos(videos.concat(newVideos));
		return true;
	};

	const showImporter = () => {
		setShowImporterMode(showImporterMode => !showImporterMode);
	};

	const downloadPlaylist = () => {
		var blob = new Blob([serializeVideos(videos)], { type: "text/plain;charset=utf-8" });
		const element = document.createElement("a");
		element.href = URL.createObjectURL(blob);
		element.download = "playlist.txt";
		element.click();
    element.remove();
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

	const editVideoName = (newName) => {
		let updatedCurVideo = {
			name: newName,
			url: currentVideo.url
		};
		let updatedVideos = videos;
		updatedVideos[currentVideoIndex] = updatedCurVideo;
		updateVideos(updatedVideos);
		setCurrentVideo((curVideo) => videos[currentVideoIndex]);
	}

	const setVideoByIndex = (newIndex) => {
		console.log("setting video to index " + newIndex);
		setCurrentVideoIndex((curIndex) => newIndex);
	}

	useEffect(() => {
		setCurrentVideo(() =>
			currentVideoIndex !== undefined ? videos[currentVideoIndex] : undefined);
	}, [currentVideoIndex, videos]);

	useEffect(() => {
		document.title = (currentVideo?.name ?? "No Video") + " - React Video Player";
	}, [currentVideo]);

	const closeClearPlaylistDialog = () => {
		setShowClearPlaylistDialog(false);
	}

	const clearPlaylist = () => {
		setVideos([]);
		localStorage.removeItem('videos');
	}

	return (
		<div className="App d-flex">
			{showSideBar && (
				<div className="sidebar">
					<div className="sidebar-controls right">
						<div data-tip="Add to Playlist" className="round-button" onClick={() => showImporter()}>
							<ReactTooltip effect="solid" place="right" />
							<PlaylistAddIcon />
						</div>

						<div data-tip="Download Playlist" className="round-button" onClick={() => downloadPlaylist()}>
							<ReactTooltip effect="solid" place="right" />
							<GetAppIcon />
						</div>

						<div
							data-tip="Clear Playlist"
							className="round-button"
							onClick={() => {setShowClearPlaylistDialog(true)}}
						>
							<ReactTooltip effect="solid" place="right" />
							<ClearAllIcon fontSize="small" />
						</div>

						<Dialog
							open={showClearPlaylistDialog}
							onClose={closeClearPlaylistDialog}
						>
							<DialogTitle>{"Clear Playlist?"}</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Are you sure you want to clear your playlist?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={closeClearPlaylistDialog} color="default">
									Cancel
								</Button>
								<Button onClick={() => {clearPlaylist(); closeClearPlaylistDialog();}} color="primary">
									Clear Playlist
								</Button>
							</DialogActions>
						</Dialog>
					</div>

					{showImporterMode && (
						<TextImporter
							addVideos={(urls) => addVideos(urls)}
							showImporter={() => showImporter()}
						/>
					)}

					<div className="sidebar-playlist">
						<PlayList
							videos={videos}
							currentVideo={currentVideo}
							setVideoByIndex={setVideoByIndex}
							setVideos={setVideos}
						/>
					</div>
				</div>
			)}

			<div className="video-panel-section">
				<Toolbar toggle={darkMode.toggle} setSidebar={setSidebar} showSideBar={showSideBar} />
				<div className="grow d-flex center">
					<div className="w-100">
						<VideoPlayer
							currentVideoUrl={currentVideo?.url}
							previousVideoCallback={() => (previousVideoCallback())}
							nextVideoCallback={() => (nextVideoCallback())}
						/>
						{currentVideo && (
							<div className="flex center video-name">
								<EditableTextField
									uniqueKey={currentVideo.url}
									name="video-name-textfield"
									value={currentVideo.name ? currentVideo.name : `Video ${currentVideoIndex+1}`}
									updateValueCallback={(newName) => editVideoName(newName)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
