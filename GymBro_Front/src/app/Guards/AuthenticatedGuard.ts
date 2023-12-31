import { inject } from "@angular/core";
import { TokenService } from "../Services/Token/token.service";
import { CanActivateFn, Router } from "@angular/router";

export const AuthenticatedGuard : CanActivateFn = () =>{
    //Guard para usuarios que estejam com token de autenticação
    const tokenService = inject(TokenService);
    const route = inject(Router);
    if(tokenService.hasToken())
        return true;
    route.navigate(['/']);
    return false;
};