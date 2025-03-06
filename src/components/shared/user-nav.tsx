import { Link, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useAuthStore from "@/models/auth";

import { ROUTE_MAP } from "@/data/routes";

import { Icons } from "../icons";
import { UserAvatar } from "../user-glance";

export function UserNav() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-cy="user-nav-button" asChild className="cursor-pointer">
        <span className="relative">
          <UserAvatar src={user.profile} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 z-[5000]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 text-base text-sm">
            <p className="leading-none font-medium uppercase">{user.name}</p>
            <p className="leading-none font-medium">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            logout();
            navigate(ROUTE_MAP.AUTH.LOGIN);
          }}>
          <Icons.logOut size={14} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
