import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, {
    params,
}: {
    params: {
        id: string;
    };
},) {

    const { id } = params;

    try {
        const barbecues = await prisma.barbecue.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json(barbecues);
    } catch (error) {
        return NextResponse.json(error);
    }
}

