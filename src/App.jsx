import React from 'react';

import styles from "./App.module.css";
import { Button } from "./components/ui/Button/Button";
import Checkbox from "./components/ui/Checkbox/Checkbox";
import { Tag } from "./components/ui/Tag/Tag";

const tagColors = [
    "violet",
    "green",
    "green-light",
    "red",
    "orange",
    "blue",
    "blue-dark",
    "yellow"
];

const App = () => {
    return (
        <div
            className={styles.main}
        >

            <Button value="+ Добавить" />
            <br />
            <div style={{ paddingTop: 50, width: 249 }}>
                {
                    tagColors.map(item => (
                        <Tag color={item} />
                    ))
                }
            </div>
            <div style={{ paddingTop: 50 }}>
                <Checkbox label="Комментарий" />
            </div>
        </div>
    )
}

export default App