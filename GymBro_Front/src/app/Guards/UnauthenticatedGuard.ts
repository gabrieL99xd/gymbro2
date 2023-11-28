import { inject } from "@angular/core";
import { TokenService } from "../Services/Token/token.service";
import { CanActivateFn, Router } from "@angular/router";

export const UnauthenticatedGuard : CanActivateFn = () =>{
//Guard para usuarios que não estejam autenticados
    const tokenService = inject(TokenService);
    const route = inject(Router);
    if(!tokenService.hasToken())
        return true;
    route.navigate(['/Gym']);
    return false;
};