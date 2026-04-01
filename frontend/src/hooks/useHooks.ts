import {useEffect, useRef} from 'react';

export function useDebouncedEffect(effect: () => void | (() => void), deps: React.DependencyList, delay: number, skipInitial: boolean = false) {
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (skipInitial && isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const handler = setTimeout(() => {
            effect();
        }, delay);

        return () => clearTimeout(handler);
    }, [...deps, delay]);
}