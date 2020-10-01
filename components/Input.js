import React, { useEffect, useState } from 'react';
import styles from './Input.module.css';

export default function Input({ value = '', placeholder = '' }) {
	const [inputValue, setInputValue] = useState(value);

	useEffect( () => {
		setInputValue(value);
	}, [value]);

	return (
		<div className={styles.Input}>
			<div>
				<label>
					<span>{placeholder}</span>
					<input
						aria-label={placeholder}
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)} />
				</label>
			</div>
		</div>
	);
}
