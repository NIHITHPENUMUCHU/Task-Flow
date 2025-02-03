import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Star } from "lucide-react";
import { LoadingAnimation } from "@/components/ui/loading-animation";

export default function Calendar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate loading progress
        const interval = setInterval(() => {
          setLoadingProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);

        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .order("due_date", { ascending: true });

        clearInterval(interval);
        setLoadingProgress(100);

        if (error) {
          toast({
            title: "Error fetching tasks",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setTasks(data || []);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.due_date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const modifiers = {
    taskDay: (date: Date) => getTasksForDate(date).length > 0,
  };

  const modifiersStyles = {
    taskDay: {
      color: "var(--accent)",
      position: "relative" as const, // Type assertion to fix the position property
    },
  };

  if (loading) {
    return <LoadingAnimation progress={loadingProgress} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SidebarNav onSignOut={handleSignOut} />
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Calendar</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-4 rounded-lg shadow border border-border">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  components={{
                    DayContent: ({ date }) => (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {date.getDate()}
                        {getTasksForDate(date).length > 0 && (
                          <Star className="absolute top-0 right-0 h-3 w-3 text-accent" />
                        )}
                      </div>
                    ),
                  }}
                />
              </div>
              <div className="bg-card p-4 rounded-lg shadow border border-border">
                <h2 className="text-xl font-semibold mb-4">
                  Tasks for {date?.toLocaleDateString()}
                </h2>
                <div className="space-y-4">
                  {date &&
                    getTasksForDate(date).map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-background rounded border animate-fade-in"
                      >
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.priority}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  {date && getTasksForDate(date).length === 0 && (
                    <p className="text-muted-foreground">
                      No tasks scheduled for this date
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}