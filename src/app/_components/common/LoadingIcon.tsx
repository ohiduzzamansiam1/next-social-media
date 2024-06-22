import { Loader } from 'lucide-react';

export default function LoadingIcon({className}: {className?: string}) {
  return <Loader className={`size-4 animate-spin ${className}`} />;
}
