// Add this function at the top-level
export async function generateStaticParams() {
  // Return an array of params objects, e.g.:
  return [
    { slug: ['example-slug'] },
    // Add additional paths as necessary
  ]
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  console.log('slug', slug)
  return <></>
}
