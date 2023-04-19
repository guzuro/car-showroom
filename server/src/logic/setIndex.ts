export default function setLoopIndex<T>(struct: T, index: number): T & { index: number } {
    return {
        ...struct,
        index
    }
}