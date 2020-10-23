class Typograpy {
	static Title = ({ className = '', level = 1, children }) => {
		if ( level === 1 ) {
			return (<h1 className={className}>{children}</h1>)
		}
		if ( level === 2 ) {
			return (<h2>{children}</h2>)
		}
		if ( level === 3 ) {
			return (<h3>{children}</h3>)
		}
		if ( level === 4 ) {
			return (<h4>{children}</h4>)
		}
		if ( level === 5 ) {
			return (<h5>{children}</h5>)
		}
		if ( level === 6 ) {
			return (<h6>{children}</h6>)
		}
	}

	static Text = ({ children }) => {
		return (<p>{children}</p>)
	}
}

export default Typograpy;
