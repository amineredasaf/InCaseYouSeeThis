"use client"
import { useEffect, useState, Suspense, useCallback, useMemo } from "react"
import { supabase } from "../utils/supabase"
import { useRouter, useSearchParams } from "next/navigation"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { formatRelativeTime } from "../utils/format_time"
import { useResponsiveLimit } from "../utils/resposinve_limits"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ResultsSkeleton } from "../components/results-skeleton"

type Message = {
  id: string | number
  name: string
  message: string
  created_at: string
  author?: string
}

const searchAPI = async (name: string, page: number, limit: number): Promise<{ data: Message[]; count: number }> => {
  const offset = (page - 1) * limit
  console.log("Search Fun Data: ", limit)
  const { data, count } = await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("name", name)
    .range(offset, offset + limit - 1)
  console.log(data);
  return { data: data || [], count: count || 0 }
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const limit = useResponsiveLimit()

  const [results, setResults] = useState<Message[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const name = searchParams.get("name") || ""

  useEffect(() => {
    if (limit !== undefined) setPage(1)
  }, [limit])

  const paginationData = useMemo(() => {
    if (limit === undefined) return { totalPages: 0, previous: null, next: null, current: 1, visiblePages: [] }
    const totalPages = Math.ceil(totalCount / limit)
    const previous = page > 1 ? page - 1 : null
    const next = page < totalPages ? page + 1 : null

    return {
      totalPages,
      previous,
      next,
      current: page,
      visiblePages: [previous, page, next].filter((p) => p !== null),
    }
  }, [page, totalCount, limit])

  const fetchMessages = useCallback(async () => {
    if (!name || limit === undefined) return

    setIsLoading(true)
    try {
      const { data, count } = await searchAPI(name, page, limit)
      setResults(data)
      setTotalCount(count)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
      setResults([])
      setTotalCount(0)
    } finally {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [name, page, limit])

  useEffect(() => {
    if (limit !== undefined) fetchMessages()
  }, [fetchMessages, limit])

  const handleGoBack = useCallback(() => {
    router.push("/")
  }, [router])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  const showSkeleton = (limit === undefined) || (isLoading && (isInitialLoad || results.length === 0))

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
        <Button onClick={handleGoBack} className="mb-4 ml-5 bg-pink-300 hover:bg-pink-500 md:mb-0">
          Go back
        </Button>
        <div className="w-full flex justify-center">
          <h1 className="text-4xl text-white md:-ml-32 hover:text-pink-400">Results for @{name}.</h1>
        </div>
      </div>

      <div className="w-full h-full p-4">
        {showSkeleton ? (
          <ResultsSkeleton limit={limit || 4} />
        ) : results.length > 0 ? (
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((msg) => (
                <Card key={msg.id} className="am-x-card shadow-md overflow-hidden hover:border-pink-400">
                  <CardHeader className="pb-2 flex flex-row justify-between items-start text-white">
                    <p className="text-white text-xs self-start">{formatRelativeTime(msg.created_at)}</p>
                    <div className="p-1 self-start top-0 relative" style={{ top: "-35px" }}>
                      <Image
                        src="/cake.png"
                        alt={msg.author || "cake"}
                        width={60}
                        height={80}
                        className="h-15 w-10 md:h-20 md:w-15 object-contain"
                        style={{
                          borderRadius: 0,
                          transform: "rotate(10deg)",
                          marginTop: "-15px",
                        }}
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="-mt-3 md:-mt-8 pt-0 min-h-[120px]">
                    <p className="text-white text-1xl break-words hyphens-auto leading-relaxed">{msg.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full w-full p-2 grid place-items-center text-white text-xl">No Messages for you</div>
        )}

        {!showSkeleton && results.length > 0 && (
          <Pagination className="text-white m-3 bottom-0 fixed">
            <PaginationContent>
              {paginationData.visiblePages.map((p) => (
                <PaginationItem key={p}>
                  <button
                    className={page === p ? "font-bold underline ml-1 mr-1" : ""}
                    onClick={() => handlePageChange(p!)}
                    disabled={isLoading}
                  >
                    {p}
                  </button>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}

function SuspenseFallback() {
  return (
    <div className="w-full h-screen overflow-hidden ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
        <Skeleton className="mb-4 ml-5 h-10 w-20 md:mb-0" />
        <div className="w-full flex justify-center">
          <Skeleton className="h-10 w-64 md:-ml-32" />
        </div>
      </div>
      <div className="w-full h-full p-4">
        <ResultsSkeleton limit={8} />
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      {/* <SuspenseFallback/> */}
      <ResultsContent />
    </Suspense>
  )
}
