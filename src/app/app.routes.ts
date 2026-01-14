import { Routes } from '@angular/router';
import { callGuard } from './guards/call-guard';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./join-page/join-page").then(m => m.JoinPage),
        children: [
            {
                path: "",
                loadComponent: () => import("./join-page/join-menu/join-menu").then(m => m.JoinMenu)
            },
            {
                path: "create",
                loadComponent: () => import("./join-page/create-call-form/create-call-form").then(m => m.CreateCallForm),
                data: { breadcrumb: 'Start a Call' }
            },
            {
                path: "join",
                loadComponent: () => import("./join-page/join-call-form/join-call-form").then(m => m.JoinCallForm),
                data: { breadcrumb: 'Join a Call' }
            }
        ]
    },
    {
        path: "call",
        loadComponent: () => import("./call-page/call-page").then(m => m.CallPage),
        canActivate: [callGuard]
    }
];
