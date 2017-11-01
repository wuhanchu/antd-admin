import { request, config } from "utils";

const { api, oauthClient } = config;
const { user, userLogout, userLogin } = api;

export async function login(params) {
    return oauthClient.owner.getToken(params.username, params.password).catch(e => e);
}

export async function logout(params) {
    return request({
        url: userLogout,
        method: "get",
        data: params,
    });
}

export async function query(params) {
    return request({
        url: user.replace("/:id", ""),
        method: "get",
        data: params,
    });
}
