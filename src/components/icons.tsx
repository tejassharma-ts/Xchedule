import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowRight,
  Asterisk,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Filter,
  Heart,
  History,
  Instagram,
  LoaderCircle,
  LogOut,
  Linkedin as LucidLinkedin,
  MapPin,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  Settings,
  Share,
  UserRound,
  X,
} from "lucide-react";

function Cart({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

function LinkedIn({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 30 30"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M24 4H6a2 2 0 00-2 2v18a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM10.954 22h-2.95v-9.492h2.95V22zM9.449 11.151a1.72 1.72 0 110-3.44 1.72 1.72 0 010 3.44zM22.004 22h-2.948v-4.616c0-1.101-.02-2.517-1.533-2.517-1.535 0-1.771 1.199-1.771 2.437V22h-2.948v-9.492h2.83v1.297h.04c.394-.746 1.356-1.533 2.791-1.533 2.987 0 3.539 1.966 3.539 4.522V22z"
      ></path>
    </svg>
  );
}

function Trash({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={cn(className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

function TikTok({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        // fill="#fff"
        fill="currentColor"
        d="M34.145 0h-8.09v32.696c0 3.895-3.11 7.095-6.982 7.095-3.872 0-6.984-3.2-6.984-7.095 0-3.826 3.043-6.957 6.776-7.096v-8.209C10.637 17.531 4 24.278 4 32.696 4 41.183 10.776 48 19.142 48s15.141-6.887 15.141-15.304V15.93A18.732 18.732 0 0045 19.548v-8.209C38.916 11.13 34.145 6.122 34.145 0z"
      ></path>
    </svg>
  );
}

function loader({ className, ...props }) {
  return (
    <LoaderCircle
      size={20}
      className={cn("mr-2 animate-spin", className)}
      {...props}
    />
  );
}

export const Icons = {
  menu: Menu,
  search: Search,
  person: UserRound,
  wishList: Heart,
  cart: Cart,
  close: X,
  right: ChevronRight,
  left: ChevronLeft,
  down: ChevronDown,
  linkedIn: LinkedIn,
  customLinkedIn: LucidLinkedin,
  instagram: Instagram,
  share: Share,
  add: Plus,
  decrement: Minus,
  trash: Trash,
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  star: Asterisk,
  map: MapPin,
  tiktok: TikTok,
  package: Package,
  loader,
  logOut: LogOut,
  filter: Filter,
  settings: Settings,
  history: History,
  alert: CircleAlert,
};
