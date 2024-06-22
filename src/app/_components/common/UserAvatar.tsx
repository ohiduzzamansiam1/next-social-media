import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export default function UserAvatar({avatarUrl, name, className}: {avatarUrl: string, name: string, className?: string}) {
  return (
    <Avatar className={cn(className)}>
        <AvatarImage src={avatarUrl} alt='O' />
        <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
