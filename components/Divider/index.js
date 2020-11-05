import styles from './Divider.module.css';

function Divider({ content = '', style }) {
	return (
		<div
			className={styles.divider}
			style={style}>
			<div className={styles.horizontalLine}></div>
			<div
				className={styles.dividerText}
				style={{ display: content.length === 0 ? 'none' : 'block'}}>{ content }</div>
			<div className={styles.horizontalLine}></div>
		</div>
	)
}

export default Divider;
