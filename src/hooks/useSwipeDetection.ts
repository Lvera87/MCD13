import { useRef, useCallback } from "react";

export interface SwipeOptions {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    threshold?: number;
}

export function useSwipeDetection(opts: SwipeOptions) {
    const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50 } = opts;

    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            if (touchStartX.current === null || touchStartY.current === null) return;

            const deltaX = e.changedTouches[0].clientX - touchStartX.current;
            const deltaY = e.changedTouches[0].clientY - touchStartY.current;

            const isHorizontal = Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY);
            const isVertical = Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX);

            if (isHorizontal) {
                e.preventDefault();
                if (deltaX > 0) onSwipeRight?.();
                else onSwipeLeft?.();
            }

            if (isVertical) {
                e.preventDefault();
                if (deltaY > 0) onSwipeDown?.();
                else onSwipeUp?.();
            }

            touchStartX.current = null;
            touchStartY.current = null;
        },
        [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
    );

    return { handleTouchStart, handleTouchEnd };
}
