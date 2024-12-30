import { WrappedClient } from './wrapped-client'

interface PageProps {
  params: {
    username: string
  }
}

export default async function WrappedPage({ params }: PageProps) {
  return <WrappedClient username={params.username} />
}
