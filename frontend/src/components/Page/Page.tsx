import { Col, Layout, Row } from "antd";

type PageProps = {
  children: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => (
  <Layout css={{ height: "100vh" }}>
    <Layout.Content css={{ height: "100%" }}>
      <Col span={24} css={{ height: "100%" }}>
        <Row align="middle" justify="center" css={{ height: "100%" }}>
          {children}
        </Row>
      </Col>
    </Layout.Content>
  </Layout>
);

export default Page;
