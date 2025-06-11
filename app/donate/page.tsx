import dynamic from 'next/dynamic'

const DonateClient = dynamic(() => import('./donate-client'), {
  ssr: false,
})

export default function DonatePage() {
  return <DonateClient />
}
