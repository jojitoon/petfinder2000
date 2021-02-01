import React, { useEffect } from 'react';
import { Layout, Menu, Carousel, Card, Divider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts } from '../Store/actions/adverts.action';
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const cardStyle = { margin: '8px', width: 240 };
const Home = () => {
  const dispatch = useDispatch();

  const { allAdverts } = useSelector(({ advertReducer }) => ({
    fetching: advertReducer.fetching,
    allAdverts: advertReducer.allAdverts,
  }));

  // const [searchValue, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">All</Menu.Item>
        </Menu>
      </Header>
      <Carousel autoplay dotPosition="left" effect="fade">
        <div>
          <h3 style={contentStyle}>Pet Finder 2000</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Content style={{ padding: '0 50px', minHeight: '90vh' }}>
        <Title>Pet Finder 2000</Title>

        <Divider orientation="left">Pet Adversts</Divider>
        <div
          style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        >
          {allAdverts.map((ads) => (
            <Card
              onClick={() => console.log('clicked')}
              hoverable
              style={cardStyle}
              cover={<img alt="pet" src={ads.imageUrl} height="250px" />}
            >
              <Meta title={ads.title} description={ads.type} />
            </Card>
          ))}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Pet Finder 2000 ©2021 Created by jojitoon
      </Footer>
    </Layout>
  );
};

export default Home;
