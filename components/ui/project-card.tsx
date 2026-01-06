'use client';

import { cn } from '@/lib/utils';
import { GlassCard } from './glass-card';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  href?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  thumbnail,
  href,
  className,
}: ProjectCardProps) {
  const CardWrapper = href ? 'a' : 'div';

  return (
    <GlassCard
      variant="dark"
      hover
      className={cn('overflow-hidden group', className)}
    >
      <CardWrapper
        href={href}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {/* Thumbnail Area */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full gradient-brand opacity-80" />
          )}
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content Area */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FF4D8E] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 mb-4">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FF4D8E] text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardWrapper>
    </GlassCard>
  );
}
