import * as React from "react"

// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';

// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

import Base from "../base/base"

import "./chart.less"

interface ChartProps{
    options:object;
    id?:string;
    style?:React.CSSProperties;
}

interface ChartState{
    id:string
}

export default class Chart<T extends ChartProps> extends Base<T,ChartState>{
    public chart:any;
    constructor(props){
        super(props);
        this.state = {
            id:props.id || String(new Date().getTime()).slice(-5) + String(Math.random()).slice(-10)
        }
    }
    render(){
        const {id} = this.state;
        return (
            <div className="hack-chart" id={id} style={this.props.style}></div>
        )
    }
    componentDidMount(){
        this.renderChart();
    }
    componentDidUpdate(prevProps,prevState){
        this.renderChart();
    }
    renderChart(){
        const {options} = this.props;
        if(!this.chart){
            this.chart = echarts.init(document.getElementById(this.state.id),"light");
            this.chart.setOption(options)
        }
    }
}