import React, { useEffect } from 'react'

interface Props {
    triggerRef: React.RefObject<HTMLDivElement>
    onLoadMore: () => void
    hasMore: boolean
    isLoading: boolean
}

export const useInfiniteScroll = ({
                                      triggerRef,
                                      onLoadMore,
                                      hasMore,
                                      isLoading,
                                  }: Props) => {
    useEffect(() => {
        if (!triggerRef.current) return

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (entry.isIntersecting && hasMore && !isLoading) {
                onLoadMore()
            }
        })

        observer.observe(triggerRef.current)

        return () => observer.disconnect()
    }, [triggerRef, onLoadMore, hasMore, isLoading])
}