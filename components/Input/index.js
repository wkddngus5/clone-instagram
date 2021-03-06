import React, { useEffect, useState } from 'react';
import Search from './Search';
import styles from './Input.module.css';

export default function Input({
	type = 'text',
	value = '',
	placeholder = '',
	onChange,
}) {
	const [inputValue, setInputValue] = useState(value);

	useEffect( () => {
		if (onChange) {
			onChange(inputValue);
		}
	}, [inputValue]);

	const isActive = inputValue.length > 0;

	return (
		<div className={styles.Input}>
			<label className={styles.label}>
				<span className={`${styles.span} ${isActive ? styles.spanActive : '' }`}>{placeholder}</span>
				<input
					type={type}
					className={`${styles.input} ${isActive ? styles.inputActive : ''}`}
					aria-label={placeholder}
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)} />
			</label>
		</div>
	);
}

Input.Search = Search;