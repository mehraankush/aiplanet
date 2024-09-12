import { z } from "zod";
const datePreprocessor = (arg: unknown) => {
    if (arg instanceof Date) return arg;
    if (typeof arg === 'string') {
        const d = new Date(arg);
        return isNaN(d.getTime()) ? undefined : d;
    }
    return undefined;
};

export const hackathonSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    startDate: z.preprocess(datePreprocessor, z.date({ required_error: 'Start date is required' })),
    endDate: z.preprocess(datePreprocessor, z.date({ required_error: 'End date is required' })),
    description: z.string().min(1, { message: 'Description is required' }),
    image: z.instanceof(File, { message: 'Image file is required' }),
    level: z.enum(['easy', 'medium', 'hard'], { errorMap: () => ({ message: 'Level is required' }) })
});