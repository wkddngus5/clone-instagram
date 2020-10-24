import styles from './Button.module.css';

function Button({
	children,
	className,
	isDisabled = false,
	type="primary",
	onClick: onClickProp,
}) {
	function onClickButton(event) {
		event.preventDefault();
		if ( isDisabled || !onClickProp ) {
			return;
		}
		onClickProp();
	}

	return (
		<button
			className={`${ styles.Button } ${className} ${isDisabled && styles.isDisabled} ${styles[type]}`}
			onClick={onClickButton}>
			{ children }
		</button>
	)
}

export default Button;
