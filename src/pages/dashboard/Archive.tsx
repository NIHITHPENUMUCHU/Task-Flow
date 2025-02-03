import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Trash2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/ui/loading-animation";

export default function Archive() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const interval = setInterval(() => {
          setLoadingProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);

        const { data, error } = await supabase
          .from("tasks")
          .select("*, projects(name)")
          .eq("archived", true)
          .order("created_at", { ascending: false });

        clearInterval(interval);
        setLoadingProgress(100);

        if (error) {
          toast({
            title: "Error fetching archived tasks",
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

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Task deleted permanently",
        description: "Task has been permanently deleted.",
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
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
            <h1 className="text-3xl font-bold mb-6">Archived Tasks</h1>
            <div className="grid gap-4">
              {tasks.length === 0 ? (
                <p className="text-muted-foreground">No archived tasks found.</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-card p-6 rounded-lg shadow border border-border animate-fade-in"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{task.title}</h3>
                          {task.projects?.name && (
                            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                              {task.projects.name}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{task.description}</p>
                        {task.link && (
                          <a
                            href={task.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Link
                          </a>
                        )}
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            Priority: {task.priority}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                            Archived
                          </span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteTask(task.id)}
                        className="hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}