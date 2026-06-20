import React from "react";
import { Tabs } from "antd";
import snowflake from "../../assets/pics/winterworkshop/snow1black.svg"

import CategoryTabs from "./CategoryTabs";

const { TabPane } = Tabs;

const DayTabs = (props) => {
  return (
    <div>
      <Tabs defaultActiveKey="0" tabPosition="left" size="small">
        {props.days.map((e) => (
          <TabPane tab={<div>
            <img src={snowflake} width={15} alt="snowflake" /> {e.day}
          </div>} key={e.id} disabled={!e.status}>
            <CategoryTabs category={e.category} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default DayTabs;
