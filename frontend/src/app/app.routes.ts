import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { Text2SpeechComponent } from './text-2-speech/text-2-speech.component';
import { TranslateComponent } from './translate/translate.component';
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';

export const routes: Routes = [
    {path: "list-drivers", component: ListDriversComponent, canActivate: [AuthGuard]},
    {path: "add-driver", component: AddDriverComponent, canActivate: [AuthGuard]},
    {path: "update-driver", component: UpdateDriverComponent, canActivate: [AuthGuard]},
    {path: "delete-driver", component: DeleteDriverComponent, canActivate: [AuthGuard]},
    {path: "list-packages", component: ListPackagesComponent, canActivate: [AuthGuard]},
    {path: "add-package", component: AddPackageComponent, canActivate: [AuthGuard]},
    {path: "update-package", component: UpdatePackageComponent, canActivate: [AuthGuard]},
    {path: "delete-package", component: DeletePackageComponent, canActivate: [AuthGuard]},
    {path: "text-to-speech", component: Text2SpeechComponent, canActivate: [AuthGuard]},
    {path: "translate", component: TranslateComponent, canActivate: [AuthGuard]},
    {path: "generative-ai", component:GenerativeAiComponent, canActivate: [AuthGuard]},
    {path: "statistics", component: StatisticsComponent, canActivate: [AuthGuard]},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "invalid-data", component: InvalidDataComponent},
    {path: "", component: HomeComponent},
    {path: "**", component: PageNotFoundComponent}
];
