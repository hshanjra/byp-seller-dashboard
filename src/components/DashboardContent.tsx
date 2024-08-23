import { cn } from "@/lib/utils";
import React from "react";

function DashboardContent({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <section>
      {title && (
        <div className="flex items-center mb-3">
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        </div>
      )}
      <div className={cn("flex flex-1", className)}>{children}</div>
    </section>
  );
}

export default DashboardContent;
