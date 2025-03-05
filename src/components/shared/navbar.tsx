import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useAuthStore from "@/models/auth";

import { ROUTE_MAP } from "@/data/routes";
import { cn } from "@/lib/utils";

import { Icons } from "../icons";
import Container from "../layout/container";
import Heading from "../ui/heading";
import { UserNav } from "./user-nav";

export default function Navbar() {
  const { isAuth } = useAuthStore();

  return (
    <header
      className={cn(
        "h-nav sm:h-sm-nav flex items-center sticky top-0 border-b  transition-transform duration-300 bg-background z-10 flex-shrink-0",
      )}>
      <Container size="full" className="flex justify-between w-full sm:px-2 items-center">
        <div>
          <Heading size="xxl" variant="bold">
            Trello<span>.</span>
          </Heading>
        </div>

        {!isAuth ? (
          <span className="relative">
            <Icons.person size={25} className="stroke-1" />
            <Link to={ROUTE_MAP.AUTH.LOGIN} className="absolute inset-0" />
          </span>
        ) : (
          <UserNav />
        )}
      </Container>
    </header>
  );
}
