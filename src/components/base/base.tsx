import * as React from "react";
import {is,fromJS} from "immutable"

export type OrEmpty<T> = T|{[x:string]:any};

interface BaseState{
    [x:string]:any;
}

export type dataset = {
    [x: string]: number;
};

export default class Base<Props,State extends BaseState> extends React.Component<Props,State>{
    public state:State;
    constructor (props:Props){
        super(props);
        this.state = {} as State;
    }
    shouldComponentUpdate(nextProps,nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
}