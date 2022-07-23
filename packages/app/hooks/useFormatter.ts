type FormatterProps = {
    formatNumber: (n: string | number) => string;
}

export const useFormatter = (): FormatterProps => {
    const formatNumber = (n: string | number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return { formatNumber };
};