"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

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
      <TabsList className="mb-10 flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
        {keys.map((key) => (
          <TabsTrigger
            key={key}
            value={key}
            className="cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-all data-[state=active]:border-brand-navy data-[state=active]:bg-brand-navy data-[state=active]:text-brand-navy-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-brand-navy/15"
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
                className="card-hover-glow group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Decorative index */}
                <div className="absolute right-4 top-4 text-xs font-extrabold text-muted-foreground/20">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="flex grow flex-col p-6 md:p-7">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2.5 grow text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Divider */}
                  <div className="my-5 h-px bg-border" />

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold">
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
