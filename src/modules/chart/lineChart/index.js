import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import Container from "../Container";

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    }, {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    }, {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    }, {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    }, {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    }, {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    }, {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const colProps = {
    lg: 12,
    md: 24,
};

const SimpleLineChart = () => (
    <Container>
        <LineChart
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{
                    r: 8,
                }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    </Container>
);

const VerticalLineChart = () => (
    <Container>
        <LineChart
            layout="vertical"
            width={600}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line dataKey="pv" stroke="#8884d8" />
            <Line dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    </Container>
);

const DashedLineChart = () => (
    <Container>
        <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
    </Container>
);

// CustomizedDotLineChart
const CustomizedDot = ({ cx, cy, payload }) => {
    if (payload.value > 2500) {
        return (
            <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
                <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
            </svg>
        );
    }

    return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
            <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
        </svg>
    );
};

CustomizedDot.propTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    payload: PropTypes.object,
};

const CustomizedDotLineChart = () => (
    <Container>
        <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={<CustomizedDot />} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    </Container>
);

const EditorPage = () => (
    <div className="content-inner">
        <Button
            type="primary"
            size="large"
            style={{
                position: "absolute",
                right: 0,
                top: -48,
            }}
        >
            <a href="http://recharts.org/#/en-US/examples/TinyBarChart" target="blank">Show More</a>
        </Button>
        <Row gutter={32}>
            <Col {...colProps}>
                <Card title="SimpleLineChart">
                    <SimpleLineChart />
                </Card>
            </Col>
            <Col {...colProps}>
                <Card title="DashedLineChart">
                    <DashedLineChart />
                </Card>
            </Col>
            <Col {...colProps}>
                <Card title="CustomizedDotLineChart">
                    <CustomizedDotLineChart />
                </Card>
            </Col>
            <Col {...colProps}>
                <Card title="VerticalLineChart">
                    <VerticalLineChart />
                </Card>
            </Col>
        </Row>
    </div>
);

export default EditorPage;
