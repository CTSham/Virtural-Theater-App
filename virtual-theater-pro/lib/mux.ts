import { Mux } from '@mux/mux-node'
let _mux: Mux | null = null
export function getMux() {
  if (!_mux) _mux = new Mux({ tokenId: process.env.MUX_TOKEN_ID!, tokenSecret: process.env.MUX_TOKEN_SECRET! })
  return _mux!
}

/** Example: create an asset from a direct upload URL */
export async function createAssetFromUrl(url: string) {
  const mux = getMux()
  const { video } = mux
  const asset = await video.assets.create({ input: [{ url }], playback_policy: ['signed'] })
  return asset
}
