import { useState, useEffect } from 'react';

import { VisaInfo, VisaCategory } from '../types/visaTypes';
import visaData from '../data/visaData.json';

type VisaDataResult = {
    visas: VisaInfo[]
    loading: boolean
    error: string | null
    categories: VisaCategory[]
    getVisaById: (id: string) => (VisaInfo | undefined)
    getVisasByCategory: (category: VisaCategory) => VisaInfo[]
    getAllTags: () => string[]
    searchVisas: (query: string) => VisaInfo[]
    filterVisas: (filters: {
        categories?: VisaCategory[] | undefined
        duration?: string | undefined
        canExtend?: boolean | null | undefined
        tags?: string[] | undefined | null
        query?: string | undefined | null
    }) => (VisaInfo[] | undefined)
}

export const useVisaData = (): VisaDataResult => {
    const [visas, setVisas] = useState<VisaInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<VisaCategory[]>([]);

    useEffect(() => {
        try {
            const data = (visaData as { visas: VisaInfo[] }).visas;
            setVisas(data);

            // Extract unique categories
            const uniqueCategories = Array.from(
                new Set(data.map(visa => visa.category))
            ) as VisaCategory[];

            setCategories(uniqueCategories);
            setLoading(false);
        } catch (err) {
            setError('Failed to load visa data');
            setLoading(false);
        }
    }, []);

    const getVisaById = (id: string): VisaInfo | undefined => {
        return visas.find(visa => visa.id === id);
    };

    const getVisasByCategory = (category: VisaCategory): VisaInfo[] => {
        return visas.filter(visa => visa.category === category);
    };

    const getAllTags = (): string[] => {
        const allTags = visas.flatMap(visa => visa.tags);
        return Array.from(new Set(allTags)).sort();
    };

    const searchVisas = (query: string): VisaInfo[] => {
        if (!query) return visas;

        const lowerQuery = query.toLowerCase();
        return visas.filter(visa =>
            visa.name.toLowerCase().includes(lowerQuery) ||
            visa.code.toLowerCase().includes(lowerQuery) ||
            visa.summary.toLowerCase().includes(lowerQuery) ||
            visa.description.toLowerCase().includes(lowerQuery) ||
            visa.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            visa.eligibility.some(item => item.toLowerCase().includes(lowerQuery))
        );
    };

    const filterVisas = (filters: {
        categories?: VisaCategory[] | undefined
        duration?: string | undefined
        canExtend?: boolean | null | undefined
        tags?: string[] | undefined | null
        query?: string | undefined | null
    }): (VisaInfo[] | undefined) => {
        let filtered = visas;

        // Filter by search query
        if (filters.query) {
            filtered = searchVisas(filters.query);
        }

        // Filter by categories
        if (filters.categories && filters.categories.length > 0) {
            filtered = filtered.filter(visa =>
                filters.categories?.includes(visa.category)
            );
        }

        // Filter by duration
        if (filters.duration) {
            filtered = filtered.filter(visa => {
                const durationText = visa.duration.toLowerCase();
                switch (filters.duration) {
                    case 'short':
                        return durationText.includes('month') && !durationText.includes('year');
                    case 'medium':
                        return (
                            durationText.includes('year') &&
                            (durationText.includes('1 year') || durationText.includes('2 year'))
                        );
                    case 'long':
                        return (
                            durationText.includes('year') &&
                            (durationText.includes('3 year') || durationText.includes('4 year') ||
                                durationText.includes('5 year') || durationText.includes('6 year') ||
                                durationText.includes('7 year'))
                        );
                    case 'permanent':
                        return durationText.includes('permanent') || visa.description.toLowerCase().includes('green card');
                    default:
                        return true;
                }
            });
        }

        // Filter by extension possibility
        if (filters.canExtend !== null) {
            filtered = filtered.filter(visa => visa.canExtend === filters.canExtend);
        }

        // Filter by tags
        if (filters.tags && filters.tags.length > 0) {
            filtered = filtered.filter(visa =>
                filters.tags?.some(tag => visa.tags.includes(tag))
            );
        }

        return filtered;
    };

    return {
        visas,
        loading,
        error,
        categories,
        getVisaById,
        getVisasByCategory,
        getAllTags,
        searchVisas,
        filterVisas
    };
}
