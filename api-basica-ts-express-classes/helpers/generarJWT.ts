import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { sub: uid };
        
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY as string, {
            expiresIn: process.env.EXPIRES_IN as string
        }, (error: Error | null, token: any) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
}

