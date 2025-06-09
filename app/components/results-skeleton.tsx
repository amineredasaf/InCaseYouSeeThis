import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ResultsSkeletonProps {
  limit: number
}

export function ResultsSkeleton({ limit }: ResultsSkeletonProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, index) => (
          <Card key={index} className="am-x shadow-md overflow-hidden">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <Skeleton className="h-3 w-16" /> {/* Time skeleton */}
              <div className="p-1 self-start top-0 relative" style={{ top: "-35px" }}>
                <Skeleton
                  className="h-15 w-10 md:h-20 md:w-15 bg-gray-800"
                  style={{
                    borderRadius: 0,
                    transform: "rotate(10deg)",
                    marginTop: "-15px",
                  
                  }}
                />
              </div>
            </CardHeader>

            <CardContent className="-mt-10 md:-mt-8 pt-0 min-h-[120px] space-y-2">
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
              <Skeleton className="h-4 w-1/2 bg-gray-800" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
