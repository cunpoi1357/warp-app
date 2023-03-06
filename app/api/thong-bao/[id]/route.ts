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
    const post = await prisma.post.findUnique({
        where: { id: Number(params.id) }
    })

    return new Response(JSON.stringify(post), { status: 200 })
}
