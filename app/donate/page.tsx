export const dynamic = 'force-dynamic'
export const revalidate = 0

import dynamic from 'next/dynamic'

const DonateClient = dynamic(() => import('./donate-client'), {
  ssr: false,
})

export default function DonatePage() {
  return <DonateClient />
}
