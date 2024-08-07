import { CommandsList } from "@components/commands";
import { unstable_setRequestLocale } from "next-intl/server";

import { locale as zodLocale } from "@webmeric/validators";

import { api, HydrateClient } from "~/trpc/server";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const l = zodLocale.parse(locale);

  void api.aymeric.commands.prefetch({
    locale: l,
  });

  return (
    <HydrateClient>
      <CommandsList locale={l} />
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
    </HydrateClient>
  );
}
