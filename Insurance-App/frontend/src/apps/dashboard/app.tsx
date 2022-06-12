import './static/style.css';
import Content from './components/content';
import Sidebar from './components/sidebar';
import { Navigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { LoginAtom } from '../../state/atoms';

const Dashboard = () => {
  const auth = useRecoilValue(LoginAtom);

  // not logged in
  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="full-w">
      <div className="h-screen flex">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
