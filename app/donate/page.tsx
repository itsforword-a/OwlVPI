export const dynamic = 'force-dynamic'
export const revalidate = 0

import dynamicImport from 'next/dynamic'

const DonateClient = dynamicImport(() => import('./donate-client'), {
  ssr: false,
})

export default function DonatePage() {
  return <DonateClient />
}
