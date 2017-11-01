/* global window */
import axios from "axios";
import qs from "qs";
import jsonp from "jsonp";
import lodash from "lodash";
import pathToRegexp from "path-to-regexp";
import { message } from "antd";
import { YQL, CORS } from "./config";
import { routerRedux } from "dva/router";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

/**
 * 跳转到登录界面
 * @returns {*}
 *
 */
function jumpToLogin() {
    const from = location.pathname;
    if (from !== "/login") {
        console.log("jumpToLogin");
        window.location.href = `${location.origin}/login?from=${from}`;
    } else {
        return new Promise((resolve) => {
            resolve({});
        });
    }
}

const fetch = (options) => {
    let {
        method = "get",
        data,
        fetchType,
        url,
    } = options;

    const cloneData = lodash.cloneDeep(data);

    try {
        let domin = "";
        if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
            domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
            url = url.slice(domin.length);
        }
        const match = pathToRegexp.parse(url);
        url = pathToRegexp.compile(url)(data);
        for (const item of match) {
            if (item instanceof Object && item.name in cloneData) {
                delete cloneData[item.name];
            }
        }
        url = domin + url;
    } catch (e) {
        message.error(e.message);
    }

    if (fetchType === "JSONP") {
        return new Promise((resolve, reject) => {
            jsonp(url, {
                param: `${qs.stringify(data)}&callback`,
                name: `jsonp_${new Date().getTime()}`,
                timeout: 4000,
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve({ statusText: "OK", status: 200, data: result });
            });
        });
    } else if (fetchType === "YQL") {
        url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`;
        data = null;
    }

    if (cloneData && cloneData.pageSize) {
        cloneData.limit = cloneData.pageSize;
    }
    if (cloneData && cloneData.page) {
        cloneData.offset = (cloneData.page - 1) * cloneData.limit;
    }

    // 增加access_token
    let token = sessionStorage.getItem("token");
    if (token) {
        // 刷新token
        return new Promise((resolve, reject) => {
            token = JSON.parse(token);
            console.log("token", token);
            if (token.expires > Date.now()) {
                resolve(token);
            } else {
                new ClientOAuth2Token(oauthClient, token).refresh().then((token) => {
                    token.data.expires = token.expires.getTime();
                    resolve(token.data);
                });
            }
        }).catch(e => jumpToLogin()).then((token) => {
            // 设置
            sessionStorage.setItem("token", JSON.stringify(token));

            // 设置报头
            axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;

            switch (method.toLowerCase()) {
            case "get":
                return axios.get(url, {
                    params: cloneData,
                });
            case "delete":
                return axios.delete(url, {
                    data: cloneData,
                });
            case "post":
                return axios.post(url, qs.stringify({ ...cloneData }));
            case "put":
                return axios.put(url, qs.stringify({ ...cloneData }));
            case "patch":
                return axios.patch(url, qs.stringify({ ...cloneData }));
            default:
                return axios(options);
            }
        });
    }

    axios.defaults.headers.common.Authorization = null;
    return new Promise((resolve, reject) => {
        resolve({});
    });
};

export default function request(options) {
    if (options.url && options.url.indexOf("//") > -1) {
        const origin = `${options.url.split("//")[0]}//${options.url.split("//")[1].split("/")[0]}`;
        if (window.location.origin !== origin) {
            if (CORS && CORS.indexOf(origin) > -1) {
                options.fetchType = "CORS";
            } else if (YQL && YQL.indexOf(origin) > -1) {
                options.fetchType = "YQL";
            } else {
                options.fetchType = "JSONP";
            }
        }
    }

    return fetch(options).then((response) => {
        const { statusText, status } = response;
        let data = options.fetchType === "YQL" ? response.data.query.results.json : response.data;
        if (data instanceof Array) {
            data = {
                list: data,
            };
        }
        return Promise.resolve({
            success: true,
            message: statusText,
            statusCode: status,
            ...data,
        });
    }).catch((error) => {
        const { response } = error;
        let msg;
        let statusCode;
        if (response && response instanceof Object) {
            const { data, statusText } = response;
            statusCode = response.status;
            msg = data.message || statusText;
        } else {
            statusCode = 600;
            msg = error.message || "Network Error";
        }
        return Promise.reject({ success: false, statusCode, message: msg });
    });
}
