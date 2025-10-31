import React from 'react';
import styles from '../../style/Avatar.module.sass';
import { isEmptyObj, addDefaultAvatar } from '../../public/utils/globalFuncs.ts';

interface AvatarProps {
    user?: object | any;
    avatarFieldName?: string;
    additionalClass?: string;
    alternativeLetter?: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    const imgClass = props.additionalClass !== undefined ? props.additionalClass + " user-avatar" : "user-avatar";
    const defIconClass = props.additionalClass !== undefined ? props.additionalClass + ` ${styles['avatar']}` : styles['avatar'];
    const isExistAvatar =
        props.user !== undefined &&
        !isEmptyObj(props.user) &&
        props.avatarFieldName !== undefined &&
        props.user[props.avatarFieldName] !== undefined &&
        props.user[props.avatarFieldName] !== "";

    return (
        isExistAvatar
            ? <img className={imgClass} alt="Avatar icon" src={props.user![props.avatarFieldName!]} onError={addDefaultAvatar} />

            // <img className={imgClass} alt="Avatar" src={props.user![props.avatarFieldName!]} />
            : <div className={defIconClass}>
                <div className={styles['avatar-border']}>
                    <div className={styles['avatar-letter']}>
                        {props.alternativeLetter !== undefined ? props.alternativeLetter : '?'}
                    </div>
                </div>
            </div>
    );
};

export default Avatar;