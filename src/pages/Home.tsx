import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import DoughnutChart from '../components/Graph';

const Home: React.FC = () => {
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
        <IonGrid>
          <IonRow>
            <IonCol size="12" style={{ padding: '0' }}>
              <IonCard style={{ height: '25vh', margin: '0', borderRadius: '0', backgroundColor: '#1a5732' }}>
                <IonCardContent>
                  Ez  tablet méreten 6, asztali méreten 4 oszlopos.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='7' style={{ padding: '0' }}>
              <IonCard style={{ height: '25vh', margin: '0', borderRadius: '0', backgroundColor: '#ffc409' }}>
                <IonCardContent>
                  Ez  tablet méreten 6, asztali méreten 4 oszlopos.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size='5' style={{ padding: '0' }}>
              <IonCard style={{ height: '25vh', margin: '0', borderRadius: '0', backgroundColor: '#ffffff' }}>
                <IonCardContent
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '95%',
                    padding: '5px',
                  }}
                >
                  <DoughnutChart />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" style={{ padding: '0' }}>
              <IonCard style={{ height: '25vh', margin: '0', borderRadius: '0', backgroundColor: '#1a5732' }}>
                <IonCardContent>
                  Ez  tablet méreten 6, asztali méreten 4 oszlopos.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
