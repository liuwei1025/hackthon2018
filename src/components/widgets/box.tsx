import Base from "../base/base"
import "./style/box.less"

export type size = "small"|"middle"|"large"

interface BoxProps{
    children:JSX.Element|JSX.Element[];
    size?:size;
    title?:string;
    // 自定义box样式
    classname?:string;
    style?:React.CSSProperties;
}
interface BoxState{

}

export default class Box extends Base<BoxProps,BoxState>{
    render(){
        const {size="middle",title="titlename",classname="",style={}} = this.props;
        return (
            <div className={`hack-box-${size} ${classname}`} style={style}>
                <p className="hack-box-title">{title}</p>
                {this.props.children}
            </div>
        )
    }
}