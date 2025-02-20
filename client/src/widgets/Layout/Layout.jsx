import Nav from '../Nav/Nav';
import { Outlet } from 'react-router';

export default function Layout({ user, setUser }) {
  return (
    <>
      <Nav user={user} setUser={setUser} />
      <Outlet />
    </>
  );
}
