import Base, { OrEmpty,dataset } from "../base/base";
import Chart from "../charts/chart";
import Map from "../widgets/map";
import Box from "../widgets/box";
import WordCloud from "../widgets/wordcloud";
import Summary from "./summary";
import { CommodityList } from "./commodity";

import "./content.less";

const mockData = require("../../mock/ProfileMockData.json");
var RecommendMockData = require("../../mock/RecommendMockData.json");



interface ContentProps {}
interface DataSource {
    // 站长ID
    unionId: string;
    province: dataset;
    // 会员等级
    level: dataset;
    // 是否结婚
    marriage: dataset;
    // 用户价值分布
    valueGroup: dataset;
    // 用户年龄分布
    age: dataset;
    // 品类偏好
    actionGroupCate: dataset;
    // 品牌偏好
    brandFavor: dataset;
    // 购买力分布
    pricePrefer: dataset;
    // 用户客户端占比
    saleClient: dataset;
    // 用户受教育程度
    education?: dataset;
}
/**
 * 1. 用OrEmpty包裹起来：先将页面的结构展示出来再去显示数据，避免在没有数据时候不mount组件
 *      OrEmpty造成写代码时没有IDE的类型提示的BUG
 * 2. 如果不将数据拆分开传递给子组件的话 子组件在判断props是否变化时会产生额外的开销
 * 3. 在
 */
interface ContentState {
    dataSource: DataSource;
}

export default class Content extends Base<ContentProps, ContentState> {
    private summary: string[];
    constructor(props: ContentProps) {
        super(props);
        this.summary = ["level", "valueGroup", "pricePrefer", "saleClient"];
        this.state = {
            dataSource: {
                unionId: "",
                province: undefined,
                level: undefined,
                marriage: undefined,
                valueGroup: undefined,
                age: undefined,
                actionGroupCate: undefined,
                brandFavor: undefined,
                pricePrefer: undefined,
                saleClient: undefined,
                education: undefined
            }
        };
    }
    componentDidMount() {
        // 请求数据
        setTimeout(() => {
            this.setState({
                dataSource: mockData
            });
        }, 1000);
    }
    render() {
        
        const { dataSource: data,dataSource:{level,valueGroup,saleClient,pricePrefer} } = this.state;
        return (
            <div className="hack-content">
                <Summary
                    dataSource={{
                        level: level,
                        valueGroup: valueGroup,
                        pricePrefer: pricePrefer,
                        saleClient: saleClient
                    }}
                />
                <Box
                    size="large"
                    title="用户群体属性 - 地域分布"
                    style={{ width: "100%" }}
                >
                    {data.province && <Map dataSource={data.province} />}
                </Box>
                <Box
                    size="middle"
                    title="用户群体属性 - 年龄分布"
                    style={{ marginRight: 20 }}
                >
                    {data.age && (<UserAge dataSource={data.age} />)}
                </Box>
                <Box size="middle" title="用户群体属性 - 婚姻状况">
                    {data.marriage && (<UserGender dataSource={data.marriage} />)}
                </Box>
                <WordCloud
                    title="用户品牌偏好"
                    dataSource={data.brandFavor}
                    style={{ marginRight: 20 }}
                />
                <WordCloud
                    title="用户类目偏好"
                    count={50}
                    chartStyle={{ flex: 2 }}
                    dataSource={data.actionGroupCate}
                />
                <Box size="large" title="站长选品推荐">
                    <div className="hack-commodity hack-content-commodity">
                        <CommodityList
                            dataSource={RecommendMockData}
                            listCount={100}
                        />
                    </div>
                </Box>
            </div>
        );
    }
}

interface UserAgeProps {
    dataSource: dataset;
}

class UserAge extends Base<UserAgeProps, {}> {
    getChartOptions(source: dataset) {
        let category = [],
            data = [];
        Object.keys(source).map(key => {
            category.push(key);
            data.push(source[key]);
        });
        return {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: 100
            },
            xAxis: {
                type: "value",
                name: "人",
                axisLabel: {
                    formatter: "{value}"
                }
            },
            yAxis: {
                type: "category",
                data: category
            },
            series: [
                {
                    name: "人数",
                    type: "bar",
                    data
                }
            ]
        };
    }

    render() {
        return (
            <Chart
                id="hack-content-userage"
                options={this.getChartOptions(this.props.dataSource)}
            />
        );
    }
}
class UserGender extends Base<UserAgeProps, {}> {
    getChartOptions(source: dataset) {
        let data = Object.keys(source).map(key => {
            return {
                name: key,
                value: source[key]
            };
        });
        return {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: "scroll",
                orient: "vertical",
                right: 10,
                top: 20,
                bottom: 20,
                data: Object.keys(source),
                selected: Object.keys(source)
            },
            series: [
                {
                    name: "性别",
                    type: "pie",
                    radius: ["50%", "70%"],
                    center: ["40%", "50%"],
                    data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ]
        };
    }
    render() {
        return <Chart options={this.getChartOptions(this.props.dataSource)} />;
    }
}
