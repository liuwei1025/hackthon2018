// 商品列表

import Base from "../base/base"
import "./commodity.less"

var mockdata = require("../../mock/RecommendMockData.json")


export default class Commodity extends Base<{},{}>{
    render(){
        return (
            <div className="hack-commodity">
                <h1>站长选品助手</h1>
                {/* <Search/> */}
                <CommodityList />
            </div>
        )
    }
}

interface SearchProps{

}

class Search extends Base<SearchProps,{}>{
    render(){
        return(
            <div className="hack-commodity-search">

            </div>
        )
    }
}

type SKU = {
    name:string;
    price:string;
    commissionRatio:string;
    commission:string;
    "30天引入订单量":string;
    "支出佣金":string;
    url:string;
    img:string;
}

interface CommodityListProps{
    dataSource?:{
        skuIdList:SKU[]
    },
    listCount?:number;
}

interface CommodityListState{
    dataSource:{
        skuIdList:SKU[]
    },
    listCount:number;
}

export class CommodityList extends Base<CommodityListProps,CommodityListState>{

    state={
        dataSource:{
            skuIdList:[]
        },
        listCount:this.props.listCount || 6
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({dataSource:this.props.dataSource || mockdata})
        },10)
    }

    render(){
        let {dataSource:{skuIdList:list},listCount} = this.state;
        list.length = Math.min(list.length,listCount);
        return (
            <ul className="hack-commodity-list">
                {list.map((goods:SKU)=><Goods key={goods.url} data={goods}/>)}
            </ul>
        )
    }
}

interface GoodsProps{
    data:SKU;
}

class Goods extends Base<GoodsProps,{}>{
    render(){
        const {data} = this.props;
        return (
            <li>
                <img src={data.img} alt="" />
                <div className="hack-commodity-details">
                    <p>{data.name}</p>
                    <div className="hack-commodity-price">
                        {/* <input type="number" defaultValue={data.price}/> */}
                        <span className="price">{data.price}</span>
                    </div>
                    <div className="hack-commodity-commission">
                        <div style={{overflow:"hidden"}}>
                            <Text name="佣金比例" value={data.commissionRatio} className="commissionRatio"/>
                            <Text name="佣金" value={data.commission} className="commission"/>
                        </div>
                        <div style={{overflow:"hidden"}}>
                            <Text name="30天引入订单量" value={data["30天引入订单量"]} className="month"/>
                            <Text name="支出佣金" value={data["支出佣金"]} className="money"/>
                        </div>
                    </div>
                    <a href={data.url} target="_blank">我要推广</a>
                </div>
            </li>
        )
    }
}

function Text({name,value,className}){
    return (
        <div className={className}>
            <span className="name">{name}</span>
            <span className="value">{value}</span>
        </div>
    )
}