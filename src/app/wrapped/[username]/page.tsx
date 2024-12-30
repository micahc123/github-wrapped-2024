import { WrappedClient } from './wrapped-client'

type PageProps = {
  params: Promise<{
    username: string
  }>  
}

export default async function WrappedPage({ params }: PageProps) {
  const { username } = await params
  return <WrappedClient username={username} />
}
