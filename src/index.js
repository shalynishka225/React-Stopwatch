import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import storage from "local-storage-fallback";
import { Layout, Menu } from "antd";
import Theme from "./components/Theme";
import Stopwatch from "./components/Stopwatch";

const { Header, Content, Footer } = Layout;

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

function getInitialTheme() {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? savedTheme : "light";
}

ReactDOM.render(
  <ThemeSwitcherProvider
    themeMap={themes}
    defaultTheme={getInitialTheme()}
    insertionPoint="styles-insertion-point"
  >
    <Layout className="layout">
      <Header className="header">
        <Menu theme={getInitialTheme()} mode="horizontal">
          <Theme />
        </Menu>
      </Header>
      <Content className="content">
        <div className="site-layout-content">
          <Stopwatch />
        </div>
      </Content>
      <Footer className="footer">©2021 Created by Artem Shevchuk</Footer>
    </Layout>
  </ThemeSwitcherProvider>,
  document.getElementById("root")
);
