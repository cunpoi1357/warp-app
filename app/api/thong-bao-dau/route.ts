import { headers } from 'next/headers'

import checkIsAdmin from '~/app/services/checkIsAdmin'
import prisma from '~/app/libs/prisma'

export async function GET() {
    let data

    data = await prisma.config.findUnique({
        where: {
            id: 'thong-bao-dau'
        }
    })
    if (!data) {
        data = await prisma.config.create({
            data: {
                id: 'thong-bao-dau',
                value: ''
            }
        })
    }

    return new Response(JSON.stringify(data?.value), { status: 200 })
}

export async function PUT(req: Request) {
    const body = await req.json()
    const headersList = headers()
    const idToken = headersList.get('Authorization')?.split(' ')[1]
    if (!idToken) {
        return new Response('Unauthorized', { status: 401 })
    }
    const isAdmin = await checkIsAdmin(idToken as string)
    if (isAdmin) {
        await prisma.config.update({
            where: {
                id: 'thong-bao-dau'
            },
            data: {
                value: body.value
            }
        })
        return new Response('Update successful', { status: 201 })
    } else {
        return new Response('id failed', { status: 403 })
    }
}
