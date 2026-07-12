'use client'
import { Fragment, useState, useRef, useEffect, FormEvent } from 'react'
import mermaid from 'mermaid'
import { useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import parse from 'parse-svg-path'
import * as d3 from 'd3'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { RadioGroup, Transition } from '@headlessui/react'
import clsx from 'clsx'
import simulate from '@/lib/actions'

type Props = { flag: boolean }
interface OptionObj {
  label: string
  option: string
}
interface CellObj {
  question: string
  options: OptionObj[]
  answer: string
}

/*
 * main program to return Dialog in sequence
 */
interface RidxProp {
  index: number
  option: string
}
interface DialogSimulateProps {
  onDialogClosed: (data: string) => void
}
const DialogSimulate: React.FC<DialogSimulateProps> = ({ onDialogClosed }) => {
  /**
   *
   */
  const handleKeyIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default page refresh

    const form = event.currentTarget
    const formData = new FormData(form)

    // Access individual values by input name
    const password = formData.get('password') as string
    console.log('password', password)
    // Convert FormData to a plain object for easier manipulation
    const data = Object.fromEntries(formData.entries())
    console.log('Form data:', data)
    const ODDS = await simulate(password)
  }
  /**
   *
   */
  const DialogKeyIn = () => {
    return (
      <>
        <div className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                請輸入模擬的總人數
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleKeyIn} action="#" method="POST" className="space-y-6">
                <div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="text"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    提交
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  /* return */
  return (
    <>
      <DialogKeyIn />
    </>
  )
}
export default DialogSimulate
