import prisma from '~/app/libs/prisma'

export async function GET(
    request,
    {
        params
    }: {
        request: Request
        params: { id: string }
    }
) {
    const pb = await prisma.PB.findUnique({
        where: { id: Number(params.id) }
    })

    return new Response(JSON.stringify(pb), { status: 200 })
}
