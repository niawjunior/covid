import React from "react"
import { List, Avatar, Card } from "antd"

const News = () => {
  const listData = []
  for (let i = 0; i < 10; i++) {
    listData.push({
      href: "http://ant.design",
      title: `ant design part ${i}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    })
  }

  return (
    <div>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 3,
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item key={item.title}>
            <Card>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default News
