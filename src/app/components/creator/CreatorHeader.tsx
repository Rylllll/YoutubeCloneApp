import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../error/ImageWithFallback";
import { formatCount } from "../../../lib/utils";
import { getMockSubscribers } from "../../../lib/metadata";
import type { Creator } from "../../../types/creator";

interface CreatorHeaderProps {
  creator: Creator;
}

export function CreatorHeader({ creator }: CreatorHeaderProps) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      {creator.banner && (
        <div className="overflow-hidden rounded-2xl">
          <ImageWithFallback
            src={creator.banner}
            alt={`${creator.name} banner`}
            className="h-28 w-full object-cover sm:h-40 lg:h-52"
          />
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar className="size-20 sm:size-32">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-[24px] font-medium text-foreground">{creator.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {getMockSubscribers(creator.id)} · {formatCount(creator.videoCount)} videos
          </p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground line-clamp-2">{creator.bio}</p>
        </div>

        <Button
          onClick={() => setSubscribed((s) => !s)}
          variant={subscribed ? "secondary" : "default"}
          className="rounded-full"
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </div>
    </div>
  );
}
