// import type {UserAuth} from "../../../utils/types.ts";
// import {getSessionStorage} from "../../../utils/helper.ts";
// import {userReducer} from "@/features/auth/reducer.ts";
// import {type ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
//
// const initialState: UserAuth = {
//     user: getSessionStorage('token') || null,
//     error: null,
// }
//
//
// const userAuthSlice = createSlice({
//     name: 'userAuth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder: ActionReducerMapBuilder<UserAuth>) => userReducer(builder)
// })
// export default userAuthSlice;