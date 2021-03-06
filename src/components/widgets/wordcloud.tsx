import Base from "../base/base";
import Chart from "../charts/chart";
import Box from "../widgets/box";
import Rank from "../widgets/rank";
import "echarts-wordcloud";

/**
 * 怎样注释属性
 * @param {number} count 词云显示的数量
 */
interface WordProps {
    dataSource: {};
    count?: number;
    // Chartd的样式配置
    chartStyle?: React.CSSProperties;
}
interface WordState {
    options: any;
}

export default class WordCloud extends Base<WordProps, WordState> {
    constructor(props: WordProps) {
        super(props);
        this.state = {
            options: getWordOptions(props)
        };
    }
    componentDidMount() {}
    render() {
        const { dataSource, chartStyle } = this.props;
        const { options } = this.state;
        return (
            <div className="hack-content-wrapper">
                <Chart options={options} style={{ flex: 3, ...chartStyle }} />
                <Rank dataSource={dataSource} showIndex={true} count={10} />
            </div>
        );
    }
}

function getWordOptions(obj: WordProps) {
    let data = (function(data) {
        return Object.keys(data)
            .map(key => ({
                name: key.replace(/#\S+$/, ""),
                value: data[key],
                textStyle: createRandomItemStyle()
            }))
            .sort((v1, v2) => v2.value - v1.value);
    })(obj.dataSource);
    data.length = Math.min(obj.count || 30, data.length);
    data[0].textStyle.normal.color = "red";
    return {
        tooltip: {
            show: true
        },
        series: [
            {
                // name: obj.title,
                type: "wordCloud",
                size: ["80%", "80%"],
                textRotation: [0, 45, 90, -45],
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 14
                },
                width: "90%",
                data
            }
        ]
    };
}

function createRandomItemStyle() {
    return {
        normal: {
            color:
                "rgb(" +
                [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(",") +
                ")"
        },
        emphasis: {
            shadowBlur: 10,
            shadowColor: "#ccc"
        }
    };
}
