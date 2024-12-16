/* eslint-disable @netsells/require-jsdoc-except/require-jsdoc */
import './App.css';
// import GameIndex from './chess/GameIndex';
import GameIndex2 from './chess_class';
// import GameIndex2 from './chess_class';
import React from 'react';
/**
 * 主页面
 */

const App: React.FC = () => {
    return (
        <div>
            <GameIndex2></GameIndex2>
        </div>
    );
};

export default App;
