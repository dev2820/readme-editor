import { cn } from '@/utils/cn';

export function TitleInput({ className, ...props }) {
  return (
    <input
      className={cn(
        'bg-transparent text-5xl border-b-1 leading-normal',
        className,
      )}
      {...props}
    ></input>
  );
}
