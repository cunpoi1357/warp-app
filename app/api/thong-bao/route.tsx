import { headers } from 'next/headers'

import prisma from '../../libs/prisma'
import checkIsAdmin from '~/app/services/checkIsAdmin'

export async function GET() {
    const data = await prisma.post.findMany({
        orderBy: [
            {
                createdAt: 'asc'
            }
        ]
    })
    return new Response(JSON.stringify(data), { status: 200 })
}

export async function POST(req: Request) {
    const body = await req.json()
    const headersList = headers()
    const idToken = headersList.get('Authorization')?.split(' ')[1]
    if (!idToken) {
        return new Response('Unauthorized', { status: 401 })
    }
    const isAdmin = await checkIsAdmin(idToken as string)
    if (isAdmin) {
        await prisma.post.create({
            data: body
        })
        return new Response('Create a new post successful', { status: 201 })
    } else {
        return new Response('Create a new post failed', { status: 403 })
    }
}

export async function PUT(req: Request) {
    const body = await req.json()
    const headersList = headers()
    const idToken = headersList.get('Authorization')?.split(' ')[1]
    if (!idToken) {
        return new Response('Unauthorized', { status: 401 })
    }
    const isAdmin = await checkIsAdmin(idToken as string)
    const { id, ...data } = body

    if (isAdmin) {
        await prisma.post.update({
            where: {
                id: Number(id)
            },
            data
        })
        return new Response(`Update post #${id} successful`, { status: 200 })
    } else {
        return new Response(`Update post #${id} successful failed`, {
            status: 403
        })
    }
}

export async function DELETE(req: Request) {
    const body = await req.json()

    const headersList = headers()
    const idToken = headersList.get('Authorization')?.split(' ')[1]
    if (!idToken) {
        return new Response('Unauthorized', { status: 401 })
    }
    const isAdmin = await checkIsAdmin(idToken as string)

    const { id } = body

    if (isAdmin) {
        await prisma.post.delete({
            where: {
                id: Number(id)
            }
        })
        return new Response(`Delete post #${id} successful`, { status: 200 })
    } else {
        return new Response(`Delete post #${id} failed`, { status: 403 })
    }
}
