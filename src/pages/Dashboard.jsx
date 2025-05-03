import Checkin from "../components/Checkin";
import LogList from "../components/LogList";

function Dashboard() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-gray-900">
      <div className="fixed inset-0 top-0 left-0">
        <img
          src="/images.jpg"
          alt="Cursed Scroll Background"
          className="h-full w-full object-cover opacity-60"
        />
      </div>
      <Checkin />
      <LogList />
    </div>
  );
}

export default Dashboard;
