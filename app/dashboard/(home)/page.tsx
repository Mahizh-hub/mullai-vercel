import AttendanceAnalytics from "@/components/dashboard/main/AttendanceAnalytics";
import Header from "@/components/dashboard/main/Header";
import RecentActivity from "@/components/dashboard/main/RecentActivity";
import Stats from "@/components/dashboard/main/Stats";
import TeachersList from "@/components/dashboard/main/TeachersList";
import UpcomingEvents from "@/components/dashboard/main/UpcomingEvents";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 justify-center">
        <Header />
        <Stats />
      </div>

      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttendanceAnalytics />
          </div>
          <div className="lg:col-span-1">
            <UpcomingEvents />
            <RecentActivity />
          </div>
        </div>
      </div>

      <div className="px-6">
        <TeachersList />
      </div>
    </div>
  );
}
