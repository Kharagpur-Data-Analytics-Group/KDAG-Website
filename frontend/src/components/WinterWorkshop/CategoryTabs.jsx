import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import CategoryTab from "./CategoryTab.jsx";

const { TabPane } = Tabs;

const StyledCategoryTabs = styled.div`
  .winter-workshop-category-tab {
    padding: 1rem;
    box-shadow: 3px 3px 10px 1px #ddd;
    border-radius: 10px;
    width: 100%; 
    text-align: center;
  }

  .ant-tabs-tab-btn {
    width: 100%;
  }

  .ant-tabs-nav-list {
    width: 100%;
  }

  .ant-tabs-tab {
    flex: 1 1 0px;
  }

  @media screen and (max-width: 800px) {
    .winter-workshop-category-tab {
      padding: 0;
      box-shadow: none;
      border-radius: 0;
    }
  }
`;

const TabButton = (props) => {
  return (
    <div className="winter-workshop-category-tab">
      {props.title}
    </div>
  );
};

const CategoryTabs = (props) => {
  return (
    <StyledCategoryTabs className="winter-workshop-category-tabs">
      <Tabs defaultActiveKey="1" size="large">
        {props.category.map((e) => (
          <TabPane tab={<TabButton title={e.title} />} key={e.tab}>
            <CategoryTab category={e} />
          </TabPane>
        ))}
      </Tabs>
    </StyledCategoryTabs>
  );
};

export default CategoryTabs;
