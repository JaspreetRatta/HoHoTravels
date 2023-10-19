import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  List,
  Card,
  message,
  Button,
  Typography,
  Image,
  Space,
  Row,
  Col,
} from "antd";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

function MemoryList() {
  const [memories, setMemories] = useState([]);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    async function fetchMemories() {
      try {
        const response = await axios.post("/api/memories/get-all-memories", {
          user: user._id,
        });
        setMemories(response.data.data);
      } catch (error) {
        console.error("Error fetching memories:", error);
        // Handle error
      }
    }
    fetchMemories();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("https://hohoo-travels.vercel.app/api/memories/delete-memory", {
        _id: id,
      });
      console.log("Memory deleted :", response.data);
      message.success(response.data.message);
    } catch (error) {
      console.error("Error deleting memory:", error);
      // Handle error
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>My Travel Memories</Title>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={memories}
        renderItem={(memory) => (
          <List.Item>
            <Card
              title={memory.title}
              extra={
                <Button
                  danger
                  onClick={(e) => {
                    handleDelete(memory._id);
                  }}
                  shape="circle"
                />
              }
              hoverable
            >
              <Space direction="vertical" size={12}>
                <Text strong>{memory.location}</Text>

                {memory.images && memory.images[0] && (
                  <Row justify="center">
                    <Col span={12} offset={6} style={{ marginLeft: "6rem" }}>
                      <Image
                        width={200}
                        alt={memory.title}
                        src={memory.images[0]}
                        style={{ borderRadius: "8px" }}
                      />
                    </Col>
                  </Row>
                )}
                <div>
                  <Link to={`/client/src/Diary/showmore/${memory._id}`}>
                    {" "}
                    {/* Use memory ID in the URL */}
                    <Button size="default">Show More</Button>
                  </Link>
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default MemoryList;
