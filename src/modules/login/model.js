import { login } from "../app/services/app";
import { routerRedux } from "dva/router";

export default {
    namespace: "login",
    state: {
        loginLoading: false,
    },

    effects: {
        * login({
            payload,
        }, { put, call, select }) {
            const data = yield call(login, payload);
            console.log("data",data)
            const { locationQuery } = yield select(_ => _.app);
            if (data.data) {
                data.data.expires = data.expires.getTime();
                sessionStorage.setItem("token", JSON.stringify(data.data));
                const { from } = locationQuery;
                console.log("from",from);
                yield put({ type: "app/query" });
                if (from && from !== "/login") {
                    yield put(routerRedux.push(from));
                } else {
                    yield put(routerRedux.push("/dashboard"));
                }
            } else {
                throw data;
            }
        },
    },
    reducers: {
        showLoginLoading(state) {
            return {
                ...state,
                loginLoading: true,
            };
        },
        hideLoginLoading(state) {
            return {
                ...state,
                loginLoading: false,
            };
        },
    },
};
