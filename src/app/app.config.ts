import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
//provideHttpClient()  HTTP requests to a backend server. 
// HTTP operations such as GET, POST, PUT, DELETE, etc. 


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient()// HTTP requests to a backend server.
  ],
};
