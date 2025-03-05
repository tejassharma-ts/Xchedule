import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import useAuthStore from "@/models/auth";
import { User } from "@/models/board";

import { cn } from "@/lib/utils";

type UserGlaceProps = {
  usersIDs: string[];
  className?: string;
};

export default function UserGlance({ className, usersIDs }: UserGlaceProps) {
  const { users } = useAuthStore();
  const assignedUsers = users.filter((user) => usersIDs.includes(user.id));

  return (
    <div className={cn("flex -space-x-2 hover:space-x-2 [&>div]:transition-all w-fit", className)}>
      {assignedUsers.map((user) => (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer ">
              <div className="group flex justify-start">
                <UserAvatar src={user.profile} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-sm py-1 px-3">
              <p>{user.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}

export function UserAvatar({ src, ...props }) {
  return (
    <Avatar {...props}>
      <AvatarImage src={src} />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
