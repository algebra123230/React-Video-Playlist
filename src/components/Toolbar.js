import React from 'react';
import WBSunnyIcon from '@material-ui/icons/WbSunnyOutlined';
import CodeIcon from '@material-ui/icons/CodeOutlined';
import ReactTooltip from 'react-tooltip';

export default function Toolbar({ toggle }) {
	return (
		<div className="toolbar">
			<span data-tip="Change mode" className="round-button-inverse" onClick={toggle}>
				<ReactTooltip effect="solid" place="right" />
				<WBSunnyIcon fontSize="small" />
			</span>
			<a
				target="_BLANK"
				rel="noopener noreferrer"
				href="https://github.com/PJijin/React-Video-Playlist"
				data-tip="View On Github"
				className="round-button-inverse"
			>
				<ReactTooltip effect="solid" place="right" />
				<CodeIcon fontSize="small" /> Github
			</a>
		</div>
	);
}
