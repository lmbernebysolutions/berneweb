"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { TechCorners } from "@/components/ui/tech-corners";

interface ServiceItem {
  title: string;
  description: string;
  price: string;
}

interface ServiceCategory {
  title: string;
  items: readonly ServiceItem[];
}

interface ServiceTabsProps {
  categories: Record<string, ServiceCategory>;
}

export function ServiceTabs({ categories }: ServiceTabsProps) {
  const keys = Object.keys(categories);

  return (
    <Tabs defaultValue={keys[0]} className="w-full">
      <TabsList className="mb-10 flex h-auto flex-wrap justify-center gap-1 bg-transparent p-0">
        {keys.map((key) => (
          <TabsTrigger
            key={key}
            value={key}
            className="cursor-pointer border border-white/10 px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all data-[state=active]:border-brand-cyan data-[state=active]:bg-brand-cyan/10 data-[state=active]:text-brand-cyan data-[state=active]:shadow-[0_0_15px_rgba(3,249,249,0.1)]"
          >
            {categories[key].title}
          </TabsTrigger>
        ))}
      </TabsList>

      {keys.map((key) => (
        <TabsContent key={key} value={key}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories[key].items.map((item, i) => (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden border border-white/10 bg-white/[0.03] transition-all"
              >
                {/* Tech corners - 2→4 diagonal pattern */}
                <TechCorners pattern="diagonal" variant="cyan" size="md" />

                {/* Decorative index */}
                <div className="absolute right-4 top-4 font-mono text-xs font-extrabold text-brand-cyan/15 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="flex grow flex-col p-6 md:p-7">
                  <h3 className="text-lg font-bold uppercase tracking-wide">{item.title}</h3>
                  <p className="mt-2.5 grow text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Divider */}
                  <div className="my-5 h-px bg-white/10" />

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold tracking-tight text-brand-cyan">
                      {item.price} &euro;
                    </span>
                    <Button variant="outline" size="sm" asChild className="group/btn cursor-pointer">
                      <Link href="/kontakt">
                        Anfragen
                        <IconArrowRight className="ml-1 size-3.5 transition-transform group-hover/btn:translate-x-0.5" stroke={2} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
