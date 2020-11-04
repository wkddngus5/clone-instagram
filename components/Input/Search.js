import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Search.module.css';

const activeIconSpanStyle = {
    position: 'absolute',
    top: '9px',
    left: '9px',
};

function Search({ type = 'text', value = '', placeholder = '', onChange }) {
    const [inputValue, setInputValue] = useState(value);
    const [isFocus, setIsFocus] = useState(false);
    const ref = useRef();

    useEffect(() => {
        document.addEventListener('click', ({ target }) => {
            if (!ref.current.contains(target)) {
                setIsFocus(false);
                return;
            }
            setIsFocus(true);
        });
    }, []);

    useEffect(() => {
        if (!isFocus) {
            return;
        }
        ref.current.querySelector('input').focus();
    }, [isFocus]);

    function clearInputValue(event) {
        event.preventDefault();
        
        setInputValue('');
        setIsFocus(false);
    }

    const spans = useMemo(() => {
        if (isFocus) {
            return (
                <>
                    <span
                        className={styles.iconSpan}
                        style={activeIconSpanStyle}
                    />
                    <div
                        className={styles.clearButton}
                        onClick={clearInputValue} />
                </>
            );
        }
        return (
            <>
                <div className={styles.spansContainer}>
                    <span className={styles.iconSpan} />
                    <span className={`${styles.span}`}>검색</span>
                </div>
            </>
        );
    }, [isFocus]);

    return (
        <div ref={ref} className={styles.Search}>
            <input
                type={type}
                className={`${styles.input}`}
                aria-label={placeholder}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            {spans}
        </div>
    );
}

export default Search;
