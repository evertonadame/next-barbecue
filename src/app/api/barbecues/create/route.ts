import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';
import type { Barbecue } from '@/types/barbecue';

export async function POST(request: Request) {
    const barbecue: Barbecue = await request.json();

    try {
        const barbecues = await prisma.barbecue.create({
            data: {
                ...barbecue,
            }
        });
        return NextResponse.json(barbecues);
    } catch (error) {
        return NextResponse.json({
            error: 'Unable to create barbecue.',
        }, {
            status: 400,
        });
    }
}

