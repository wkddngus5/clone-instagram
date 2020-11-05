import { useEffect, useState, useRef } from 'react';
import Popover from '../Popover';
import Divider from '../Divider';
import { Profile as ProfileIcon, Bookmark as BookmarkIcon, Setting as SettingIcon, Change as ChangeIcon } from '../Icon';
import styles from './Profile.module.css';

function Profile({ viewer, className }) {
    const ref = useRef();
    const [isActive, setIsActive] = useState(false);
    const { profile } = viewer;

    useEffect(() => {
        document.addEventListener('click', ({ target }) => {
            const isOutSideClicked = !ref.current.contains(target);
            if (isOutSideClicked) {
                setIsActive(false);
                return;
            }
            const isActiveProfile = ref.current.classList.contains(
                styles.isActive
            );
            setIsActive(!isActiveProfile);
        });
    }, []);

    const popoverContent = (
        <ul className={styles.profileMenuList}>
            <a>
                <li className={styles.profileMenu}>
                    <ProfileIcon />
                    프로필
                </li>
            </a>
            <a>
                <li className={styles.profileMenu}>
                    <BookmarkIcon />
                    저장됨
                </li>
            </a>
            <a>
                <li className={styles.profileMenu}>
                    <SettingIcon />
                    설정
                </li>
            </a>
            <a>
                <li className={styles.profileMenu}>
                    <ChangeIcon />
                    계정전환
                </li>
            </a>
            <Divider style={{ margin: '0 0 15px 0' }} />
            <a>
                <li className={styles.profileMenu}>로그아웃</li>
            </a>
        </ul>
    );

    return (
        <div
            ref={ref}
            className={`${className} ${styles.profile} ${
                isActive ? styles.isActive : ''
            }`}
        >
            <Popover content={popoverContent}>
                <span className={styles.profileSpan}>
                    <img
                        src={profile || '/profile.png'}
                        className={styles.profileImage}
                    />
                </span>
            </Popover>
        </div>
    );
}

export default Profile;
