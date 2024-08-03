import { Suspense } from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import { api, HydrateClient } from "~/trpc/server";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  // void api.post.all.prefetch();

  return (
    <HydrateClient>
      <div>
        {/* <CreatePostForm />
          <div className="w-full max-w-2xl overflow-y-scroll">
            <Suspense
              fallback={
                <div className="flex w-full flex-col gap-4">
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                </div>
              }
            >
            </Suspense>
          </div> */}
      </div>
    </HydrateClient>
  );
}
