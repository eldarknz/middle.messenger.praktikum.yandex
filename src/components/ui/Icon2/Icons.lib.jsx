import React from 'react';

import IconAngleRight from "./icons/angle_right.svg";
import IconArrowDown from "./icons/arrow_down.svg";
import IconArrowUp from "./icons/arrow_up.svg";
import IconComment from "./icons/comment.svg";
import IconDiary from "./icons/diary.svg";
import IconError from "./icons/error.svg";
import IconFile from "./icons/file.svg";
import IconFileBookmark from "./icons/file_bookmark.svg";
import IconFileLock from "./icons/file_lock.svg";
import IconFilePlus from "./icons/file_plus.svg";
import IconPen from "./icons/pen.svg";
import IconSetting from "./icons/setting.svg";
import IconUsers from "./icons/users.svg";
import IconClose from "./icons/close.svg";
import IconCheck from "./icons/check.svg";

export const iconsLibrary = {
    angle_right: (props) => <IconAngleRight {...props} />,
    arrow_down: (props) => <IconArrowDown {...props} />,
    arrow_up: (props) => <IconArrowUp {...props} />,
    comment: (props) => <IconComment {...props} />,
    diary: (props) => <IconDiary {...props} />,
    error: (props) => <IconError {...props} />,
    file: (props) => <IconFile {...props} />,
    file_bookmark: (props) => <IconFileBookmark {...props} />,
    file_lock: (props) => <IconFileLock {...props} />,
    file_plus: (props) => <IconFilePlus {...props} />,
    pen: (props) => <IconPen {...props} />,
    setting: (props) => <IconSetting {...props} />,
    users: (props) => <IconUsers {...props} />,
    close: (props) => <IconClose {...props} />,
    check: (props) => <IconCheck {...props} />
};