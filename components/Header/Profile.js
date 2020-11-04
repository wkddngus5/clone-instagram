import { useEffect, useState, useRef } from 'react';
import Popover from '../Popover';
import Divider from '../Divider';
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

    const popoverContent = (
        <ul className={styles.profileMenuList}>
            <li>프로필</li>
            <li>저장됨</li>
            <li>설정</li>
            <li>계정전환</li>
            <Divider />
            <li>로그아웃</li>
        </ul>
    )

    return (
        <div
            ref={ref}
            className={`${className} ${styles.profile} ${isActive ? styles.isActive : ''}`}>
            <Popover
                content={popoverContent}>
                <span className={styles.profileSpan}>
                    <img
                        src={profile || "/profile.png"}
                        className={styles.profileImage} />
                </span>
            </Popover>
        </div>
    );
}

export default Profile;
