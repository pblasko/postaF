import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import MPL from '../assets/magyar-posta-logo.svg';

const Login: React.FC = () => {
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const doLogin = async(event: any) => {
        event.preventDefault();
        await present('Logging in...');
        setTimeout(async () => {
          dismiss();
          router.push('/app', 'forward');
        }, 2000);
    }
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar color={'primary'}>
            <IonTitle>Székesfehérvár</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent scrollY={false} className='ion-padding'>
        <IonGrid fixed>
            <IonRow class='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                    <div className='ion-text-center ion-padding'>
                        <img src={MPL} alt='Posta logo' width={'50%'} />
                    </div>
                </IonCol>
            </IonRow>
            <IonRow class='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                    <IonCard>
                    <IonCardContent>
                        <form onSubmit={doLogin}>
                            <IonInput fill='outline' labelPlacement='floating' label='e-mail' type='email' placeholder='peter@posta.hu'></IonInput>
                            <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label='password' type='password'></IonInput>
                            <IonButton type='submit' expand='block' className='ion-margin-top'>
                                Login
                                <IonIcon icon={logInOutline} slot="end" />
                            </IonButton>
                            <IonButton routerLink='/register' color={'secondary'} type='button' expand='block' className='ion-margin-top'>
                                Create Account
                                <IonIcon icon={personCircleOutline} slot="end" />
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

export default Login;