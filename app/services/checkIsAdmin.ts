import { auth } from '~/app/libs/firebase-admin'
export default async function isAdmin(idToken: string): Promise<boolean> {
    const { uid } = await auth.verifyIdToken(idToken)
    const claims = await auth.getUser(uid)
    return claims.customClaims?.admin || false
}
