import { getUser } from '../utils';

export default function Dashboard() {
  const user = getUser();

  if (!user) {
    return <div className="text-center mt-5">Please login to continue.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.name}!</h2>
      <p>Role: <strong>{user.role}</strong></p>
      <p>Use the navigation bar to apply for leave, view status, or manage requests.</p>
    </div>
  );
}
