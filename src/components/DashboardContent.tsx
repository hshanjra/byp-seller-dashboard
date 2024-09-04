import { cn } from "@/lib/utils";
import React from "react";

function DashboardContent({
  children,
  className,
  title,
  actionButtons,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actionButtons?: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        {title && (
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        )}

        {actionButtons && (
          <div className="flex items-center gap-2">{actionButtons}</div>
        )}
      </div>
      <div className={cn("flex flex-1", className)}>{children}</div>
    </section>
  );
}

export default DashboardContent;
