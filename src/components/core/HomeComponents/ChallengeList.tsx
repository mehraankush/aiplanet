"use client"
import React, { useCallback, useEffect, useState } from 'react'
import ChallengeCard from '@/components/common/ChallengeCard'
import { Search } from 'lucide-react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Hackathon, useHackathonStore } from '@/store/hackathonStore';
import { useRouter } from 'next/navigation';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const ChallengeList = () => {
    const [age, setAge] = React.useState('');
    const router = useRouter()
    const hackathons = useHackathonStore((state) => state.hackathons);
    const [avalibleHackathon, setAvalibleHackathon] = useState<Hackathon[] | undefined>()
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [status, setStatus] = useState<string>('');



    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const onConnectionClick = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;

        const box = target.closest("[data-id]");
        console.log("BOX", box)
        if (box) {
            const id = box.getAttribute("data-id");
            router.push(`/hackathon/${id}`)
        }
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchInput(searchInput);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchInput]);

    useEffect(() => {
        if (hackathons) {
            const now = new Date();

            const filtered = hackathons.filter(hackathon => {
                // Search filter by name
                const matchesSearch = hackathon.name.toLowerCase().includes(debouncedSearchInput.toLowerCase());

                // Difficulty filter
                const matchesDifficulty = difficulty ? hackathon.level === difficulty : true;

                // Status filter
                const matchesStatus = status ? (
                    status === 'active' ? new Date(hackathon.startDate) <= now && new Date(hackathon.endDate) >= now :
                        status === 'upcoming' ? new Date(hackathon.startDate) > now :
                            status === 'past' ? new Date(hackathon.endDate) < now : true
                ) : true;

                return matchesSearch && matchesDifficulty && matchesStatus;
            });

            setAvalibleHackathon(filtered);
        }
    }, [debouncedSearchInput, difficulty, status, hackathons]);

    const handleDifficultyChange = (event: SelectChangeEvent) => {
        setDifficulty(event.target.value);
    };

    // Handle change for status filter
    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };


    console.log(hackathons)
    return (
        <section className='text-white' id='challenge'>

            <div className='bg-darkBlue py-[80px] '>
                <div className='max-w-7xl mx-auto'>
                    <h2 className='text-center text-3xl font-semibold'>Explore Challenges</h2>

                    <div className='flex  gap-5 justify-center items-center'>

                        <div className="relative mt-10 w-1/2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-black">
                                <Search />
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                                placeholder="Search Hackathons by Name..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                required
                            />

                        </div>
                        <div>
                            <FormControl sx={{ minWidth: 100 }} className='bg-white text-white w-[10rem] rounded-md mt-10'>
                                <InputLabel
                                    id="demo-simple-select-autowidth-label"
                                >Filter
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={age}
                                    onChange={handleChange}

                                    label="filter"
                                    sx={{ minWidth: 120 }}

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <p className='text-sm text-gray-600 pl-2'>Difficulty</p>
                                    <FormGroup className='px-2'>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={difficulty === 'all'}
                                                    onChange={handleDifficultyChange}
                                                    value="all"
                                                />}
                                                label="Easy"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={difficulty === 'easy'}
                                                    onChange={handleDifficultyChange}
                                                    value="easy"
                                                />}
                                                label="Easy"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={difficulty === 'medium'}
                                                    onChange={handleDifficultyChange}
                                                    value="medium" />}
                                                label="Medium"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={difficulty === 'hard'}
                                                    onChange={handleDifficultyChange}
                                                    value="hard"
                                                />}
                                                label="Hard"
                                            />
                                        </MenuItem>

                                    </FormGroup>

                                    <p className='text-sm text-gray-600 pl-2'>Status</p>

                                    <FormGroup className='px-2'>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={status === 'all'}
                                                    onChange={handleStatusChange}
                                                    value="all"
                                                />}
                                                label="All"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={status === 'past'}
                                                    onChange={handleStatusChange}
                                                    value="active"
                                                />}
                                                label="Past"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={status === 'active'}
                                                    onChange={handleStatusChange}
                                                    value="active"
                                                />}
                                                label="Active"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={status === 'upcoming'}
                                                    onChange={handleStatusChange}
                                                    value="upcoming"

                                                />}
                                                label="Upcoming"
                                            />
                                        </MenuItem>
                                    </FormGroup>
                                </Select>
                            </FormControl>
                        </div>

                    </div>
                </div>
            </div>

            <div className='bg-deepBlue pb-10'>
                <div className='max-w-7xl mx-auto'>
                    <div
                        className='grid sm:grid-cols-2 xl:grid-cols-3 gap-5 py-[100px]'
                        onClick={onConnectionClick}
                    >
                        {avalibleHackathon?.map((item, i) => (
                            <div key={i} className="p-4">
                                <ChallengeCard
                                    hackathon={item}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChallengeList