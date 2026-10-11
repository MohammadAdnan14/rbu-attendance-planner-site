import * as React from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Card } from "./ui/Card";
import { testimonials } from "@/config/testimonials";

export function Testimonials() {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--border-color)]">
      <Container size="lg">
        <SectionHeading
          badge="Reviews"
          title="What students are saying"
          subtitle="Community reviews and feedback from real students."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <Card key={item.id} hoverable className="overflow-hidden">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <Image
                  src={item.image}
                  alt={item.sourceLabel || "Student review"}
                  fill
                  className="object-cover"
                />
              </div>
              {item.sourceLabel && (
                <div className="text-xs text-[var(--text-muted)]">
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[var(--accent-color)]"
                    >
                      {item.sourceLabel}
                    </a>
                  ) : (
                    item.sourceLabel
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
