import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './Popover.module.css';

function Profile({ content, children }) {
    const contentRef = useRef();
    const childrenRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const [popoverStyle, setPopoverStyle] = useState({
        top: 0,
        left: 0,
    });
    const [popoverArrowStyle, setPopoverArrowStyle] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        document.addEventListener('click', ({ target, clientX, clientY }) => {
            const { current: childrenRefCurrent } = childrenRef;
            const isOutSideClicked = !childrenRefCurrent.contains(target);
            if (isOutSideClicked) {
                setIsActive(false);
                return;
            }
            const isActivePopover = childrenRefCurrent.classList.contains(styles.isActiveChildren);
            console.log()
            setIsActive(!isActivePopover);
            const {
                offsetTop,
                offsetLeft,
            } = childrenRefCurrent;
            const {
                width,
                height,
            } = childrenRefCurrent.getBoundingClientRect();

            const {
                width: contentWidth,
                height: contentHeight,
            } = contentRef.current.getBoundingClientRect();

            console.log(contentWidth);
            setPopoverStyle({
                top: `${offsetTop + height + 14}px`,
                left: `${offsetLeft - contentWidth + 50}px`,
                width: contentWidth,
                height: contentHeight,
            });
            setPopoverArrowStyle({
                left: `${contentWidth - 50 + (14 / 2)}px`,
            })
        }, []);
    }, []);

    return (
        <>
            <div
                className={`${styles.Popover} ${isActive ? styles.isActivePopover : ''}`}
                style={popoverStyle}>
                <div
                    className={styles.popoverArrow}
                    style={popoverArrowStyle} />
                <div
                    ref={contentRef}
                    className={styles.popoverContent}>
                    {content}
                </div>
            </div>
            <div
                ref={childrenRef}
                className={`${styles.popoverChildren} ${isActive ? styles.isActiveChildren : ''}`}>
                {children}
            </div>
        </>
    )
}

export default Profile;
