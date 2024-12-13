import { createSlice } from '@reduxjs/toolkit';

// 创建 reducer => 存放仓库数据，和定义仓库的行为
// 作用：createSlice => 创建  各自的reducer
// 语法
// 返回值 = createSlice => 对象
// createSlice({实例属性})
const ChessState = createSlice({
    name: 'me', // 作用域 唯一标识 => 我的模块存放的全局数据
    initialState: {
        name: '我是小明',
        age: 20,
        num: 100,
    },
    // reducer =》 定义方法修改仓库中的数据
    // 相对 vue muations => 定义修改 仓库中的数据
    /**
     *  1. 第一个参数 就是这个仓库的存放（模板）的数据
     */

    reducers: {
        /**
         *  2. 第二个参数 就是 调用这个方法传递过来的数据
         */
        changeName(state, val) {
            // 第一个参数 就是这个仓库的存放（模板）的数据   第二个参数 就是 调用这个方法传递过来的数据
            // 重新创建仓库数据吗？return {num：最新的数据} =>
            state.name = val.payload; // 就是对数据进行更新
        },
        /**
         *  3. 第三个参数 就是 调用这个方法传递过来的数据
         */
        addAge(state) {
            state.age += 1;
        },
        /**
         *  3. 第三个参数 就是 调用这个方法传递过来的数据
         */
        addNum(state, val) {
            state.num = state.num + val.payload;
        },
    },
});

// 将行为暴露出去
export const { changeName, addAge, addNum } = ChessState.actions; // 本质就是将这个方法暴漏出去

export default ChessState.reducer;
