import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAuth, getAuth, indexedDBLocalPersistence, initializeAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { InputrepervalueComponent } from './inputrepervalue/inputrepervalue.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InputValoareCardComponent } from './input-valoare-card/input-valoare-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { CunkiesiriPipe } from './cunkiesiri.pipe';



@NgModule({
  declarations: [AppComponent, InputrepervalueComponent,InputValoareCardComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicModule,NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => {
     if (Capacitor.isNativePlatform()) {
       return initializeAuth(getApp(), {
         persistence: indexedDBLocalPersistence,
       });
     } else {
       const auth = getAuth();
       // if (environment.useFirebaseEmulator) {
       //   connectAuthEmulator(auth, 'http://localhost:9099');
       // }
       return auth;
     }
   }),
   FormsModule,
   AngularFireAuthModule,
   AngularFirestoreModule,
   AngularFirestoreModule,
   AngularFireModule,
   NgxDatatableModule,
   provideFirestore(() => getFirestore()),
   provideStorage(() => getStorage())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}


