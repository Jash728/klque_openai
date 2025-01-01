import ExperienceCard from "./ExperienceCard";
import GreetingSection from "./GreetingSection";
import MyProgressCard from "./MyProgressCard";
import MyTasksPanel from "./MyTasksPanel";
import TaskDashboard from "./TaskDashboard";
import ThisWeeksContentCard from "./ThisWeeksContentCard";

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-6 p-4 md:p-8">
      <GreetingSection />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MyProgressCard />
        <TaskDashboard />
        <ExperienceCard />
      </div>
    </div>
  );
};

export default HomePage;
