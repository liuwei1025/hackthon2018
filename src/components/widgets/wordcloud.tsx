import Base from "../base/base";
import Chart from "../charts/chart";
import Box from "../widgets/box";
import Rank from "../widgets/rank"
import "echarts-wordcloud";

interface WordProps {
    title: string;
    dataSource: {};
    count?: number;
    style?: React.CSSProperties;
    chartStyle?:React.CSSProperties;
}
interface WordState {
    options: any;
    a:number;
}

export default class WordCloud extends Base<WordProps, WordState> {
    constructor(props: WordProps) {
        super(props);
        // this.state = {
        //     options: getWordOptions(props),
        //     a:2
        // };
    }
    componentDidMount() {}
    render() {
        const { title, style = {},dataSource, chartStyle } = this.props;
        const {options} = this.state;
        return (
            <Box size="middle" title={title} style={style}>
                <div className="hack-content-wrapper">
                    <Chart options={options} style={{flex:3,...chartStyle}}/>
                    <Rank dataSource={dataSource} showIndex={true} count={10}/>
                </div>
            </Box>
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
                name: obj.title,
                type: "wordCloud",
                size: ["80%", "80%"],
                textRotation: [0, 45, 90, -45],
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 14
                },
                width:"90%",
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
                    shadowColor: '#ccc'
                }
    };
}
