import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">TaskFlow</h3>
          <p className="text-gray-600 text-center max-w-md">
            Your personal task management solution for enhanced productivity.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TaskFlow
          </p>
        </div>
      </div>
    </footer>
  );
};