// Debounce utility function
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// Search debounce hook
export const useDebouncedSearch = (searchValue, delay = 500) => {
    const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [searchValue, delay]);

    return debouncedSearch;
};
