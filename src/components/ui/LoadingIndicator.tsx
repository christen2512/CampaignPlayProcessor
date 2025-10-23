import { Spinner } from "./spinner";

interface LoadingIndicatorProps {
  title: string;
}

export function LoadingIndicator({ title }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <p className="mb-2">{title}</p>
      <Spinner />
    </div>
  );
}
