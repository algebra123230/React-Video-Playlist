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

	return (
		<TextField
			key={uniqueKey}
			name={name}
			defaultValue={value}
			margin="normal"
			error={value === ""}
			onBlur={handleBlur}
			onClick={handleClick}
			onKeyPress={handleKeyPress}
			disabled={!editMode}
			InputProps={{
				startAdornment: 
					<InputAdornment position="start">
						<IconButton><Edit /></IconButton>
					</InputAdornment>
				, id: inputId
			}}
		/>
	);
}

export default EditableTextField;

