// import {loginUser, logoutUser} from "@/features/auth/actions.ts";
// import type {ActionReducerMapBuilder} from "@reduxjs/toolkit";
// import type {UserAuth} from "../../../utils/types.ts";
// import {setSessionStorage} from "../../../utils/helper.ts";
//
// export const userReducer = (builder: ActionReducerMapBuilder<UserAuth>)=> {
//     builder
//         .addCase(loginUser.pending, () => {
//             // state.status = 'loading';
//         })
//         .addCase(loginUser.fulfilled, (state, action) => {
//             // state.status = 'succeeded';
//             state.user = action.payload;
//             setSessionStorage('u', JSON.stringify(action.payload))
//             // localStorage.setItem('user', JSON.stringify(action.payload));
//         })
//         .addCase(loginUser.rejected, (state, action) => {
//             // state.status = 'failed';
//             state.error = action.payload;
//         })
//         .addCase(logoutUser.fulfilled, (state) => {
//             state.user = null;
//             setSessionStorage('token')
//             localStorage.removeItem('user');
//         });
// }