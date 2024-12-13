import React, { useState, useCallback } from 'react';

// 定义 ChildComponent 的 props 类型
interface ChildComponentProps {
    count: number;
    onClick: () => void;
}

/**
 * 子组件，使用 React.memo() 避免不必要的重新渲染
 */
const ChildComponent: React.FC<ChildComponentProps> = React.memo(
    ({ count, onClick }: ChildComponentProps) => {
        console.log('ChildComponent rendered');
        /**
         * 点击事件
         */
        const handleClick = () => {
            onClick();
        };

        return (
            <div>
                <p>Count: {count}</p>
                {/* <p onClick={handleClick}>Click me to call onClick</p> */}
            </div>
        );
    }
);

/**
 * 父组件，确保传递给子组件的 props 引用稳定
 */
const ParentComponent = () => {
    console.log('ParentComponent rendered');

    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);

    // 使用 useCallback 确保 onClick 函数的引用稳定
    const handleClick = useCallback(() => {
        setCount1((prevCount) => prevCount + 1);
    }, []);

    const handleClick1 = useCallback(() => {
        setCount1((prevCount) => prevCount + 1);
    }, []);

    return (
        <div>
            <h1 onClick={handleClick1}>Parent Component : {count1}</h1>
            <ChildComponent count={count} onClick={handleClick} />
        </div>
    );
};

export default ParentComponent;
