import React from 'react';

interface GameInfoProps {
    nextUser: string;
    winner: string;
    resetGame: () => void;
}
interface GameInfoState {
    nextUser: string;
    winner: string;
}
/**
 * 游戏信息
 */
class GameInfo extends React.Component<GameInfoProps, GameInfoState> {
    constructor(props: GameInfoProps) {
        super(props);
    }
    /**
     * 更新
     */
    // componentDidUpdate(prevProps: GameInfoProps) {
    //     if (prevProps.nextUser !== this.props.nextUser) {
    //         this.setState({ nextUser: this.props.nextUser });
    //     }
    //     if (prevProps.winner !== this.props.winner) {
    //         this.setState({ winner: this.props.winner });
    //     }
    // }
    /**
     * 棋子点击事件
     */
    handleClick = () => {
        this.props.resetGame();
    };

    render(): React.ReactNode {
        return (
            <div>
                {this.props.winner && (
                    <div className="mb-20 mt-20">
                        {this.props.winner === 'Draw'
                            ? '平局'
                            : `${this.props.winner} 胜利！`}
                        <button onClick={this.handleClick}>重新开始</button>
                    </div>
                )}
                {!this.props.winner && (
                    <div className="flex-cc mt-20">
                        下一个玩家：{' '}
                        <div className="w-20">{this.props.nextUser}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default GameInfo;
