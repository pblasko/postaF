import { IonBackButton, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import { checkmarkDoneOutline } from 'ionicons/icons';

const Register: React.FC = () => {
  const router = useIonRouter();

  const doRegister = (event: any) => {
    event.preventDefault();
    console.log('do Register');
    router.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButton slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButton>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class='ion-justify-content-center'>
            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
                    <IonInput fill='outline' labelPlacement='floating' label='e-mail' type='email' placeholder='peter@posta.hu'></IonInput>
                    <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label='password' type='password'></IonInput>
                    <IonButton type='submit' expand='block' className='ion-margin-top' color={'secondary'}>
                      Register
                      <IonIcon icon={ checkmarkDoneOutline } slot="end" />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;