import { IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import React from 'react';
import { documentsOutline } from 'ionicons/icons';

const Excel: React.FC = () => {
  const [present, dismiss] = useIonLoading();
  const doExcel = async (event: any) => {
    event.preventDefault();
    await present('Creating excels...');
    try {
      const response = await fetch('http://192.168.1.239:8000/newExcel');
      const accounts = await response.text();
      console.log(accounts);
    } catch (error) {
      console.error('Error fetching Excel:', error);
    } finally {
      dismiss();
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Székesfehérvár</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard>
        <IonCardContent className="ion-no-padding">
          <IonItem lines="none">
            <IonIcon icon={documentsOutline} slot="start" />
            <IonLabel>
              Munkalapok elkészítése
              <p>Havi vezénylés szerint</p>
            </IonLabel>
            <IonChip
              slot="end"
              color={'secondary'}
              onClick={doExcel}
            >
              GO
            </IonChip>
          </IonItem>
        </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Excel;