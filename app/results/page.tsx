"use client";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "../utils/supabase";
import { useSearchParams } from "next/navigation";

import {
  Card,
  // CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { formatRelativeTime } from "../utils/format_time";
import { useResponsiveLimit } from "../utils/resposinve_limits";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Message = {
  id: string | number;
  name: string;
  message: string;
  created_at: string;
  author?: string;
  // ...add other fields as needed
};

async function SearchAPI(
  name: string,
  page: number,
  limit: number
): Promise<{ data: Message[]; count: number }> {
  // const limit = 8;
  const offset = (page - 1) * limit;
  const { data, count } = await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("name", name)
    .range(offset, offset + limit - 1);
  console.log(data);
  return { data: data || [], count: count || 0 };
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const limit = useResponsiveLimit();

  const name = searchParams.get("name") || "";

  const [totalCount, setTotalCount] = useState(0); // total items count from API
  // Calculate pagination numbers whenever page or totalCount changes
  const totalPages = Math.ceil(totalCount / limit);

  const previous = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  const current = page;

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, count } = await SearchAPI(name, page, limit);
      setResults(data);
      setTotalCount(count); // your API should return total count of matching items
    };
    fetchMessages();
  }, [name, page, limit]);

  return (
      <div className=" w-full h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
          <Button onClick={() => window.location.href = "/"} className="mb-4 ml-5 bg-pink-300 hover:bg-pink-500 md:mb-0">Go back</Button>
          <div className="w-full flex justify-center">
            <h1 className="text-4xl text-white md:-ml-32 hover:text-pink-400">
              Results for @{name}.
            </h1>
          </div>
        </div>
        <div className="w-full h-full p-4">
          {results.length > 0 ? (
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {results.map((msg) => (
                  <Card
                    key={msg.id}
                    className="am-x-card shadow-md overflow-hidden hover:border-pink-400"
                  >
                    <CardHeader className="pb-2 flex flex-row justify-between items-start text-white">
                      <p className="text-white text-xs self-start">
                        {formatRelativeTime(msg.created_at)}
                      </p>
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
                            marginTop: "-15px"
                          }}
                        />
                        </div>
                    </CardHeader>

                    <CardContent className="-mt-10 md:-mt-8 pt-0 min-h-[120px]">
                      <p className=" text-white text-1xl break-words hyphens-auto leading-relaxed">
                        {msg.message}
                      </p>
                    </CardContent>

                    <CardFooter className="border-t border-dashed border-gray-300 am-x pt-2">
                        <p className="text-right text-xl w-full text-white italic font-serif" 
                          style={{ transform: "rotate(-3deg)", transformOrigin: "top right" }}>
                          ~ anonymous
                        </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full w-full p-2 grid place-items-center text-white text-xl">
              No Messages for you
            </div>
          )}
          <Pagination className="text-white m-3 bottom-0 fixed ">
            <PaginationContent>
              {/* <PaginationItem>
              <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
            </PaginationItem> */}

              {/* For simplicity, show only first 3 pages */}
              {[previous, current, next]
                .filter((p) => p !== null)
                .map((p) => (
                  <PaginationItem key={p}>
                    <button
                      className={page === p ? "font-bold underline" : ""}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  </PaginationItem>
                ))}

              {/* <PaginationItem>
              <button onClick={() => setPage((p) => p + 1)}>Next</button>
            </PaginationItem> */}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
  );
}

export default function Results() {
  return (
    <Suspense>
      <ResultsContent />
    </Suspense>
  );
}
