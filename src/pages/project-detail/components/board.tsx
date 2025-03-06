import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Icons } from "@/components/icons";
import Container from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import TaskDialog from "@/components/ui/custom/task-dialog";
import Heading from "@/components/ui/heading";
import Para from "@/components/ui/para";

import useBoardStore, { getProjectByID } from "@/models/board";

import { ROUTE_MAP } from "@/data/routes";
import { cn } from "@/lib/utils";
import { Icon } from "lucide-react";

import AddList from "./add-list";
import List from "./list";

export default function Board() {
  const params = useParams();
  const { setCurrentProject } = useBoardStore();

  const project = getProjectByID(params.ID);

  useEffect(() => {
    setCurrentProject(project.id);
  }, []);

  return (
    <div>
      {/* bg-[#f6f8f9] */}
      <Container size="full">
        <div className="mb-8">
          <Link to={ROUTE_MAP.HOME} className={cn(buttonVariants({ variant: "secondary" }))}>
            <Icons.left size={16} className="mr-2" />
            All projects
          </Link>
        </div>

        <Heading size="title" variant="bold">
          {project.title}
        </Heading>
        <Para>{project.desc}</Para>
      </Container>
      <div className="flex gap-4 overflow-x-auto mt-8 h-full pl-8 pr-8">
        {project.lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
        <AddList />
      </div>

      {/* dialog for showing task if clicked */}
      <TaskDialog />
    </div>
  );
}
