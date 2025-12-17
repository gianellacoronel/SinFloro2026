function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) =>
      Array.isArray(value) ? value.length > 0 : !!value,
    ),
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL as string;
  return Response.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      name: "Sin Floro 2026",
      version: "1",
      iconUrl: "https://sin-floro-2026.vercel.app/app-icon.png",
      homeUrl: "https://sin-floro-2026.vercel.app",
      imageUrl: "https://sin-floro-2026.vercel.app/hero-image.png",
      buttonTitle: "Put Money Where Your Vote Is",
      splashImageUrl: "https://sin-floro-2026.vercel.app/app-icon.png",
      splashBackgroundColor: "#ffe3aa",
      webhookUrl: "https://sin-floro-2026.vercel.app/api/webhook",
      subtitle: "No Hype. Just Data.",
      description:
        "A decentralized prediction market for the Peru 2026 Presidential Elections. Polls can be biased, but the blockchain doesn't lie.",
      screenshotUrls: [
        "https://sin-floro-2026.vercel.app/screenshots/shot-01.png",
      ],
      primaryCategory: "entertainment",
      tags: ["voting", "social", "bet"],
      heroImageUrl: "https://sin-floro-2026.vercel.app/hero-image.png",
      tagline: "Sin Floro, only the truth",
      ogTitle: "Sin Floro 2026 - Just Data",
      ogDescription:
        "Stop guessing with polls and put your money where your vote is for the Peru 2026 elections.",
      ogImageUrl: "https://sin-floro-2026.vercel.app/hero-image.png",
    }),
    miniapp: {
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      homeUrl: URL,
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
      webhookUrl: process.env.NEXT_PUBLIC_APP_WEBHOOK,
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE,
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
      screenshotUrls: [
        `${URL}/screenshots/shot-01.png`,
        `${URL}/screenshots/shot-02.png`,
        `${URL}/screenshots/shot-03.png`,
      ],
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
      tags: ["voting", "social", "bet"],
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE,
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE,
      noindex: true,
    },
  });
}
