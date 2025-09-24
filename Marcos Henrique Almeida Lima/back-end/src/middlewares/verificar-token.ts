import dotenv from 'dotenv';
import { JwtPayload, TokenExpiredError, verify } from "jsonwebtoken";
dotenv.config();
const SENHA_JWT = process.env.SENHA_JWT;



export default function verificarToken(request, response, next) {
    const header = request.headers.authorization;
    console.log("Header de autorização recebido:", header); 
    if (!header) {
        console.warn("Token não informado. Gambiarra: deixando passar.");
        // Permite passar mesmo sem token
        return next();
    }
    const token = header.split(' ')[1];
    // Adiciona log do token recebido e da senha JWT esperada
    console.log("Token recebido:", token);
    console.log("Senha JWT esperada:", SENHA_JWT);
    try {
        const { perfil, email } = verify(token, SENHA_JWT) as JwtPayload;
        request.perfil = perfil;
        request.email_token = email;
        return next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return response.status(401).json({ erro: "Token expirado, faça login novamente." });
        }
        return response.status(401).json({ erro: "Token invalido." });
    }
};