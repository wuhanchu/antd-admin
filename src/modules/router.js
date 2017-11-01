import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, routerRedux } from "dva/router";
import dynamic from "dva/dynamic";
import App from "./app";

const { ConnectedRouter } = routerRedux;

const Routers = function ({ history, app }) {
    const error = dynamic({
        app,
        component: () => import("./error/index"),
    });
    const routes = [
        {
            path: "/dashboard",
            models: () => [import("./dashboard/model")],
            component: () => import("./dashboard/index"),
        }, {
            path: "/login",
            models: () => [import("./login/model")],
            component: () => import("./login/index"),
        }, {
            path: "/user",
            models: () => [import("./user/model")],
            component: () => import("./user/index"),
        }, {
            path: "/user/:id",
            models: () => [import("./user/detail/model")],
            component: () => import("./user/detail/index"),
        }, {
            path: "/request",
            component: () => import("./request/index"),
        }, {
            path: "/UIElement/iconfont",
            component: () => import("./UIElement/iconfont/index"),
        }, {
            path: "/UIElement/search",
            component: () => import("./UIElement/search/index"),
        }, {
            path: "/UIElement/dropOption",
            component: () => import("./UIElement/dropOption/index"),
        }, {
            path: "/UIElement/layer",
            component: () => import("./UIElement/layer/index"),
        }, {
            path: "/UIElement/dataTable",
            component: () => import("./UIElement/dataTable/index"),
        }, {
            path: "/UIElement/editor",
            component: () => import("./UIElement/editor/index"),
        }
        // , {
        //     path: "/chart/ECharts",
        //     component: () => import("./chart/ECharts/index"),
        // }
        // , {
        //     path: "/chart/highCharts",
        //     component: () => import("./chart/highChartsindex/"),
        // }, {
        //     path: "/chart/Recharts",
        //     component: () => import("./chart/Recharts/index"),
        // }
        , {
            path: "/post",
            models: () => [import("./post/model")],
            component: () => import("./post/index"),
        },
    ];

    return (
        <ConnectedRouter history={history} >
            <App >
                <Switch >
                    <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
                    {
                        routes.map(({ path, ...dynamics }, key) => (
                            <Route
                                key={key}
                                exact
                                path={path}
                                component={dynamic({
                                    app,
                                    ...dynamics,
                                })}
                            />
                        ))
                    }
                    <Route component={error} />
                </Switch >
            </App >
        </ConnectedRouter >
    );
};

Routers.propTypes = {
    history: PropTypes.object,
    app: PropTypes.object,
};

export default Routers;
