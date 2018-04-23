import React from "react";

// import Sider from "./sider/sider"
// import Header from "./header/header"
import Content from "./content/content";
import Commodity from "./content/commodity";

import "../assets/style/layout.less";

const Root = ({ children }) => {
    return <div className="root">{children}</div>;
};

const Container = ({ children }) => {
    return <div className="container">{children}</div>;
};

export default class Index extends React.Component {
    render() {
        return (
            <Root>
                <Content />
                <Commodity/>
            </Root>
        );
    }
}
