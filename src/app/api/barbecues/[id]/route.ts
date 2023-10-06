import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {
    params,
}: {
    params: {
        id: string;
    };
},) {

    const { id } = params;

    try {
        const barbecues = await prisma.barbecue.findUnique({
            where: {
                id: id
            }
        });
        return NextResponse.json(barbecues);
    } catch (error) {
        return NextResponse.json(error);
    }
}


export async function PATCH(
    request: Request,
    {
        params,
    }: {
        params: {
            id: string;
        };
    },
) {
    const { id } = params;

    const data = await request.json();

    await prisma.barbecue.update({
        data: {
            ...data,
        },
        where: {
            id: id,
        },

    });

    return NextResponse.json(
        {
            message: 'Success',
        },
        {
            status: 200,
        },
    );
}
