import { dummyHackathons } from '@/data/Hackathon';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Hackathon {
    id: string;
    name: string;
    startDate: Date | string;
    endDate: Date | string;
    description: string;
    slug: string;
    image: string;
    level: 'easy' | 'medium' | 'hard';
    createdAt: string;
}

export interface UpdateHackathonFormData {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    image?:  string;
    level?: 'easy' | 'medium' | 'hard';
}
interface HackathonState {
    hackathons: Hackathon[];
    addHackathon: (hackathon: Omit<Hackathon, 'id' | 'createdAt'> & { image: string | File }) => Promise<void>;
    updateHackathon: (id: string| undefined, hackathon: Partial<Hackathon>) => void;
    deleteHackathon: (id: string) => void;
    getHackathonById: (id: string) => Hackathon | undefined;
    getHackahtonBySlug: (slug: string) => Hackathon | undefined;
    searchHackathons: (query: string) => Hackathon[];
    sortHackathons: (order: 'newest' | 'oldest') => Hackathon[];
    filterHackathons: (filters: { level?: Hackathon['level'], status?: 'active' | 'upcoming' | 'past' }) => Hackathon[];
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

export const useHackathonStore = create<HackathonState>()(
    persist(
        (set, get) => ({
            hackathons: [...dummyHackathons],

            addHackathon: async (hackathonData) => {
                let imageDataUrl: string;
                if (hackathonData.image instanceof File) {
                    imageDataUrl = await fileToDataUrl(hackathonData.image);
                } else {
                    imageDataUrl = hackathonData.image;
                }

                const slug = generateSlug(hackathonData.name);

                set((state) => {
                    const newHackathon: Hackathon = {
                        ...hackathonData,
                        id: generateId(),
                        slug: slug,
                        createdAt: new Date().toISOString(),
                        image: imageDataUrl,
                    };
                    return { hackathons: [...state.hackathons, newHackathon] };
                });
            },
        
            updateHackathon: async (id, hackathonData) => {
                console.log('Updating hackathon with id:', id);
                console.log('Update data:', hackathonData);

                const updatedData: Partial<Hackathon> = { ...hackathonData };

                if (hackathonData.name) {
                    updatedData.slug = generateSlug(hackathonData.name);
                }

                if (hackathonData.image) {
                    if (hackathonData.image instanceof File) {
                        updatedData.image = await fileToDataUrl(hackathonData.image);
                    } else {
                        updatedData.image = hackathonData.image;
                    }
                }

                let updatedHackathon: Hackathon | undefined;

                set((state) => {
                    const updatedHackathons = state.hackathons.map((hackathon) => {
                        if (hackathon.id === id) {
                            console.log("Found hack")
                            updatedHackathon = { ...hackathon, ...updatedData };
                            return updatedHackathon;
                        }
                        return hackathon;
                    });
                    console.log('State after update:', updatedHackathons);
                    return { hackathons: updatedHackathons };
                });

                console.log('Updated hackathon:', updatedHackathon);
                return updatedHackathon;
            },
            //     let updatedData: Partial<Hackathon> = { ...hackathonData };
                
            //     console.log("updating data in store", hackathonData, updatedData)
            //     if (hackathonData.name) {
            //         updatedData.slug = generateSlug(hackathonData.name);
            //     }

            //     if (hackathonData.image) {
            //         if (hackathonData.image instanceof File) {
            //             updatedData.image = await fileToDataUrl(hackathonData.image);
            //         } else {
            //             updatedData.image = hackathonData.image;
            //         }
            //     }

            //     console.log("settinmg slug ", hackathonData, updatedData)
            //     // set((state) => ({
            //     //     hackathons: state.hackathons.map((hackathon) =>
            //     //         hackathon.id === id ? { ...hackathon, ...updatedData } : hackathon
            //     //     )

                    
            //     // }));
            //     set((state) => {
            //         const updatedHackathons = state.hackathons.map((hackathon) =>
            //             hackathon.id === id ? { ...hackathon, ...updatedData } : hackathon
            //         );
            //         return { hackathons: updatedHackathons };
            //     });
            //     console.log("updated data in store", get().hackathons)
            //     return get().getHackathonById(id);
            // },

            getHackahtonBySlug: (slug) => {
                return get().hackathons.find((hackathon) => hackathon.slug === slug);
            },

            deleteHackathon: (id) => set((state) => ({
                hackathons: state.hackathons.filter((hackathon) => hackathon.id !== id)
            })),

            getHackathonById: (id) => {
                return get().hackathons.find((hackathon) => hackathon.id === id);
            },

            searchHackathons: (query) => {
                const lowerQuery = query.toLowerCase();
                return get().hackathons.filter((hackathon) =>
                    hackathon.name.toLowerCase().includes(lowerQuery)
                );
            },

            sortHackathons: (order) => {
                return [...get().hackathons].sort((a, b) => {
                    if (order === 'newest') {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    } else {
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    }
                });
            },

            filterHackathons: ({ level, status }) => {
                return get().hackathons.filter((hackathon) => {
                    const levelMatch = !level || hackathon.level === level;
                    const currentDate = new Date();
                    const startDate = new Date(hackathon.startDate);
                    const endDate = new Date(hackathon.endDate);
                    let statusMatch = true;

                    if (status) {
                        if (status === 'active') {
                            statusMatch = currentDate >= startDate && currentDate <= endDate;
                        } else if (status === 'upcoming') {
                            statusMatch = currentDate < startDate;
                        } else if (status === 'past') {
                            statusMatch = currentDate > endDate;
                        }
                    }

                    return levelMatch && statusMatch;
                });
            },
        }),
        {
            name: 'hackathon-store',
            getStorage: () => localStorage,
        }
    )
);