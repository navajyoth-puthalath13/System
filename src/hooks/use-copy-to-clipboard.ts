import { useCallback, useEffect, useRef, useState } from "react";

interface UseCopyToClipboard {
  /** True briefly after a successful copy. */
  copied: boolean;
  /** Copy text to the clipboard; resolves to whether it succeeded. */
  copy: (text: string) => Promise<boolean>;
}

/**
 * @name useCopyToClipboard
 * @description Copy text to the clipboard and expose a transient `copied` flag.
 * @type registry:hook
 *
 * @example
 * const { copied, copy } = useCopyToClipboard();
 * <button onClick={() => copy("hello")}>{copied ? "Copied" : "Copy"}</button>
 */
export function useCopyToClipboard(resetDelay = 1500): UseCopyToClipboard {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        if (!navigator?.clipboard) throw new Error("Clipboard API unavailable");
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetDelay]
  );

  return { copied, copy };
}
