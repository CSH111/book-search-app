const deduplicate = <T>(arr: T[]) => Array.from(new Set(arr));

export default deduplicate;
