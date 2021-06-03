import React, { useState, useRef, useEffect } from 'react';
import Plyr from 'plyr-react';
import LoopIcon from '@material-ui/icons/Loop';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const VideoPlayer = React.memo(React.forwardRef(({ currentVideo }, ref) => {
	return (
		<Plyr
		ref={ref}
		options={{
			controls: [
				'play',
				'progress',
				'current-time',
				'duration',
				'mute',
				'volume',
				'settings',
				'download',
				'fullscreen',
			],
		}}
		source={{
			type: 'video',
				sources: [
					{
						src: currentVideo.url,
						type: 'video/mp4',
						size: 720
					}
				]
		}}
		/>
	);
}));

// TODO use localstorage for settings
const getInitialPlyrSettings = () => {
	const data = localStorage.getItem("plyr");
	const plyrData = JSON.parse(data);
	if (plyrData) {
		return plyrData;
	}
	return {};
};

export default function VideoContainer({ currentVideo, previousVideoCallback, nextVideoCallback }) {
	const plyrRef = useRef();
	// can't use autoplay option because we lose the "ended" event
	// instead we'll programatically trigger "play" on loading next video
	const [loop, setLoop] = useState(false);
	const [autoplayNext, setAutoplayNext] = useState(false);

	useEffect(() => {
		plyrRef.current.plyr.loop = loop;
	}, [loop]);

	const autoPlayCallback = () => {
		plyrRef.current.plyr.play();
	};

	useEffect(() => {
		let player = plyrRef.current.plyr;
		if (autoplayNext) {
			player.on('ended', nextVideoCallback);
			player.on('ready', autoPlayCallback);
		} else {
			player.off('ready', autoPlayCallback);
			player.off('ended', nextVideoCallback);
		}

		return () => {
			player.off('ready', autoPlayCallback);
			player.off('ended', nextVideoCallback);
		}
	}, [autoplayNext]);

	return (
		<div className="video-panel">
			{currentVideo ? (
				<div className="video-container">
					<div className="additional-controls">
						<div title="Previous Video">
							<SkipPreviousIcon onClick={e => {previousVideoCallback()}}/>
						</div>
						<div className={loop ? "toggled" : ""} title="Loop">
							<LoopIcon onClick={e => {
								setLoop(() => !loop);
								setAutoplayNext(() => false);
							}}/>
						</div>
						<div className={autoplayNext ? "toggled" : ""} title="Autoplay Next">
							<PlayCircleOutlineIcon onClick={e => {
								setAutoplayNext(() => !autoplayNext);
								setLoop(() => false);
							}}/>
						</div>
						<div title="Next Video">
							<SkipNextIcon onClick={e => {nextVideoCallback()}}/>
						</div>
					</div>
					<VideoPlayer
						currentVideo={currentVideo}
						ref={plyrRef}
					/>
					<div className="flex center label-name">{currentVideo.name}</div>
				</div>
			) : (
				<div className="text-muted">
					<p>
						1. Click on the
						<span className="c-icon">
							<PlaylistAddIcon />
						</span>
						Playlist icon
					</p>
					<p>2. Add URLs separated by comma</p>
					<p>3. Save playlist and watch video</p>
				</div>
			)}
		</div>
	);
}
