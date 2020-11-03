import { useEffect, useState, useRef } from 'react';
import styles from './Profile.module.css';

function Profile({ viewer, className }) {
    const ref = useRef();
    const [isActive, setIsActive] = useState(false);
    const { profile } = viewer;

    useEffect( () => {
        document.addEventListener('click', ({target}) => {
            const isOutSideClicked = !ref.current.contains(target);
            if (isOutSideClicked) {
                setIsActive(false);
                return;
            }
            const isActiveProfile = ref.current.classList.contains(styles.isActive);
            setIsActive(!isActiveProfile);
        });
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} ${styles.profile} ${isActive ? styles.isActive : ''}`}>
            <span className={styles.profileSpan}>
                <img
                    src={profile || "/profile.png"}
                    className={styles.profileImage} />
            </span>
        </div>
    );
}

export default Profile;
