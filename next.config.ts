import type { NextConfig } from "next";
import createMdx from "@next/mdx"
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
 experimental:{
  mdxRs:true
 }
};
const withMdx=createMdx({})
export default withMdx(nextConfig);
