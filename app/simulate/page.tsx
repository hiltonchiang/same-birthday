import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DialogPage from '@/components/DialogPage'

export default async function Page() {
  return (
    <>
      <div id="main-family-page" className="max-w-full">
        <ScrollTopAndComment />
      </div>
      <DialogPage />
    </>
  )
}
