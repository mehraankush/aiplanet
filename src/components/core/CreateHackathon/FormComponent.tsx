// @ts-ignore
"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUploadIcon } from "lucide-react";
import dayjs from 'dayjs';

import { DateTimePicker } from "@mui/x-date-pickers";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { Hackathon, UpdateHackathonFormData, useHackathonStore } from "@/store/hackathonStore";
import ChallengeHeading from "@/components/common/ChallengeHeading";
import { hackathonSchema } from "@/schema/createChallenge";
import toast from "react-hot-toast";

type HackathonFormData = z.infer<typeof hackathonSchema>;

interface HackathonFormProps {
    hackathon?: Hackathon;
}


const FormComponent: React.FC<HackathonFormProps> = ({ hackathon }) => {
    const router = useRouter();
    const addHackathon = useHackathonStore((state) => state.addHackathon);
    const updateHackathon = useHackathonStore((state) => state.updateHackathon);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<HackathonFormData>({
        resolver: zodResolver(hackathonSchema),
        defaultValues: {
            name: '',
            description: '',
            level: 'easy',
        },
    });

    useEffect(() => {
        if (hackathon?.name) {
            setValue('name', hackathon.name);
        }
        if (hackathon?.description) {
            setValue('description', hackathon.description);
        }
        if (hackathon?.startDate) {
            setValue('startDate', hackathon?.startDate as Date);
        }
        if (hackathon?.endDate) {
            setValue('endDate', hackathon?.endDate as Date);
        }
        if (hackathon?.image) {
            setValue('image', hackathon?.image as unknown);
        }
    }, [hackathon, setValue]);



    const handleUpdateHackathon = async (data: UpdateHackathonFormData) => {
        try {
            const updateData: Partial<Hackathon> & { image?: File | string } = {
                ...data,
                startDate: data.startDate?.toISOString(),
                endDate: data.endDate?.toISOString(),
            };
            console.log("Data to be updated",updateData)
            await updateHackathon(hackathon?.id, updateData);
           
            toast.success('🎉 Hackathon updated successfully!');
            setTimeout(() => {
                router.push(`/#challenge`);
            }, 1000);
        } catch (error) {
            console.error('Failed to update hackathon:', error);
            toast.error('Failed to update hackathon. Please try again.');
        }
    };

    const handleCreateHackathon = async (data: HackathonFormData) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image') {
                formData.append(key, data[key]);
            } else if (key === 'startDate' || key === 'endDate') {
                formData.append(key, data[key].toISOString());
            } else {
                formData.append(key, data[key as keyof HackathonFormData] as string);
            }
        });

        if (data) {
           await addHackathon(data);
        }
        toast.success('🥳 Hackathon created successfully!');
        setTimeout(() => {
            router.push('/#challenge');
        }, 1000);
    }


    const onSubmit = async (data: HackathonFormData) => {


        if (hackathon) {
           await handleUpdateHackathon(data)
        } else {
            await handleCreateHackathon(data)
        }
    }



    return (
        <div className="flex justify-start w-full pb-10">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Native form submit triggered");
                    try {
                        handleSubmit((data) => {
                            console.log("handleSubmit callback executed", data);
                            onSubmit(data);
                        })(e);
                    } catch (error) {
                        console.error("Error in handleSubmit:", error);
                    }
                }}
                className="w-2/5"
            >
                <Typography variant="h4" gutterBottom className="text-sm text-gray-500 mt-5">
                    {hackathon ? "Edit Hackathon" : "Create Hackathon"}
                </Typography>

                <Box component="div" className="flex flex-col mt-5">
                    <ChallengeHeading label="Challenge Name" />
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Hackathon Name"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                className=" m-1 w-full p-0"
                                variant="outlined"
                            />
                        )}
                    />
                </Box>

                <Box component="div" className="flex flex-col mt-5">
                    <ChallengeHeading label="Start Date" />
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field: { value, onChange, ...field } }) => (
                            <DateTimePicker
                                {...field}
                                value={value ? dayjs(value) : null}
                                onChange={(newValue) => {
                                    onChange(newValue ? newValue.toDate() : undefined);
                                    console.log("New start date:", newValue ? newValue.toDate() : undefined);
                                }}
                                label="Start Time"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.startDate,
                                        helperText: errors.startDate?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Box>

                <Box component="div" className="flex flex-col mt-5">
                    <ChallengeHeading label="End Date" />
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field: { value, onChange, ...field } }) => (
                            <DateTimePicker
                                {...field}
                                value={value ? dayjs(value) : null}
                                onChange={(newValue) => {
                                    onChange(newValue ? newValue.toDate() : undefined);
                                    console.log("New start date:", newValue ? newValue.toDate() : undefined);
                                }}
                                label="End Time"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.endDate,
                                        helperText: errors.endDate?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Box>


                <Box component="div" className="flex flex-col mt-5">
                    <ChallengeHeading label="Description" />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                className="mt-1"
                            />
                        )}
                    />
                </Box>


                <Box component="div" className="flex flex-col mt-5">
                    <ChallengeHeading label="Image" />
                    <Controller
                        name="image"
                        control={control}
                        render={({ field: { value, onChange, ...field } }) => (
                            <>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    className="bg-white text-deepBlue font-medium shadow-none capitalize w-1/2 hover:shadow-none p-5"
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                onChange(file);
                                            }
                                        }}
                                        {...field}
                                    />
                                </Button>
                                {errors.image && <p className="text-red-500 mt-1">{errors.image.message}</p>}
                                {value && <p className="mt-1">{(value as File).name}</p>}
                            </>
                        )}
                    />
                </Box>

                <Box component="div" className="flex flex-col mt-5">
                    <ChallengeHeading label="Level Type" />
                    <Controller
                        name="level"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Level"
                                fullWidth
                                margin="normal"
                                error={!!errors.level}
                                helperText={errors.level?.message}
                                className="mt-1"
                            >
                                <MenuItem value="easy">Easy</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="hard">Hard</MenuItem>
                            </TextField>
                        )}
                    />
                </Box>

                <div className="flex justify-start">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                        className="bg-greenVariant capitalize w-1/2"
                    >
                        {hackathon ? "Update Hackathon" : "Create Hackathon"}
                    </Button>

                </div>
            </form>
        </div>
    );
};

export default FormComponent;
