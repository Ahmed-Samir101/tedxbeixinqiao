import type { NextConfig } from 'next'
import { fileURLToPath } from 'url'
import path from 'path'


let userConfig: any = undefined
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// No user config to load, removing the related code

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Removed experimental features
    // webpackBuildWorker: true,
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
    
    // Keeping serverActions as it may be needed for form submissions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

if (userConfig) {
  for (const key in userConfig) {
    if (
      typeof nextConfig[key as keyof NextConfig] === 'object' &&
      !Array.isArray(nextConfig[key as keyof NextConfig])
    ) {
      nextConfig[key as keyof NextConfig] = {
        ...(nextConfig[key as keyof NextConfig] as object),
        ...userConfig[key],
      } as any
    } else {
      (nextConfig as any)[key] = userConfig[key]
    }
  }
}

export default nextConfig