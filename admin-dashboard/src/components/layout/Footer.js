
import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2023, made with
            {<HeartFilled />} by
            <a href="#pablo" className="font-weight-bold" target="_blank">
              CodeLand
            </a>
            for a better web.
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a
                  href="localhost:3000/"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  CodeLand
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
