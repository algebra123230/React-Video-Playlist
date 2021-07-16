import React, { useState, useRef, useEffect } from 'react';
import Plyr from 'plyr-react';
import LoopIcon from '@material-ui/icons/Loop';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const VideoPlayer = React.memo(React.forwardRef(({ currentVideoUrl }, ref) => {
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
						src: currentVideoUrl ?? 'https://cdn.plyr.io/static/blank.mp4',
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

export default function VideoContainer({ currentVideoUrl, previousVideoCallback, nextVideoCallback }) {
	const plyrRef = useRef();
	// can't use autoplay option because we lose the "ended" event
	// instead we'll programatically trigger "play" on loading next video
	const [loop, setLoop] = useState(false);
	const [autoplayNext, setAutoplayNext] = useState(false);

	useEffect(() => {
		if (plyrRef?.current?.plyr) {
			plyrRef.current.plyr.loop = loop;
		}
	}, [loop]);

	const autoPlayCallback = () => {
		if (plyrRef?.current?.plyr) {
			plyrRef.current.plyr.play();
		}
	};

	useEffect(() => {
		let player = plyrRef?.current?.plyr;
		if (player) {
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
		}
	}, [autoplayNext]);


	return (
		<div className="video-panel">
			<div>
				<div className={currentVideoUrl ? "video-container" : "video-container hidden"}>
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
						currentVideoUrl={currentVideoUrl}
						ref={plyrRef}
					/>

				</div>
				{!currentVideoUrl && (
					<div className="text-muted">
						<p>
							1. Click on the
							<span className="c-icon">
								<PlaylistAddIcon />
							</span>
							Playlist icon
						</p>
						<p>2. Add videos to playlist, 1 per line. You can add a custom name to videos (separated by space) E.g.: VideoURL NAME.</p>
						<p>3. Save playlist and watch video</p>
					</div>
				)}
			</div>
		</div>
	);
}
