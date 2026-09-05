import React from "react";
import { Tabs } from "antd";

import CategoryTab from "./CategoryTab";

const { TabPane } = Tabs;

const TabButton = (props) => {
  return (
    <div className="winter-workshop-category-tab">
      {props.title}
    </div>
  )
}

const CategoryTabs = (props) => {
  return (
    <div className="winter-workshop-category-tabs">
      <Tabs defaultActiveKey="1" size="large">
        {props.category.map((e) => (
          <TabPane tab={<TabButton title={e.title} />} key={e.tab}>
            <CategoryTab category={e} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
