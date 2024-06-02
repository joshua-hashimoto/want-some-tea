import { useState } from "react";

import { Button, Col, Layout, Row } from "antd";

type Props = Record<string, unknown>;

const ExamplePage: React.FC<Props> = () => {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Layout.Content>
        <Col span={24}>
          <Row justify="center">
            <Col>
              <h1>Vite + React</h1>
              <div className="card">
                <Button
                  type="primary"
                  onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </Button>
                <p
                  css={{
                    fontSize: "2rem",
                  }}>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </Col>
          </Row>
        </Col>
      </Layout.Content>
    </Layout>
  );
};

export default ExamplePage;
