import { Loader } from "lucide-react";

interface LoadingAnimationProps {
  progress?: number;
}

export function LoadingAnimation({ progress }: LoadingAnimationProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="animate-spin">
        <Loader className="h-8 w-8 text-primary" />
      </div>
      {progress !== undefined && (
        <div className="mt-4 w-64">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Loading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
}