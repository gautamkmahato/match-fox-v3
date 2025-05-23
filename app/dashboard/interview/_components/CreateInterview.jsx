'use client'

import { Phone, VideoIcon } from "lucide-react";
import Link from "next/link";

export default function CreateInterview({ header, paragraph, iconType }) {
    const Icon = iconType === 'mic' ? VideoIcon : Phone;
    return (
        <>
            <article
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-md shadow-gray-200 transition hover:shadow-lg sm:p-6"
            >
                <div className="flex items-start gap-3">
                    {/* Icon Container */}
                    <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center rounded-md bg-teal-800 p-2 text-white">
                        <Icon className="h-5 w-5" />
                        </span>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-gray-900">{header}</span>
                        <span className="text-xs text-gray-500 line-clamp-3">{paragraph}</span>
                    </div>
                </div>


                <Link href="/dashboard/interview/create" className="group mt-4 inline-flex border px-3 py-2 rounded-md items-center gap-1 text-sm font-medium text-teal-800 shadow-sm shadow-teal-800 hover:bg-teal-900 hover:shadow-sm hover:text-gray-50">
                    Create Interview

                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                        &rarr;
                    </span>
                </Link>
            </article>
        </>
    )
}