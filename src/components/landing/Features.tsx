import { Calendar, CheckSquare, BarChart3 } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Task Calendar",
    description:
      "Visualize your tasks in a calendar view to better manage your schedule and deadlines.",
  },
  {
    icon: <CheckSquare className="h-6 w-6 text-primary" />,
    title: "Task Management",
    description:
      "Create, organize, and track your tasks with our intuitive interface.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Progress Tracking",
    description:
      "Monitor your productivity and track completion rates with detailed analytics.",
  },
];