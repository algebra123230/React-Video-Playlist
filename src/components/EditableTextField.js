import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";

const ENTER_CHAR_CODE = 13;

function EditableTextField({uniqueKey, name, value, updateValueCallback}) {
	const [editMode, setEditMode] = useState(false);
	const inputId = `${name}-input`;

	const handleBlur = (evt) => {
		updateValue(evt.target.value);
	};

	const handleClick = (evt) => {
		setEditMode(() => true);
	};

	const handleKeyPress = (evt) => {
		if (evt.charCode === ENTER_CHAR_CODE) {
			updateValue(evt.target.value);
		}
	}

	const updateValue = (value) => {
		setEditMode(() => false);
		updateValueCallback(value);
	}

	useEffect(() => {
		if (editMode) {
			document.getElementById(inputId).focus();
		}
	}, [editMode]);

	const getTextWidth = (text) => {
		let div = document.createElement('div');
		div.innerText = text;
		div.style.width = 'auto';
		div.style.visibility = 'hidden';
		div.style.display = 'inline-block';
		div.style.position = 'fixed';
		div.style.overflow = 'auto';
		document.body.append(div);
		let width = div.clientWidth;
		div.remove();
		return width;
	}

	const getInputWidth = (text) => {
		let width = getTextWidth(text) + 60;
		return width > 1280 ? 1280 : width;
	}

	const inputWidth = getInputWidth(value);

	return (
		<div style={{width: `${inputWidth}px`}}>
		<TextField
			key={uniqueKey}
			name={name}
			defaultValue={value}
			title={value}
			onBlur={handleBlur}
			onClick={handleClick}
			onKeyPress={handleKeyPress}
			disabled={!editMode}
			fullWidth={true}
			InputProps={{
				startAdornment: 
					<InputAdornment position="start">
						<IconButton><Edit /></IconButton>
					</InputAdornment>
				, id: inputId
			}}
		/>
		</div>
	);
}

export default EditableTextField;

