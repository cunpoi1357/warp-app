import { headers } from 'next/headers'
import prisma from '~/app/libs/prisma'
import checkIsAdmin from '~/app/services/checkIsAdmin'

export async function GET() {
    let data

    data = await prisma.config.findUnique({
        where: {
            id: 'thu-tu'
        }
    })

    if (!data) {
        data = await prisma.config.create({
            data: {
                id: '[{"name":"Thông báo đầu","id":"tbd","hidden":"false"},{"name":"Thông báo","id":"tb","hidden":"false"},{"name":"Khu vực PB mod ninja school","id":"kvpbmns","hidden":"false"},{"name":"Khu vực bán vé tự động","id":"kvbvltd","hidden":"false"},{"name":"Khu vực bán nick ninja school","id":"kvbnns","hidden":"false"},{"name":"Bản hot mới cập nhật","id":"bhmcn","hidden":"false"},{"name":"Khu vực tải giả lập","id":"kvtgl","hidden":"false"},{"name":"Bán tool, mod pb theo yêu cầu","id":"btmpbntyc","hidden":"false"},{"name":"Khu vực bán xu tự động ","id":"kvbxtd","hidden":"false"},{"name":"Top ","id":"top","hidden":"false"}]',
                value: ''
            }
        })
    }

    return new Response(data?.value, { status: 200 })
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
        await prisma.config.update({
            where: {
                id: 'thu-tu'
            },
            data: {
                value: JSON.stringify(body.data)
            }
        })
        return new Response('Update successful', { status: 201 })
    } else {
        return new Response('id failed', { status: 403 })
    }
}
