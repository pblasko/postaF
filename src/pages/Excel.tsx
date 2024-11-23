import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';

const Excel: React.FC = () => {
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
      <IonContent fullscreen>
        Excel
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Excel;