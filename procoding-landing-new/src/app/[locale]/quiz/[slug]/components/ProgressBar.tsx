type ProgressBarProps = {
    progress: number; // 0 to 100
  };
  
  export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  }