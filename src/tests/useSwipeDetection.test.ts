import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSwipeDetection } from "@/hooks/useSwipeDetection";

const makeTouch = (x: number, y: number) => ({ clientX: x, clientY: y } as Touch);

const makeTouchEvent = (touches: Touch[]) =>
    ({
        touches,
        changedTouches: touches,
        preventDefault: vi.fn(),
    } as unknown as React.TouchEvent);

describe("useSwipeDetection", () => {
    it("calls onSwipeLeft when deltaX is sufficiently negative", () => {
        const onSwipeLeft = vi.fn();
        const { result } = renderHook(() => useSwipeDetection({ onSwipeLeft }));

        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(200, 100)]));
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(100, 105)]));
        });

        expect(onSwipeLeft).toHaveBeenCalledOnce();
    });

    it("calls onSwipeRight when deltaX is sufficiently positive", () => {
        const onSwipeRight = vi.fn();
        const { result } = renderHook(() => useSwipeDetection({ onSwipeRight }));

        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(100, 100)]));
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(200, 105)]));
        });

        expect(onSwipeRight).toHaveBeenCalledOnce();
    });

    it("calls onSwipeUp when deltaY is sufficiently negative", () => {
        const onSwipeUp = vi.fn();
        const { result } = renderHook(() => useSwipeDetection({ onSwipeUp }));

        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(100, 200)]));
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(105, 100)]));
        });

        expect(onSwipeUp).toHaveBeenCalledOnce();
    });

    it("calls onSwipeDown when deltaY is sufficiently positive", () => {
        const onSwipeDown = vi.fn();
        const { result } = renderHook(() => useSwipeDetection({ onSwipeDown }));

        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(100, 100)]));
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(105, 200)]));
        });

        expect(onSwipeDown).toHaveBeenCalledOnce();
    });

    it("does not trigger when delta is below threshold", () => {
        const onSwipeLeft = vi.fn();
        const { result } = renderHook(() => useSwipeDetection({ onSwipeLeft, threshold: 50 }));

        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(100, 100)]));
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(75, 100)]));
        });

        expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it("prefers horizontal over vertical when horizontal delta is larger", () => {
        const onSwipeLeft = vi.fn();
        const onSwipeUp = vi.fn();
        const { result } = renderHook(() => useSwipeDetection({ onSwipeLeft, onSwipeUp }));

        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(200, 200)]));
            // deltaX = -100 (left), deltaY = -60 (up) — horizontal wins
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(100, 140)]));
        });

        expect(onSwipeLeft).toHaveBeenCalledOnce();
        expect(onSwipeUp).not.toHaveBeenCalled();
    });

    it("resets state after each swipe so next swipe is independent", () => {
        const onSwipeLeft = vi.fn();
        const { result } = renderHook(() => useSwipeDetection({ onSwipeLeft }));

        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(200, 100)]));
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(100, 100)]));
        });
        act(() => {
            result.current.handleTouchStart(makeTouchEvent([makeTouch(200, 100)]));
            result.current.handleTouchEnd(makeTouchEvent([makeTouch(100, 100)]));
        });

        expect(onSwipeLeft).toHaveBeenCalledTimes(2);
    });
});
