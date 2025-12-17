"use client";

import sdk from "@farcaster/miniapp-sdk";
import { useEffect } from "react";

export default function ClientMiniApp() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return null; // no visible UI needed here
}
