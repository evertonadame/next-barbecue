import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const barbecues = await prisma.barbecue.findMany();
        return NextResponse.json(barbecues);
    } catch (error) {
        return NextResponse.error();
    }
}

