import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "legalio-media.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
