import Base, { dataset } from "../base/base";
import "./style/rank.less";

type RankType = "";
type options = {
    dataSource: {
        [x: string]: number;
    };
    showIndex?: boolean;
    showValue?: boolean;
    color?: string;
};

interface RankProps {
    dataSource: dataset;
    type?: RankType;
    // 显示数量
    count?: number;
    showIndex?: boolean;
    showValue?: boolean;
}
interface RankState {}

export default class Rank extends Base<RankProps, RankState> {
    render() {
        let { dataSource, showIndex, showValue, count } = this.props;
        return (
            <div className="hack-rank">
                <div className="hack-rank-tabbar" />
                {Object.keys(dataSource).length && (
                    <RankList
                        dataSource={dataSource}
                        showIndex={true}
                        showValue={true}
                        count={count}
                    />
                )}
            </div>
        );
    }
}

interface RankListState {
    // 0表示升序 1表示降序
    sort: number;
}

class RankList extends Base<RankProps, RankListState> {
    state = {
        sort: 0
    };
    render() {
        let {
            dataSource: data,
            showIndex = false,
            showValue = false,
            count = 10000
        } = this.props;
        const { sort } = this.state;
        let _data = Object.keys(data)
            .map(key => ({
                name: key.match(/[\u4e00-\u9fa5]+|\w+/)[0],
                value: data[key]
            }))
            .sort(
                (c1, c2) => (sort ? c1.value - c2.value : c2.value - c1.value)
            );
        _data.length = Math.min(count, _data.length);
        let maxValue = !sort ? _data[0].value : _data[_data.length - 1].value;
        return (
            <ul className="hack-rank-content">
                {_data.map((p, i) => {
                    return (
                        <li key={p.name}>
                            {showIndex && (
                                <span className="hack-rank-index">
                                    {i + 1}.
                                </span>
                            )}
                            <span className="hack-rank-name">{p.name}</span>
                            <div className="hack-rank-bar">
                                <div
                                    className="bar"
                                    title={String(p.value)}
                                    style={{
                                        width: `${p.value / maxValue * 100}%`
                                    }}
                                />
                            </div>
                            {/* {
                                showValue && (
                                    <span className="hack-rank-value">{p.value}</span>
                                )
                            } */}
                        </li>
                    );
                })}
            </ul>
        );
    }
}
