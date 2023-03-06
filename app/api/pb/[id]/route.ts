import prisma from '~/app/libs/prisma'

export async function GET(
    request: any,
    {
        params
    }: {
        request: any
        params: { id: string }
    }
) {
    const pb = await prisma.pB.findUnique({
        where: { id: Number(params.id) }
    })

    return new Response(JSON.stringify(pb), { status: 200 })
}
