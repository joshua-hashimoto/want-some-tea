import { useState } from "react";

import { Button, Layout } from "antd";

type Props = Record<string, unknown>;

const ExamplePage: React.FC<Props> = () => {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Layout.Content>
        <>
          <h1>Vite + React</h1>
          <div className="card">
            <Button
              type="primary"
              onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      </Layout.Content>
    </Layout>
  );
};

export default ExamplePage;
