import Base, { dataset } from "../base/base";
import { isEmpty } from "../../utils";
import Chart from "../charts/chart";
import Box from "../widgets/box";

interface SummaryProps {
    dataSource: {
        level: dataset;
        saleClient: dataset;
        valueGroup: dataset;
        pricePrefer: dataset;
    };
}
export default class Summary extends Base<SummaryProps, {}> {
    getOptions() {
        return (({ level, valueGroup, pricePrefer, saleClient }) => {
            // 南丁格尔图
            let levelOptions =
                !isEmpty(level) &&
                (data => ({
                    visualMap: {
                        // 不显示 visualMap 组件，只用于明暗度的映射
                        show: false,
                        // 映射的最小值为 80
                        min: 80,
                        // 映射的最大值为 600
                        max: 400,
                        inRange: {
                            // 明暗度的范围是 0 到 1
                            colorLightness: [1, 0]
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{b} : <br/>{c} ({d}%)"
                    },
                    series: [
                        {
                            type: "pie",
                            radius: "55%",
                            data: Object.keys(data)
                                .map(key => ({
                                    name: key,
                                    value: data[key]
                                }))
                                .sort(function(a, b) {
                                    return a.value - b.value;
                                }),
                            roseType: "angle",
                            label: {
                                normal: {
                                    textStyle: {
                                        color: "rgba(0, 0, 0, 0.5)"
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: "rgba(0, 0, 0, 0.5)"
                                    }
                                }
                            }
                        }
                    ]
                }))(level);
            // 柱状图
            let valueGroupOptions =
                !isEmpty(valueGroup) &&
                (data => ({
                    color: ["#3398DB"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        top: "5%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: Object.keys(data),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name: "数量",
                            type: "bar",
                            barWidth: "60%",
                            data: Object.keys(data).map(key => data[key])
                        }
                    ]
                }))(valueGroup);
            // 雷达图
            let pricePreferOptions =
                !isEmpty(pricePrefer) &&
                (data => ({
                    legend: {
                        bottom: 5,
                        data: ["用户价格偏好"],
                        itemGap: 20,
                        textStyle: {
                            color: "#fff",
                            fontSize: 14
                        },
                        selectedMode: "single"
                    },
                    radar: {
                        indicator: (data => {
                            var max = 0;
                            Object.keys(data).map(key => {
                                max = Math.max(max, data[key]);
                            });
                            return Object.keys(data)
                                .map(key => ({
                                    name: key,
                                    max: max * 1.2
                                }))
                                .reverse();
                        })(data),
                        splitNumber: 5,
                        name: {
                            textStyle: {
                                color: "rgb(238, 197, 102)"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: [
                                    "rgba(238, 197, 102, 0.1)",
                                    "rgba(238, 197, 102, 0.2)",
                                    "rgba(238, 197, 102, 0.4)",
                                    "rgba(238, 197, 102, 0.6)",
                                    "rgba(238, 197, 102, 0.8)",
                                    "rgba(238, 197, 102, 1)"
                                ].reverse()
                            }
                        },
                        splitArea: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(238, 197, 102, 0.5)"
                            }
                        }
                    },
                    series: [
                        {
                            name: "价格偏好",
                            type: "radar",
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    opacity: 0.5
                                }
                            },
                            data: [Object.keys(data).map(key => data[key])],
                            symbol: "none",
                            itemStyle: {
                                normal: {
                                    color: "#F9713C"
                                }
                            },
                            areaStyle: {
                                normal: {
                                    opacity: 0.1
                                }
                            }
                        }
                    ]
                }))(pricePrefer);

            let saleClientOptions =
                !isEmpty(saleClient) &&
                (data => ({
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: "vertical",
                        x: "left",
                        data: Object.keys(data)
                    },
                    series: [
                        {
                            name: "流量入口",
                            type: "pie",
                            radius: "65%",
                            center: ["50%", "50%"],
                            selectedMode: "single",
                            data: Object.keys(data).map(key => ({
                                name: key,
                                value: data[key]
                            })),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                }))(saleClient);
            return {
                levelOptions,
                valueGroupOptions,
                pricePreferOptions,
                saleClientOptions
            };
        })(this.props.dataSource);
    }
    render() {
        const {
            levelOptions,
            valueGroupOptions,
            pricePreferOptions,
            saleClientOptions
        } = this.getOptions();
        return (
            <div className="hack-content-header">
                <Box size="small" title="用户群体属性 - 会员等级分布">
                    {levelOptions && <Chart options={levelOptions} />}
                </Box>
                <Box size="small" title="用户群体属性 - 用户价值分布">
                    {valueGroupOptions && <Chart options={valueGroupOptions} />}
                </Box>
                <Box
                    size="small"
                    title="用户群体属性 - 价格偏好分布"
                    style={{ flex: 6 }}
                >
                    {pricePreferOptions && (
                        <Chart options={pricePreferOptions} />
                    )}
                </Box>
                <Box
                    size="small"
                    title="用户群体属性 - 用户终端分布"
                    style={{ marginRight: 0 }}
                >
                    {saleClientOptions && <Chart options={saleClientOptions} />}
                </Box>
            </div>
        );
    }
}
