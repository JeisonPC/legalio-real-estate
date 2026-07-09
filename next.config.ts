import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home02",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home03",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home04",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home05",
        destination: "/",
        permanent: true,
      },
      {
        source: "/listing-topmap-grid",
        destination: "/propiedades",
        permanent: true,
      },
      {
        source: "/listing-topmap-list",
        destination: "/propiedades",
        permanent: true,
      },
      {
        source: "/listing-left-sidebar",
        destination: "/propiedades",
        permanent: true,
      },
      {
        source: "/listing-right-sidebar",
        destination: "/propiedades",
        permanent: true,
      },
      {
        source: "/listing-half-map-list",
        destination: "/propiedades",
        permanent: true,
      },
      {
        source: "/blog-grid",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-standard",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-post-2/:id",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/property-details-2/:id",
        destination: "/detalle-propiedad/:id",
        permanent: true,
      },
      {
        source: "/property-details-3/:id",
        destination: "/detalle-propiedad/:id",
        permanent: true,
      },
      {
        source: "/property-details-4/:id",
        destination: "/detalle-propiedad/:id",
        permanent: true,
      },
    ];
  },
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
