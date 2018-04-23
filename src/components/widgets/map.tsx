import Base from "../base/base";
import Box, { size } from "./box";
import Rank from "./rank";
import {isEmpty} from "../../utils"

// 引入 echarts 主模块。
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/map";
import "echarts/lib/chart/scatter";
import "echarts/map/js/china";
import "echarts/map/js/world";

import "./style/map.less";

interface MapProps {
    dataSource: any;
}
interface MapState {
    a:number;
}

export default class Map extends Base<MapProps, MapState> {
    private map: any;

    constructor(props) {
        super(props);
    }
    render() {
        const { dataSource } = this.props;
        return (
                <div className={"hack-container-map"}>
                    <div className="hack-map" />
                    <Rank
                            dataSource={dataSource}
                            showIndex = {true}
                            showValue = {true}
                    />
                </div>
        );
    }

    componentDidMount() {
        this.renderMap();
    }

    componentWillUpdate() {
        this.renderMap();
    }

    renderMap() {
        if (!this.map) {
            this.map = echarts.init(
                document.getElementsByClassName("hack-map")[0],
                "light"
            );
        }
        let options = (function(data) {
            if(isEmpty(data)){
                return
            }
            let value = [];
            let seriesdata = Object.keys(data).map(key => {
                value.push(data[key]);
                return ({
                    name: key,
                    value: data[key]
                })
            })
            return {
                tooltip: {},
                visualMap: {
                    min: 0,
                    max: Math.max(...value),
                    left: "left",
                    top: "bottom",
                    text: ["High", "Low"],
                    seriesIndex: [1],
                    inRange: {
                        color: ["#e0ffff", "#006edd"]
                    },
                    calculable: true
                },
                geo: {
                    map: "china",
                    roam: true,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: "rgba(0,0,0,0.4)"
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: "rgba(0, 0, 0, 0.2)"
                        },
                        emphasis: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                },
                series: [
                    {
                        type: "scatter",
                        coordinateSystem: "geo",
                        symbolSize: 20,
                        symbol:
                            "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
                        symbolRotate: 35,
                        label: {
                            normal: {
                                formatter: "{b}",
                                position: "right",
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                // color: '#F06C00'
                                color: "transparent"
                            }
                        }
                    },
                    {
                        name: "流量",
                        type: "map",
                        geoIndex: 0,
                        tooltip: { show: true },
                        data: seriesdata
                    }
                ]
            };
        })(this.props.dataSource);
        options && this.map.setOption(options, true);
    }
}